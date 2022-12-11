感觉hook是简单了，但是不好理解呀，啥玩意儿，得完全重新学习一遍它的api，改了好多东西
参考: https://www.jianshu.com/p/014ee0ebe959


像object class类就没这些事儿了，因为它有一个render()函数，没必要全类重新刷新，而对应function class就不行啦，return只是一个表达式而已，所有需要全部刷新

但是你刷新吧，函数，引用类型之类的都是重新加载，地址肯定变化了，如果这个时候他们还是作为值传递给子组件，那就子组件不可避免要刷新了

memo PureComponent
useCallback 让函数不要每次都重新加载，class中不存在
useMemo 让引用类型不要每次都重新加载，class中不存在


hook引入原因/动机：
https://react.docschina.org/docs/hooks-intro.html
1. 在组件之间复用状态逻辑很难？
   a. class
   render props / 高阶组件 
   providers，consumers 等其他抽象层组成的组件会形成“嵌套地狱”。
   b. function
   hooks, 自定义hooks可以实现？
2. 难以理解的 class
3. 复杂组件变得难以理解
   class把功能拆分开了，同一个 componentDidMount 中可能也包含很多其它的逻辑，如设置事件监听，而之后需在 componentWillUnmount 中清除。
   但是useEffect可以一起完成这个功能了；

   

render props
https://react.docschina.org/docs/render-props.html

HOC
https://react.docschina.org/docs/higher-order-components.html
例子：Redux 的 connect，react-router中withRouter()





