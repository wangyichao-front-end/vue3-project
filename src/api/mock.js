import Mock from 'mockjs'
import homeApi from './mockData/home'
import userApi from './mockData/user'
import loginApi from './mockData/login'
//Mock拦截请求
Mock.mock('/home/getData', homeApi.getHomeData);
Mock.mock('/home/getCountData', homeApi.getCountData);
Mock.mock('/home/getChartData', homeApi.getChartData)


Mock.mock(/user\/getUser/, 'get',userApi.getUserList)
Mock.mock(/user\/add/, 'post',userApi.createUser)
Mock.mock(/user\/edit/, 'post',userApi.updateUser)

Mock.mock(/user\/delete/, 'post',userApi.deleteUser)

Mock.mock(/login\/getMenu/,'post',loginApi.getMenu)



