import Cookies from 'js-cookie';
import { createStore } from 'vuex'

export default createStore({
    state: {
        isCollapse: false,
        currentMenu: null,
        tabList: [
            {
                path: 'home',
                name: 'home',
                label: '首页',
                icon: 'house',
                url: 'home/Home'
            },
        ],
        menu:[],
        token:''
    },
    mutations: {
        updateIsCollapse(state, value) {
            state.isCollapse = !state.isCollapse
        },
        selectMenu(state, value) {
            //判断
            if (value.name == 'home') {
                state.currentMenu = null
            } else {
                state.currentMenu = value;
                let res = state.tabList.findIndex(item => item.name == value.name);
                if (res == -1) {
                    state.tabList.push(value)
                }
            }
        },
        closeTab(state, value) {
            let Index = state.tabList.findIndex(item => item.name === value.name);
            state.tabList.splice(Index, 1)
        },
        setMenu(state, value) {
            state.menu = value;
            localStorage.setItem('menu', JSON.stringify(value))
        },
        addMenu(state,router) {
            const modules = import.meta.glob('../views/*/*.vue');
            const modules2 = import.meta.glob('../views/*.vue');
            if(!localStorage.getItem('menu')) {
                return
            }
            const menu = JSON.parse(localStorage.getItem('menu'));
            state.menu = menu;
            console.log('menu',menu);

            let menuArr = [];
            menu.forEach(item => {
                if(item.children) {
                    item.children = item.children.map((item) => {
                        item.component = modules2[`../views/${item.url}.vue`];
                        return item
                    })
                    menuArr.push(...item.children)
                }else {
                    item.component =  modules[`../views/${item.url}.vue`];
                    menuArr.push(item);

                }
            });
            console.log('menu',menu[0].component);
            menuArr.forEach(item=> {
                router.addRoute('Main', item)
            })
            
        },
        cleanMenu(state, value) {
            state.menu = [];
            localStorage.removeItem('menu');
        },
        setToken(state, value) {
            state.token = value;
            Cookies.set('token', value);
        },
        cleanToken(state) {
            state.token = '';
            Cookies.remove('token')
        },
        
    }
})