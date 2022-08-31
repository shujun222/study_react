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

    await new Promise(resovle => {
        setTimeout(resovle, 2000)
    })

    ctx.response.body = data;
})

router.get("/fakeApi/posts", async ctx => {
    const data = [
        {
            id: '1', title: 'First Post!', content: 'Hello!'
            , date: sub(new Date(), { minutes: 10 }).toISOString()
            , user: '0'
            , reactions: {
                thumbsUp: 0,
                hooray: 0,
                heart: 0,
                rocket: 0,
                eyes: 0,
            }
        },
        {
            id: '2', title: 'Second Post', content: 'More text'
            , date: sub(new Date(), { minutes: 5 }).toISOString()
            , user: '1'
            , reactions: {
                thumbsUp: 0,
                hooray: 0,
                heart: 0,
                rocket: 0,
                eyes: 0,
            }
        }
    ]

    await delay(2)
    ctx.response.body = data
})

router.get("/fakeApi/users", async ctx => {
    const data = [
        { id: '0', name: 'leo messi' },
        { id: '1', name: 'Kevin Dbnanei' },
        { id: '2', name: 'Madison Price' }
    ]

    ctx.response.body = data
})


router.post("/fakeApi/addNewPost", async ctx => {
    let postParam = ctx.request.body
    console.log("postParam", postParam);
    const data = {
        id: (Math.random() + "").replace(".", "_"),
        date: new Date().toISOString(),
        // title,
        // content,
        // user,
        ...postParam,
        reactions: {
            thumbsUp: 0,
            hooray: 0,
            heart: 0,
            rocket: 0,
            eyes: 0,
        },
    }

    await delay(3)
    ctx.response.body = data
})

app.use(router.routes());


