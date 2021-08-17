感觉hook是简单了，但是不好理解呀，啥玩意儿，得完全重新学习一遍它的api，改了好多东西
参考: https://www.jianshu.com/p/014ee0ebe959


像object class类就没这些事儿了，因为它有一个render()函数，没必要全类重新刷新，而对应function class就不行啦，return只是一个表达式而已，所有需要全部刷新

但是你刷新吧，函数，引用类型之类的都是重新加载，地址肯定变化了，如果这个时候他们还是作为值传递给子组件，那就子组件不可避免要刷新了

memo PureComponent
useCallback 让函数不要每次都重新加载，class中不存在
useMemo 让引用类型不要每次都重新加载，class中不存在
