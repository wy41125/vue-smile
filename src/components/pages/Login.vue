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
                :error-message="usernameErrorMsg"
            />
            <van-field 
                v-model="password"
                type="password"
                label="密码"
                placeholder="请输入密码"
                required
                :error-message="passwordErrorMsg"
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
                usernameErrorMsg:'',//当用户名出现错误时的提示信息
                passwordErrorMsg:'',//当密码出现错误时的提示信息
            }
        },
        methods:{
            goBack(){
                this.$router.go(-1)
            },
            registerAction(){
                this.checkFrom && this.axiosClick()
            },
            axiosClick(){
                this.openLoading = true;
                axios({
                    url:url.registerUser,
                    method:'post',
                    data:{
                        userName:this.username,
                        password:this.password
                    }
                })
                .then( (res)=>{
                    console.log(res)
                    if(res.data.code == 200){
                        Toast.success(res.data.message)
                        this.$router.push('/')
                    }else{
                        console.log(res.data.message)
                        this.openLoading = false;
                        Toast.fail('注册失败')
                    }
                })
                .catch( (error)=>{
                    this.openLoading = false;
                    console.log(error)
                })
            },
            checkFrom(){//表单验证方法
                let isOk = true
                if(this,username.length<5){
                    this.usernameErrorMsg = '用户名不能小于5位'
                    isOk = false
                }else{
                    this.usernameErrorMsg = ''
                }
                if(this.password.length<6){
                    this.passwordErrorMsg = '密码不能小于6位'
                    isOk = false
                }else{
                    thsi.passwordErrorMsg =''
                }

                return isOk
            }
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