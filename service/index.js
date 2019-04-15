const Koa = require("koa")
const app = new Koa()
const {connect,initSchemas} = require("./database/init.js")
const mongoose = require("mongoose")

;(async()=>{
    connect()
    await initSchemas()
    const User = mongoose.model("User")
    let oneUser = new User({userName:'wy03',password:"123456"})
    oneUser.save().then(()=>{
        console.log('插入成功')
    })
    let user = await User.findOne({}).exec()
    console.log("----------------------------")
    console.log(user)
    console.log("----------------------------")
})()

app.use(async(ctx) => {
    ctx.body = "<h1>hello </h1>"
})

app.listen(3000,()=>{
    console.log('服务启动：3000端口')
})