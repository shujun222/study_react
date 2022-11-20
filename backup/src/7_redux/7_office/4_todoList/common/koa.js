const sub = require('date-fns').sub
const Koa = require('koa');
const app = new Koa();
app.listen(3006);

// 后端允许跨域:  https://www.npmjs.com/package/koa2-cors
var cors = require('koa2-cors');
app.use(cors({
    origin: "*",
}));

// post参数解析
var bodyParser = require('koa-bodyparser');
app.use(bodyParser())



function delay(second) {
    return new Promise(resolve =>
        setTimeout(resolve, second * 1000)
    );
}


const router = require('koa-router')();

//controller：数据接口
router.get("/", async ctx => {
    const data = { "name": "唐三", "props": "蓝银草&昊天锤" }
    ctx.response.body = data;
})

router.get("/fakeApi/todos", async ctx => {
    const data = [
        { id: 0, color: '', completed: false, text: 'Buy milk' },
        { id: 1, color: '', completed: false, text: 'Clean yard' },
        { id: 2, color: '', completed: false, text: 'Buy cheese' },
        { id: 3, color: '', completed: false, text: 'Read newspaper' }
    ]

    await delay(3)
    ctx.response.body = data
})




router.post("/fakeApi/todos", async ctx => {
    let postParam = ctx.request.body
    console.log("postParam", postParam);
    const data = {
        id: (Math.random() + "").replace(".", "_"),
        color: '', 
        completed: false, 
        text: postParam.text
    }
    ctx.response.body = data
})

app.use(router.routes());


