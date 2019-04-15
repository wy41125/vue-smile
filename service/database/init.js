const mongoose = require("mongoose")
const glob = require("glob")
const {resolve} = require("path")

exports.initSchemas=()=>{
    glob.sync(resolve(__dirname,"./schema","**/*.js")).forEach(require)
}

exports.connect=()=>{
    //连接数据库
    mongoose.connect('mongodb://localhost/smile-vue');
    let maxConnectTimes = 0;

    return new Promise((resolve,reject)=>{
        //断开数据库连接
        mongoose.connection.on('disconnected',()=>{
            console.log('********数据库断开，重连********')
            if(maxConnectTimes<=3){
                maxConnectTimes++
                mongoose.connect(db)
            }else{
                reject()
                throw new Error("数据库有问题，请人工处理")
            }
            
        })

        //数据库错误
        mongoose.connection.on('error',()=>{
            console.log('********数据库错误，重连********')
            if(maxConnectTimes<=3){
                maxConnectTimes++
                mongoose.connect(db)
            }else{
                reject()
                throw new Error("数据苦有问题，请人工处理")
            }
        })

        //数据库错误
        mongoose.connection.on('open',()=>{
            console.log('********数据库连接成功********')
        })
    }) 
}