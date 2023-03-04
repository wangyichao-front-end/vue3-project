<template >
    <el-aside height="100vh" :width="$store.state.isCollapse? '100px':'200px'">
        <el-menu active-text-color="#ffd04b" background-color="#545c64" default-active="2" text-color="#fff"
            @open="handleOpen" @close="handleClose" :collapse="$store.state.isCollapse" :collapse-transition="false">
            <h3 v-show="!$store.state.isCollapse">通用后台管理系统</h3>

            <el-menu-item :index="item.path" :key='item.path' v-for="item in noChildren()" @click="clickMenu(item)">
                <!-- vue3动态引入icon -->
                <component class="icons" :is='item.icon'> </component>
                <span class="spans">{{ item.label }}</span>
            </el-menu-item>
            <el-sub-menu v-for='item in hasChildren()' :index="item.path" :key="item.path">
                <template #title>
                    <component class="icons" :is='item.icon'> </component>
                    <span class="spans">{{ item.label }}</span>
                </template>

                <el-menu-item v-for='children in item.children' :index="children.path" :key="children.path"
                    :title='children.label' @click="clickMenu(children)" >

                    <component class="icons" :is='children.icon'> </component>
                    <span class="spans"> {{ children.label }}</span>
                </el-menu-item>
                <!-- </el-menu-item-group> -->

            </el-sub-menu>

        </el-menu>
    </el-aside>
</template>
<style lang="less" scoped>
.icons {
    width: 20px;
    height: 20px;
}

.spans {
    padding-left: 10px;
}

.el-menu {
    width: 100%;
    height: 100%;
    border: none;
    h3 {
        line-height: 48px;
        color:#fff;
        text-align: center;
    }
}


</style>
<script >
import {useRouter} from 'vue-router'
import { useStore } from 'vuex';
export default {
    setup() {
        const store = useStore();
        const router = useRouter();
        // const list = [
        //     {
        //         path: '/',
        //         name: 'home',
        //         label: '首页',
        //         icon: 'house',
        //         url: 'home/Home'
        //     },
        //     {
        //         path: 'mail',
        //         name: 'mail',
        //         label: '商品管理',
        //         icon: 'video-play',
        //         url: 'Mail/Mail'
        //     },
        //     {
        //         path: 'user',
        //         name: 'user',
        //         label: '用户管理',
        //         icon: 'user',
        //         url: 'User/User'
        //     },
        //     {
        //         label: '其他',
        //         icon: 'location',
        //         path: 'other',
        //         children: [
        //             {
        //                 path: 'page1',
        //                 name: 'page1',
        //                 label: '页面1',
        //                 icon: 'setting',
        //                 url: 'Page1'
        //             },
        //             {
        //                 path: 'page2',
        //                 name: 'page2',
        //                 label: '页面2',
        //                 icon: 'setting',
        //                 url: 'Page2'
        //             }
        //         ]
        //     }
        // ];
        const asyncList = store.state.menu;
        const noChildren = () => {
            return asyncList .filter(item => {
                return !item['children']
            })
        }

        const hasChildren = () => {
            return asyncList.filter(item => {
                return item.children
            })
        }
        const clickMenu = (i) => {
            router.push({
                name:i.name,
            })
            //vuex来管理
            store.commit('selectMenu',i);
            
        }
        
        return {
            noChildren, hasChildren,clickMenu
        }

    }
}
</script>
