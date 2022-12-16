import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './10_special/2_lazy_import/2_lazy_comp';

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
// import './11_sources/6_update_fiber'
// import './8_hooks/2_sources/1_create'

// import './8_hooks/1_expmple'

