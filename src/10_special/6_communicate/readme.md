组件之间如何通信呢？

1.父传子Props
   a. 父主动传子：父级onchange, state改变，子级props自动改变
   b. 子主动拿父：this.props
2. 父传子孙后代
   MyContext = React.createContext
   Provider传递，Consumer/this.context接收
3. 兄弟传递
   状态提升，设置在父亲那儿
4. 子传父
    a. 子主动传父：父亲传递改变state方法, 子调用
    b. 父主动获取子的数据：
       b1. 父传方法给子：<Son initThis={son => this.sonRef = son}>
       b2. 子的构造函数或者componentDidMount中执行 this.initThis(this)
       b3. 父就可以随便调用了：ths.sonRef.state.xxx   this.sonRef.fun1()

5.	PubJs 4_ajax/2_csdnSearchPubsub.js
6.	Redux 或者 dva 
