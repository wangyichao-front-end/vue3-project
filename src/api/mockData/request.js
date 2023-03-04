//二次封装axios文件
import axios from "axios";
import config from "../../config";
import { ElMessage } from "element-plus";

const NETWORK_ERROR = '网络请求错误，请稍后重试'
//创建一个axios实例对象
let service = axios.create({
    baseURL: config.baseApi
})
//在请求之前
service.interceptors.request.use((req) => {
    //可以自定义header
    //jwt-token认证的时候
    return req
})

//在请求之后
service.interceptors.response.use((res) => {
    const { code, data, msg } = res.data;
    if (code == 200) return data;
    else {
        ElMessage.error(msg || NETWORK_ERROR);
        return Promise.reject(msg || NETWORK_ERROR);
    }
})

//封装核心函数
function request(options) {

    // options格式：{
        // method:'get'
        // data:{}
        //可能有mock
    // }
    options.method = options.method || 'get';
    if (options.method.toLowerCase() == 'get') {
        options.params = options.data;
    }
    //对mock处理
    let isMock = config.mock;
    if(typeof options.mock !== 'undefined') {
        isMock = options.mock;
    }

    //对线上环境作处理
    if(config.env === 'prod') {
        //上线不让用mock的机会了
        service.defaults.baseURL = config.baseApi;
    }else {
        service.defaults.baseURL = isMock ? config.mockApi:config.baseApi;
    }

    return service(options)
}

export default request
