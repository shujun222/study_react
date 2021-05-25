const express = require('express');
const app = express();

app.use((request, response, next) => {
    console.log('有人请求了服务器1');
    next();
});

app.get("/students", (request, response) => {
    const students = [
        {id:'001', name:'唐三', age:18},
        {id:'002', name:'小舞', age:16},
        {id:'003', name:'胖子', age:17},
    ];
    response.send(students);
});

app.listen(5000);