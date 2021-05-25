import axios from 'axios';
import React, { Component } from 'react'

/**
 * 1. 最容易想到的版本，状态放在父组件内维护
 * 
 * 张天宇老师写的是github搜索，但是github访问不了，
 * 所以改成了B站用户搜索
 * https://search.bilibili.com/upuser?keyword=%E5%BC%A0%E4%B8%89&from_source=web_search
 * 但是这个竟然做了后端校验？即便代理也403
 * 
 * 最后改访问csdn，这个好，后端直接允许了跨域
 * 但是头像问题，我还是解决不了
 */
export default class CsdnSearch extends Component {
    state = { userList: [] }

    getUserList = (userList) => {
        this.setState({ userList });
    }

    render() {
        return (<>
            <Search getUserList={this.getUserList} />
            <UserList data={this.state.userList} />
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
                this.props.getUserList(response.data.result_vos);
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
    render() {
        return (
            <div style={{ border: '1px solid green', width: '800px', minHeight:'100px', marginTop: '10px' }}>
                {this.props.data.map(item => {
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
