import axios from 'axios';
import React, { Component } from 'react'
import PubSub from 'pubsub-js';

/**
 * 2. 竟然还是神奇的组件通信写法？666
 */
export default class CsdnSearch extends Component {
    render() {
        return (<>
            <Search />
            <UserList />
        </>)
    }
}


class Search extends Component {
    search = () => {
        const keyword = this.input.value;
        console.log(keyword);
        axios.get(`https://so.csdn.net/api/v2/search?q=${keyword}&t=userinfo`)
            .then(response => {
                console.log(response.data);
                // this.props.getUserList(response.data.result_vos);
                PubSub.publish("users_topic", response.data.result_vos);
            });
    }

    render() {
        return <>
            搜索Csdn用户：<input ref={element => this.input = element} />
            <button onClick={this.search}>搜索</button>
        </>;
    }
}

class UserList extends Component {
    state = {data:[]};

    componentDidMount(){
        this.pubSubtoken = PubSub.subscribe("users_topic", (topic, data)=>{
            console.log("topic ", topic);
            console.log("data ", data);
            this.setState({data});
        });
    }

    componentWillUnmount() {
        PubSub.unsubscribe(this.pubSubtoken);
    }

    render() {
        return (
            <div style={{ border: '1px solid green', width: '800px', minHeight:'100px', marginTop: '10px'  }}>
                {this.state.data.map(item => {
                    console.log("item.user_pic", item.user_pic);
                    let picture_url = item.user_pic.replace("profile", "avatar") + ".jpg";
                    console.log(picture_url);
                    picture_url = "https://avatar.csdnimg.cn/a/5/2/2_u011996426.jpg";
                    return (
                        <a key={item.userid} style={{ border: '1px dashed gray', display:'inline-block', margin: '10px' }}
                            href={item.user_url} target="_blank" rel="noreferrer">
                            <img src={picture_url} alt="头像" /> <br /> {item.nickname.replace("<em>","").replace("</em>","")}
                        </a>
                    )
                })}
            </div>);
    }
}
