<template>
    <el-form :model="loginForm" class="login-container">
        <h3>系统登陆</h3>
        <el-form-item>
            <el-input type="input" placeholder="请输入账号" v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item>
            <el-input type="password" placeholder="请输入密码" v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="login">登陆</el-button>
        </el-form-item>
    </el-form>
</template>
<script>

import { getCurrentInstance, reactive } from 'vue';
import { useRouter } from 'vue-router';
import {useStore} from 'vuex'
export default {
    setup() {
        const {proxy} = getCurrentInstance();
        const store  = useStore();
        const router = useRouter()
        let loginForm = reactive({
            username:'ad',
            password:'123'
        })
        const login = async ()=> {
            let res =await proxy.$api.getMenu(loginForm);
            store.commit('setMenu',res.menu);
            store.commit('addMenu',router);
            store.commit('setToken', res.token);
            router.push({name:'Main'})
        }
        return {
            loginForm,
            login
        }
    }
}
</script>

<style lang="less" scoped>
.login-container {
    width: 350px;
    left: 50%;
    top: 30%;
    position: relative;
    transform: translateX(-50%);
    background-color: #fff;
    border: 1px solid #eaeaea;
    border-radius: 15px;
    padding: 35px 35px 15px 35px;
    box-shadow: 0 0 25px #cacaca;

    h3 {
        text-align: center;
        margin-bottom: 25px;
        color: #505450
    }

    :deep(.el-form-item__content) {
        justify-content: center;
    }
}
</style>