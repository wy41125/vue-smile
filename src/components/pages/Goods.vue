<template>
    <div>
        <div class="navbar-div">
            <van-nav-bar
                title="商品详情"
                left-text="返回"
                left-arrow
                @click-left="onClickLeft"
            />
        </div>
        <div class="topimage-div">
            <img :src="goodsInfo.IMAGE1" alt="" width="100%">
        </div>
        <div class="goods-name">{{goodsInfo.NAME}}</div>
        <div class="goods-price">价格：￥{{goodsInfo.PRESENT_PRICE | moneyFilter}}元</div>
        <div class="detailBox">
            <van-tabs swipeable sticky><!-- vant插件左右滑动插件和吸顶效果 -->
                <van-tab title="商品详情">
                    <div v-html="goodsInfo.DETAIL" class="detail"></div>
                </van-tab>
                <van-tab title="评论">
                    评论
                </van-tab>
            </van-tabs>
        </div>

        <div class="goods-botton">
            <div>
                <van-button size="large" type="primary">加入购物车</van-button>
            </div>
            <div>
                <van-button size="large" type="danger">购买</van-button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import url from '@/serviceAPIconfig.js'
import {Toast} from 'vant'
import {toMoney} from '@/filter/moneyFilter.js'
    export default {
        data() {
            return {
                goodsId: '',
                goodsInfo:{},//商品信息
            }
        },
        created(){
            this.goodsId = this.$route.query.goodsId?this.$route.query.goodsId:this.$route.params.goodsId
            this.getInfo()
        },
        filters:{
            moneyFilter(money){
                return toMoney(money)
            }
        },
        methods:{
            getInfo(){
                axios({
                    url:url.getGoodsInfo,
                    method:'post',
                    data:{
                        goodId:this.goodsId
                    }
                }).then( (res)=>{
                    if(res.data.code==200 && res.data.message){
                        this.goodsInfo = res.data.message
                    }else{
                        Toast('服务器错误，数据获取失败！')
                    }
                    console.log(res.data.message)
                }).catch( err=>{
                    console.log(err)
                })
            },
            onClickLeft(){
                this.$router.go(-1)
            }
        }
    }
</script>

<style scoped>
    .goods-name,.goods-price{
        background-color: #fff;
    }
    .detailBox{
        margin-bottom: 60px;
    }
    .detail{
        font-size: 0;
    }
    .goods-botton{
        position: fixed;
        bottom: 0;
        left: 0;
        background-color: #fff;
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-flow: nowrap;
    }
    .goods-botton >div{
        flex: 1;
        padding: 5px;
    }
</style>