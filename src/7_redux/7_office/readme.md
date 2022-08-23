官方文档: https://cn.redux.js.org/tutorials/quick-start

老版的redux
1. store reducer dispatch action actionCreator

新版本redux
1. store slice = (reducer + action + actionCreator) dispatch
dispatch还是在ui中使用: dispatch(actionCreateor(param))
不同的是: 
a. 新版本store可以配置多个reducer, 
b. slice太简洁了, 棒:
   定义reducer的同时, 把action, actionCreator省略了, 会自动生成