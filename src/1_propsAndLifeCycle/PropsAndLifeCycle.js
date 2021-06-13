import React, { Component } from 'react'
import { PureComponent } from 'react';

export default class LifeCycleAction extends Component {
    state = {
        friendsList: [
            {name: "唐三", desc:"好开心, 小舞吃了万年水晶参后恢复肉身",content:"小舞图片", likeList:["胖子","奥斯卡","宁荣荣","大师"],
                avtor:'http://nimg.ws.126.net/?url=http%3A%2F%2Fdingyue.ws.126.net%2F2021%2F0411%2F83576e06j00qrdlke008bc000zo00qrc.jpg&thumbnail=650x2147483647&quality=80&type=jpg'},
            {name: "messi", desc:"今年好烦躁呀，欧冠8强都进不了，西甲冠军还悬",content:"低头叉腰, 伤感图片", likeList:["C罗","瓜迪奥拉","皮克"],
                avtor:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=308179734,2703920008&fm=26&gp=0.jpg'},
            {name: "张三", desc:"给大家唱一首《张三的歌》",content:"演唱视频", likeList:["齐秦","李四","王五","李六"],
                avtor:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1217232713,1229542401&fm=26&gp=0.jpg'},
        ]
    };



    render() {
        console.log("Father render...");
        return (<div style={{width: '400px', border: '1px dashed red', padding: '20px'}}>
            朋友圈列表：
            {this.state.friendsList.map((item, index) => <Friend data={item} key={index} name="haha" />)}
        </div>)
    }
}

class Friend extends PureComponent {
    state = {likeList: [], name:""};

    static getDerivedStateFromProps(nextProps, prevState) {
        console.log("Son getDerivedStateFromProps");
        if (nextProps.data.name !== prevState.name) {
            return { 
                likeList: nextProps.data.likeList, 
                name: nextProps.data.name 
            };
        }
        return null;
    }

    praise = () => {
        // 1. 不能直接修改props
        // this.props.data = []; // TypeError: Cannot assign to read only property 'data' of object
        // this.props.name = "wahaha"; 

        //2. 如果修改对象props内容，倒是可以成功，但是不会重新render
        // let likeList = this.props.data.likeList;
        // likeList.push("shujun");
        // console.log(likeList);
        // this.forceUpdate();

        //3. 修改state才是推荐的做法
        let {likeList} = this.state;
        likeList = [...likeList, "shujun"];
        this.setState({likeList});
    }
    
    render() {
        console.log("Son render...");
        const {avtor, name, desc, content} = this.props.data;

        // const {likeList} = this.props;
        const {likeList} = this.state;
        console.log("likeList ", likeList);
        return (
            <div style={{border: '1px solid green', width: '400px', marginTop:'10px'}}>
                <img src={avtor} width="60px" height="60px" alt="帅气的头像" />
                <b style={{marginLeft: '10px'}}>{name}</b>
                <div>{desc}</div>
                <div style={{height: '50px', lineHeight:'50px', border: '1px dashed gray', textAlign:'center'}}>
                    {content}
                </div>
                <div>
                    <button onClick={this.praise}>❤</button>
                    {likeList.join("、")}
                </div>
            </div>
        )
    }
}