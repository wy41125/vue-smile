<template>
    <div> 
        <div class="search-bar">
            <van-row>
                <van-col span="3">
                    <img :src="locationIcon" width="80%" alt="" class="location-icon">
                </van-col>
                <van-col span="16">
                    <input type="text" class="search-input" />
                </van-col>
                <van-col span="5">
                    <van-button size="mini">搜索</van-button>
                </van-col>
            </van-row>
        </div>
        <div class="swiper-area">
            <van-swipe :autoplay="1000">
                <van-swipe-item v-for="(banner,index) in swipeImg" :key="index">
                    <img v-lazy="banner.image" alt="" width="100%">
                </van-swipe-item>
            </van-swipe>
        </div>
        <div class="type-bar">
            <div v-for="(cate,index) in category" :key="index">
                <img v-lazy="cate.image" alt="" width="90%">
                <span>{{cate.mallCategoryName}}</span>
            </div>
        </div>
        <div>
            <img v-lazy="adBanner" alt="" width="100%">
        </div>
        <div class="recommend-area">
            <div class="recommend-titole">
                商品推荐
            </div>
            <div class="recommend-body">
                <swiper :options="swiperOption">
                    <swiper-slide v-for="(item,index) in recommendDoods" :key="index">
                        <div class="recommend-item">
                            <img v-lazy="item.image" alt="" width="80%">
                            <div >{{item.goodsName}}</div>
                            <div>￥{{item.price | moneyFilter}}(￥{{item.mallPrice | moneyFilter}})</div>
                        </div>
                    </swiper-slide>
                </swiper>
            </div>
        </div>

        <floorComponent :floorData="floor1" :floorTitle="floorName.floor1"></floorComponent>
        <floorComponent :floorData="floor2" :floorTitle="floorName.floor2"></floorComponent>
        <floorComponent :floorData="floor3" :floorTitle="floorName.floor3"></floorComponent>

        <!--Hot Area-->
        <div class="hot-area">
            <div class="hot-title">热卖商品</div>
            <div class="hot-goods">
                <!--这里需要一个list组件-->
                <van-list>
                    <van-row gutter="20">
                        <van-col span="12" v-for="(item,index) in hotGoods" :key="index">
                            <goods-info :goodsImage="item.image" :goodsPrice="item.price" :goodsName="item.name" :goodsId="item.goodsId"></goods-info>
                        </van-col>
                    </van-row>
                </van-list>
            </div>
        </div>

    </div>
</template>

<script>
import axios from "axios"
import "swiper/dist/css/swiper.css"
import {swiper,swiperSlide} from "vue-awesome-swiper"
import floorComponent from "../component/floorComponent"
import {toMoney} from "@/filter/moneyFilter.js"
import goodsInfo from "../component/goodsInfoComponent"
import url from "@/serviceAPIconfig.js"
export default {
        data() {
            return {
                msg: 'shopping mall',
                locationIcon:require("../../assets/images/location.png"),
                swipeImg:[],
                category:[],
                adBanner:"",
                recommendDoods:[],
                swiperOption:{
                    slidesPerView:3,
                },
                floor1:[],
                floor2:[],
                floor3:[],
                floorName:{},
                hotGoods:[],//热卖商品
            }
        },
        filters:{
            moneyFilter(money){
                return toMoney(money)
            }
        },
        components:{
            swiper,swiperSlide,floorComponent,goodsInfo
        },
        created(){
            axios({
                url:url.getShopMallInfo,
                method:"get",
            }).then(Response => {
                console.log(Response)
                if(Response.status == 200){
                    this.hotGoods = Response.data.data.hotGoods;
                    this.floorName = Response.data.data.floorName;
                    this.floor1 = Response.data.data.floor1;
                    this.floor2 = Response.data.data.floor2;
                    this.floor3 = Response.data.data.floor3;
                    this.recommendDoods = Response.data.data.recommend;
                    this.swipeImg = Response.data.data.slides;
                    this.category = Response.data.data.category;
                    this.adBanner = Response.data.data.advertesPicture.PICTURE_ADDRESS;
                }
            }).catch(error => {
                console.log(error)
            })
        }
    }
</script>

<style scoped>
    .search-bar{
        height: 2.2rem;
        background-color: #e5017d;
        line-height: 2.2rem;
        overflow: hidden;
    }
    .search-input{
        width: 100%;
        height: 1.3rem;
        border:0; 
        border-bottom: 1px solid #fff;
        background-color: #e5017d;
        color: #fff;
    }
    .location-icon{
        padding: .2rem 0 0 .3rem;
    }
    .swiper-area{
        clear: both;
        max-height: 13rem;
        overflow: hidden;
    }
    .type-bar{
        background-color: #fff;
        margin: 0 .3rem .3rem .3rem;
        border-radius: .3rem;
        font-size: 14px;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
    }
    .type-bar div{
        padding: .3rem;
        font-size: 12px;
        text-align: center;
    }
    .type-bar div img{
        width: 2.5rem;
    }
    .recommend-area{
        background-color: #fff;
        margin-top: .3rem;
    }
    .recommend-title{
        border-bottom: 1px solid #eee;
        font-size: 14px;
        padding: .2rem;
        color: #e5017d;
    }
    .recommend-body{
        border-bottom: 1px solid #eee;
    }
    .recommend-item{
        width: 99%;
        border-right: 1px solid #eee;
        font-size: 12px;
        text-align: center;
    }
    .hot-area{
        text-align: center;
        font-size:14px;
        height: 1.8rem;
        line-height:1.8rem;
    }
    .hot-goods{
        height: 130rem;
        overflow: hidden;
        background-color: #fff;
    }
</style>