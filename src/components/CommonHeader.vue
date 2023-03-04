<template>
    <el-header class="header">
        <div class="l-content">
            <el-button :size="small" @click="handleCollapse" plain>
                <el-icon :size="20">
                    <Menu />
                </el-icon>
            </el-button>
            <el-breadcrumb separator=" / " class="bread">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: current.path }" v-if="current">{{ current.label }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="r-content">
            <el-dropdown>
                <span class="el-dropdown-link">
                    <img :src="getImgSrc('user')" alt="Chris">
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>个人中心</el-dropdown-item>
                        <el-dropdown-item divided @click="loginout">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </el-header>
</template>
<style lang="less" scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #333;
    width: 100%;
    .r-content {
        img {
            width: 40px;
            border-radius: 50%;
            margin-right: 20px;
        }
    }

    .l-content {
        display: flex;
        align-items: center;

        .el-button {
            margin-left: 20px;
            margin-right: 20px;
        }

        h3 {
            color: #fff;
        }
        .bread :deep(.el-breadcrumb__inner) {
            color: #fff ;
            cursor: pointer;
        }

        
    }
    
}
</style>
<script>

import { computed } from '@vue/reactivity';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex'
// import store from '../store'
export default {
    setup() {
        const router = useRouter();
        let store = useStore();
        const current = computed(() => {
            return store.state.currentMenu;
        })
        //以动态的方式：vite中静态资源引入的方法！
        const getImgSrc = (user) => {
            return new URL(`../assets/imgs/${user}.png`, import.meta.url).href
        }
        const handleCollapse = () => {
            //调用vuex中的mutations方法
            store.commit('updateIsCollapse')
        }
        const loginout = ()=> {
            store.commit('cleanMenu');
            store.commit('cleanToken')
            router.push({path:'/login'})
        }

        return {
            getImgSrc, handleCollapse, current,loginout
        }
    }

}


</script>