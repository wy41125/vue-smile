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

/*
 * 获取商品详情信息接口
 *  */
router.post('/getDetailGoodsInfo',async(ctx)=>{
    let goodId = ctx.request.body.goodId
    const Goods = mongoose.model('Goods')//这是一张表
    await Goods.findOne({ID:goodId}).exec()
    .then(async(result)=>{
        ctx.body={code:200,message:result}
    })
    .catch(error=>{
        console.log(error)
        ctx.body={code:500,message:error}
    })
})

/*
*获取大类数据接口
*/ 
router.get('/getCategoryList',async(ctx)=>{
    try{
        const Category = mongoose.model('Category')
        let result = await Category.find().exec()
        ctx.body = {code:200,message:result}
    }catch(error){
        ctx.body={code:500,message:error}
    }
})

/*
*获取小类数据接口
*/ 
router.post('/getCategorySubList',async(ctx)=>{
    try{
        let categoryId = ctx.request.body.categoryId
        // let categoryId = 1
        const CategorySub = mongoose.model('CategorySub')
        let result = await CategorySub.find({MALL_CATEGORY_ID:categoryId}).exec()
        ctx.body = {code:200,message:result}
    }catch(error){
        ctx.body={code:500,message:error}
    }
})

/**
 * 根据类别获取商品列表
 */
router.post('/getGoodsListByCategorySubID',async(ctx)=>{
    try{
        let  page = ctx.request.body.page//当前页数
        let CategorySubID = ctx.request.body.categorySubID//子类别id
        let num = 10//每页显示数量
        let start = (page-1)*num //开始位置
        
        const Goods = mongoose.model('Goods')
        let result = await Goods.find({SUB_ID:CategorySubID})
        .skip(start).limit(num).exec()
        ctx.body = {code:200,message:result}
    }catch(error){
        ctx.body={code:500,message:error}
    }
})
module.exports = router