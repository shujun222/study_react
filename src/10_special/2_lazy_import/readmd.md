加载都是相对浏览器来说，是否请求到客户端

1. 编译之后不能只是一个js文件，得分包，打包成多个js文件
2. 文件顶部如果写了 import, 那么不管编译时候是否分包，都会加载到前端
3. 加载分类
   a. 数据，函数:  import(file).then  await 异步处理掉
   b. 组件：lazy(()=>import(file)), <Suspend fallback={}>Lazy</Suspend>
   c. 路由：和组件差不多，只不过把路由注册写到了Suspend中


深度剖析React懒加载原理
https://www.cnblogs.com/xiaofeng123aa/p/16754235.html

