<template>
    <div>
        <van-nav-bar 
            title="用户登录"
            left-text="返回"
            left-arrow
            @click-left="goBack" 
        />
        <div class="panel">
            <van-field 
                v-model="username"
                label="用户名"
                icon="clear"
                placeholder="请输入用户名"
                required
                @click-icon="username=''"
            />
            <van-field 
                v-model="password"
                type="password"
                label="密码"
                placeholder="请输入密码"
                required
            />
            <div class="button">
                <van-button type="primary" @click="registerAction" size="large" :loading="openLoading">登录</van-button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios"
import url from "@/serviceAPIconfig.js" 
import { Toast } from 'vant'
    export default {
        data() {
            return {
                username: "",
                password:'',
                openLoading:false,//是否开启用户注册的loading状态
            }
        },
        created(){
            if(localStorage.userInfo){
                Toast.success('已登录')
                this.$router.push('/')
            }
        },
        methods:{
            goBack(){
                this.$router.go(-1)
            },
            registerAction(){
                this.axiosClick()
            },
            axiosClick(){
                this.openLoading = true;
                axios({
                    url:url.login,
                    method:'post',
                    data:{
                        userName:this.username,
                        password:this.password
                    }
                })
                .then( (res)=>{
                    console.log(res)
                    if(res.data.code == 200 && res.data.meeeage){
                        new Promise( (resolve,reject)=>{
                            localStorage.userInfo = {userName:this.userName}
                            setTimeout(()=>{resolve()},500)
                        }).then( ()=>{
                            Toast.success("登录成功")
                            this.$router.push('/')
                        }).catch( (err)=>{
                            Toast.fail("登录状态保存失败")
                            console.log(err)
                        })
                        
                    }else{
                        Toast.success("登录失败")
                        this.openLoading = false;
                    }
                })
                .catch( (error)=>{
                    Toast.success("登录失败")
                    this.openLoading = false;
                })
            },
        }
    }
</script>

<style scoped>
    .panel{
        width: 96%;
        border-radius: 5px;
        margin: 20px auto;
        padding-bottom: 80px;
    }
    .button{
        padding-top: 20px;
    }
</style>