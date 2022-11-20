const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        // proxy('/api1', {  // 遇见api1前缀的请求，就会触发改代理配置
        //     target: 'http://localhost:5000', 
        //     // changeOrigin: true, //可以不加，服务器请求投的host值
        //     pathRewrite: {'^/api1': ''} //这个地方也可以不替换
        // }),

        // proxy('/api2', {
        //     target: 'http://localhost:5001',
        //     changeOrigin: true,
        //     pathRewrite: {'^/api2': ''}
        // }),

        // proxy('/x/web-interface', {
        //     target: 'https://api.bilibili.com',
        //     changeOrigin: true,
        // }),

        proxy('/api4/', {
            target: 'https://avatar.csdnimg.cn',
            changeOrigin: true,
            pathRewrite: {'^/api4': ''}
        }),
    );
}

