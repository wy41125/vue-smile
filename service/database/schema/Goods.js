const mongoose = require("mongoose")
const Schema = mongoose.Schema

const GoodsSchema = new Schema({
    ID: {type:String,unique:true},
	GOODS_SERIAL_NUMBER: {type:String},
	SHOP_ID: String,
	SUB_ID: String,
	GOOD_TYPE: Number,
	STATE: Number,
	IS_DELETE: Number,
	NAME: String,
	ORI_PRICE: Number,
	PRESENT_PRICE: Number,
	AMOUNT: Number,
	DETAIL: String,
	BRIEF: String,
	SALES_COUNT: Number,
	IMAGE1: String,
	IMAGE2: String,
	IMAGE3: String,
	IMAGE4: String,
	IMAGE5: String,
	ORIGIN_PLACE: String,
	GOOD_SCENT: String,
	CREATE_TIME: Number,
	UPDATE_TIME: Number,
	IS_RECOMMEND: Number,
	PICTURE_COMPERSS_PATH: String
},{
    collections:'Goods'
})

//发布模型
mongoose.model("Goods",GoodsSchema)