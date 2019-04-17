const Router = require('koa-router')
const mongoose = require('mongoose')
const fs = require('fs')

let router = new Router()

router.get('/insertAllGoodsInfo',async(ctx)=>{
    fs.readFile('./data_json/newGoods.json','utf8',(err,data)=>{
        data = JSON.parse(data)
        const Goods = mongoose.model('Goods')
        let saveNumber = 0
        data.map( (value,index)=>{
            let newGoods = new Goods(value)
            newGoods.save().then( ()=>{
                saveNumber++
                console.log('成功'+saveNumber)
            }).catch( (err)=>{
                console.log(MediaStreamErrorEvent)
            })
        }) 
    })
    ctx.body="开始导入数据"
})
router.get('/insertAllCategory',async(ctx)=>{
    fs.readFile('./data_json/category.json','utf8',(err,data)=>{
        data = JSON.parse(data)
        const Category = mongoose.model('Category')
        let saveNumber = 0
        data.RECORDS.map( (value,index)=>{
            let newCategory = new Category(value)
            newCategory.save().then( ()=>{
                saveNumber++
                console.log('插入成功'+saveNumber)
            }).catch( (err)=>{
                console.log('插入失败：'+err)
            })
        }) 
    })
    ctx.body="开始导入数据"
})
router.get('/insertAllCategorySub',async(ctx)=>{
    fs.readFile('./data_json/category_sub.json','utf8',(err,data)=>{
        data = JSON.parse(data)
        const CategorySub = mongoose.model('CategorySub')
        let saveNumber = 0
        data.RECORDS.map( (value,index)=>{
            let newCategorySub = new CategorySub(value)
            newCategorySub.save().then( ()=>{
                saveNumber++
                console.log('插入成功'+saveNumber)
            }).catch( (err)=>{
                console.log('插入失败：'+err)
            })
        }) 
    })
    ctx.body="开始导入数据"
})

module.exports = router