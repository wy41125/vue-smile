<template>
    <div>
        <div class="navbar-div">
            <van-nav-bar 
                title="类别列表"
            />
        </div>

        <div class="listBox">
            <van-row>
                <van-col span="6">
                    <div id="leftNav">
                        <ul>
                            <li @click="clickCategory(index,item.ID)" :class="{action:categoryIndex==index}" v-for="(item,index) in category" :key="index">
                                {{item.MALL_CATEGORY_NAME }}
                            </li>
                        </ul>
                    </div>
                </van-col>
                <van-col span="18">
                    <div class="tabCategorySub">
                        <van-tabs v-model="active" @click="onClickcategorySub">
                            <van-tab v-for="(item,index) in categorySub" :key="index" :title="item.MALL_SUB_NAME">

                            </van-tab>
                        </van-tabs>
                    </div>
                    <div id="list-div">
                        <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
                            <van-list v-model="loading" :finished="finished" @load="onLoad">
                                <div class="list-item" @click="jumpGoodsInfo(item.ID)" v-for="(item,index) in goodList" :key="index">
                                    <div class="list-item-img">
                                        <img :src="item.IMAGE1" :onerror="errorImg" width="100%">
                                    </div>
                                    <div class="list-item-text">
                                        <div>{{item.NAME}}</div>
                                        <div>￥{{item.ORI_PRICE | monFilter}}元</div>
                                    </div>
                                </div>
                            </van-list>
                        </van-pull-refresh>
                    </div>

                </van-col>
            </van-row>
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
                category: [],//大类
                categoryIndex:0,
                categorySub:[],//小类
                active:0,
                loading:false,//下拉刷新
                finished:false,//上拉加载是否有数据
                goodList:[],//商品列表数据
                isRefresh:false,//下拉刷新
                page:1,//商品列表页数
                categorySubId:'',//商品子类ID
                errorImg:'this.src="'+require('@/assets/images/errorimg.png')+'"',
            }
        },
        created(){
            this.getCategoryList();
        },
        filters:{
            monFilter(m){
                return toMoney(m)
            }
        },
        mounted(){
            let winheight = document.documentElement.clientHeight
            document.getElementById("leftNav").style.height = winheight-46-50 +'px'
            document.getElementById("list-div").style.height = winheight-90 +'px'

        },
        methods:{
            getCategoryList(){//获取大类数据
                axios({
                    url:url.getCategoryList,
                    method:'get'
                }).then(res=>{
                    if(res.data.code==200 && res.data.message){
                        this.category = res.data.message
                        this.getCategorySubList(this.category[0].ID)
                    }else{
                        Toast('服务器错误，数据获取失败！')
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            clickCategory(index,categoryId){//切换大类方法
                this.categoryIndex = index
                this.page=1
                this.finished=false
                this.goodList=[]
                this.getCategorySubList(categoryId)
            },
            //根据大类获取小类
            getCategorySubList(categoryId){
                axios({
                    url:url.getCategorySubList,
                    method:'post',
                    data:{
                        categoryId:categoryId
                    }
                }).then(res=>{
                    if(res.data.code==200 && res.data.message){
                        this.categorySub = res.data.message
                        this.active = 0
                        this.categorySubId=this.categorySub[0].ID
                        this.onLoad()
                    }else{
                        Toast('服务器错误，数据获取失败！')
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            onLoad(){
                setTimeout(()=>{
                    this.categorySubId= this.categorySubId?this.categorySubId:this.categorySub[0].ID
                    this.getGoodList()
                },1000)
            },
            onRefresh(){
                setTimeout( ()=>{
                    this.isRefresh=false
                    this.goodList=[]
                    this.finished = false
                    this.page=1
                    this.onLoad()
                },500)
            },
            getGoodList(){
                axios({
                    url:url.getGoodsListByCategorySubID,
                    method:'post',
                    data:{
                        categorySubID:this.categorySubId,
                        page:this.page
                    }
                }).then(res=>{
                    if(res.data.code==200 && res.data.message.length){
                        this.page++
                        this.goodList = this.goodList.concat(res.data.message)
                    }else{
                        this.finished = true
                    }
                    this.loading=false
                }).catch(err=>{
                    console.log(err)
                })
            },
            onClickcategorySub(index,title){
                this.categorySubId = this.categorySub[index].ID
                this.goodList=[]
                this.finished =false
                this.page=1
                this.onLoad()
            },
            jumpGoodsInfo(goodId){//跳转商品详情页
                this.$router.push({name:'Goods',params:{goodsId:goodId}})
            }

        }
    }
</script>

<style scoped>
    #leftNav{
        background-color: aliceblue;
    }
    #leftNav ul li{
        line-height: 2rem;
        border-bottom: 1px solid #e4e7ed;
        padding: 3px;
        font-size: 0.8rem;
        text-align: center;
    }
    .action{
        background-color: #fff;
    }
    .list-item{
        display: flex;
        flex-direction: row;
        font-size: 0.8rem;
        border-bottom: 1px solid #f0f0f0;
        background-color: #fff;
        padding: 5px;
    }
    #list-div{
        overflow: scroll;
    }
    .list-item-img{
        flex: 8;
    }
    .list-item-text{
        flex: 16;
        margin-top: 10px;
        margin-left: 10px;
    }
</style>