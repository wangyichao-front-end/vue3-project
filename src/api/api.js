//整个项目API的管理
import request from "./mockData/request";
export default {
    getTableData(params) {
        return request({
            url: '/home/getData',
            method: 'get',
            data: params,
            mock: true
        })
    },
    getCountData(params) {
        return request({
            url: '/home/getCountData',
            method: 'get',
            data: params,
            mock: true
        })
    },
    getChartData(params) {
        return request({
            url: '/home/getChartData',
            method: 'get',
            mock: true,
            data: params
        })
    },

    getUserData(params) {
        return request({
            url: '/user/getUser',
            method: 'get',
            mock: true,
            data: params
            // data :{total:xxx,page:xxx,name:'xxx'}
        })
    },
    addUser(params) {
        return request({
            url: '/user/add',
            method: 'post',
            mock: true,
            data: params
        })
    },
    editUser(params) {
        return request({
            url: '/user/edit',
            method: 'post',
            mock: true,
            data: params
        })
    },
    deleteUser(params) {
        return request({
            url: '/user/delete',
            method: 'post',
            mock: true,
            data: params
        })
    },
    
    getMenu(params) {
        return request({
            url: '/login/getMenu',
            method: 'post',
            mock: true,
            data: params
        })
    }
}