const express = require('express');
const app = express();

app.use((request, response, next) => {
    console.log('有人请求了服务器2');
    next();
});

app.get("/football", (request, response) => {
    const students = [
        {id:'001', name:'梅西', age:34},
        {id:'002', name:'C罗', age:36},
        {id:'003', name:'格雷兹曼', age:29},
    ];
    response.send(students);
});

app.listen(5001);