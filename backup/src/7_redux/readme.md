1. 纯react


2. 不要action文件，action直接在ui组件中
   import {createStore} from 'redux' 


3. 把action抽出去到特定文件中，对于异步，需要中间件：
   createStore(counter_reducers, applyMiddleware(thunk))

   import {createStore, applyMiddleware} from 'redux'
   import thunk from 'redux-thunk' 


4. 直接上面那么改，侵入性太大，其实 react-redux 确实是一个非常不错的选择
   把ui组件Counter和store之间嵌入一个容器，redux全部放这里面
   import {createStore, applyMiddleware} from 'redux'
   import thunk from 'redux-thunk'
   import {connect} from 'react-redux';

5. 优化上面的react-redux写法：   
   a. 抽出来的中间层CounterContainner直接放在UI组件Counter下面
   b. 如果外层有多个组件，都需要传递全局的这个store，我们需要用<Provider> 包裹它们
   c. connect(mapStateToProps, mapDispatchToProps)(CounterUI)
      mapDispatchToProps简化为对象映射

6. react-redux 实战
   两个组件之间共享数据


7. redux官网例子
   官方文档: https://cn.redux.js.org/tutorials/quick-start

   老版的redux
   store reducer dispatch action actionCreator

   新版本redux
   store slice = (reducer + action + actionCreator) dispatch
   dispatch还是在ui中使用: dispatch(actionCreateor(param))
   不同的是: 
   a. 新版本store可以配置多个reducer, 
   b. slice太简洁了, 棒:
      定义reducer的同时, 把action, actionCreator省略了, 会自动生成
   c. 不引入其它插件了，只用一个？
      import { configureStore } from '@reduxjs/toolkit';
      import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

   
      
   
