import {createRouter ,createWebHashHistory} from 'vue-router'
//动态路由的实现
const routes = [
    {
        path:'/login',
        name:'login',
        component:()=>import('../views/Login.vue')
    },
    {
        path:'/',
        name:'Main',
        component:() => import('../views/Main.vue'),
        redirect:'home',
        // children:[
        //     {
        //         path:'/home',
        //         name:'home',
        //         component:() => import('../views/home/Home.vue')
        //     },
        //     {
        //         path:'/mail',
        //         name:'mail',
        //         component:() => import('../views/Mail/Mail.vue')
        //     },
        //     {
        //         path:'/user',
        //         name:'user',
        //         component:() => import('../views/User/User.vue')
        //     },
        //     {
        //         path:'/page1',
        //         name:'page1',
        //         component:() => import('../views/Page1.vue')
        //     },
        //     {
        //         path:'/page2',
        //         name:'page2',
        //         component:() => import('../views/Page2.vue')
        //     }
        // ]
        children:[]
    }
]
const router = createRouter({
    history:createWebHashHistory(),
    routes:routes

});
export default router