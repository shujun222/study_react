import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './8_hooks/1_expmple/4_3_useCallback';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
//   <React.StrictMode>
    <App />
//   </React.StrictMode>
);



// 低版本才行："react": "^17.0.2"   "react-dom": "^17.0.2", 测试那个无聊的问题setState同步
// import React from 'react17'
// import ReactDOM from 'react-dom17';
// import App from './10_special/12_render/3_example';
// ReactDOM.render(<App />, document.getElementById('root'))


// 手写react源码系列
// import './10_special/10_render/3_fiber'
// import './10_special/11_diff/2_multiple_nodes'