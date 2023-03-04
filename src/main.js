import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router/index'
import './assets/less/index.less'
import store from './store/index'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import './api/mock'
import api from './api/api'
import Cookies from 'js-cookie'

const app = createApp(App);
app.use(ElementPlus);
app.use(router);
app.mount('#app');
app.use(store);
app.config.globalProperties.$api = api;
store.commit('addMenu', router)

function checkRouter(path) {
    let hasCheck = router.getRoutes().filter((r)=> r.path === path).length;
    if(hasCheck) {
        return true
    }else {
        return false
    }
    
}

router.beforeEach((to, from, next) => {
    let token = store.state.token || Cookies.get('token');
    if (!token && to.name !== 'login') {
        next({ name: 'login' })
    } else if (!checkRouter(to.path)) {
        next({name:'home'})
    }
    else {
        next();
    }
})
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
