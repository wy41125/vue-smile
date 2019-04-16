const Koa = require("koa")
const app = new Koa()
const {connect,initSchemas} = require("./database/init.js")
const mongoose = require("mongoose")
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')

app.use(bodyParser())
app.use(cors())

let user = require('./appApi/user.js')

//装载所有子路由
let router = new Router()
router.use('/user',user.routes())

//加载路由中间件
app.use(router.routes())
app.use(router.allowedMethods())

;(async ()=>{
    connect()
    await initSchemas()
})()

app.use(async(ctx) => {
    ctx.body = "<h1>hello </h1>"
})

app.listen(3000,()=>{
    console.log('服务启动：3000端口')
})