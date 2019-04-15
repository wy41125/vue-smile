const mongoose = require("mongoose")
const Schema = mongoose.Schema
const bcrypt = require("bcrypt")
const SALT_WORK_FACTOR = 10
//创建userSchema
const userSchema = new Schema({
    userName:{unique:true,type:String},
    password:{type:String},
})
userSchema.pre("save",function(next){
    bcrypt.genSalt(SALT_WORK_FACTOR,(err,salt)=>{
        if(err) return next(err)
        bcrypt.hash(this.password,salt,(err,hash)=>{
            if(err) return next(err)
            this.password = hash
            next()
        })
    })
})


//发布模型
mongoose.model("User",userSchema)