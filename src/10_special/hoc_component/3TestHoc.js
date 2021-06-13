import React, {Component} from 'react'


//高阶组件定义，里面return 返回新组件
function local(Comp,key){
    class Proxy extends Component{
        //constructor构造函数 定义你的状态
        constructor(){
            super();
            this.state={data:''}
        }
        //钩子函数，组件渲染之前
        componentWillMount(){
　　　　　　　　//取缓存值
            let data=localStorage.getItem(key);
            this.setState({data})
        }
        handBlur=(event)=>{
　　　　　　//获取当前标签的value
           let data=event.target.value;
           localStorage.setItem(key,data);
        }

        render(){
            //Comp是传入进来的组件
            return(
                <Comp handBlur={this.handBlur} value={this.state.data}/>
            )
        }
    }
    return Proxy
}
//定义你的单独组件
function Input(props) {
    return <input type="text" onBlur={props.handBlur}/>
}
function Textareas(props) {
   return <textarea  />
}
function Div() {
    return <div>111</div>
}
//调用高阶函数，返回新的组件
let LocalInput=local(Input,'username')
let LocalTextareas=local(Textareas,'content')
let LocalDiv=local(Div)

//要渲染的总组件
export class TextHoc extends Component {
    render() {
        return (
            <div>
                <form>
                   用户名 <LocalInput/>
                    类容 <LocalTextareas/>
                    <LocalDiv></LocalDiv>
                </form>
            </div>
        )
    }
}