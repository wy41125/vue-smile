const BASEURL = "https://www.easy-mock.com/mock/5caff428934a9160288ff555/smileVue/"
const LOCALURL ="http://localhost:3000/"
const URL = {
    getShopMallInfo: BASEURL + "index",
    registerUser:LOCALURL+"user/register",//用户注册接口
    login:LOCALURL+"user/login",//用户登录接口
    getGoodsInfo:LOCALURL+"goods/getDetailGoodsInfo",//用户登录接口
    getCategoryList:LOCALURL+"goods/getCategoryList",//获取大类信息
    getCategorySubList:LOCALURL+"goods/getCategorySubList",//获取小类信息
    getGoodsListByCategorySubID:LOCALURL+"goods/getGoodsListByCategorySubID",//获取小类商品列表信息
}

module.exports = URL