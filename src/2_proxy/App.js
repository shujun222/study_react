import React, { Component } from 'react'
import axios from 'axios';


export default class App extends Component {
  getStudents = () => {
    axios.get("/api1/students").then(
      response => {console.log("success", response.data);},
      error => {console.log("fail", error);}
    );
  }

  getFootball = () => {
    axios.get("/api2/football").then(
      response => {console.log("success", response.data);},
      error => {console.log("fail", error);}
    );
  }

  render() {
    return (
      <div>
        <p>
          代理方式1：package.json中直接添加一行："proxy":"http://localhost:5000" <br/>
          优点：简单好用 <br/>
          缺点：只能做一个代理
        </p>

        <p>
          代理方式2：新增一个文件 
          src/setupProxy.js
        </p>

        <button onClick={this.getStudents}>获取学生数据</button>
        <button onClick={this.getFootball}>获取足球大佬</button>
        
      </div>
    )
  }
}
