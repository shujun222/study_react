import React from 'react'
// import { useReducer } from 'react'
import { useReducer } from '../2_sources/6_useReducer'

const initialState = {count: 0};

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

export default function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'decrement'})}>-</button> &nbsp;
      <button onClick={() => dispatch({type: 'increment'})}>+</button>

      <br/>
      <a href='https://react.docschina.org/docs/hooks-reference.html#usereducer' target="_blank">useReducer文档</a>
      <pre>
        疑问：这个东西是不是就可用替代redux了？
      </pre>
    </>
  );
}