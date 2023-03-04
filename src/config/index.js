/**
 * 环境配置文件
 * 一般在企业级项目中有三个环境
 * 开发环境
 * 测试环境
 * 线上环境
*/
 
//取当前环境，取不到默认为线上环境
const env = import.meta.env.MODE || 'prod'
console.log(process.env);
 
const EnvConfig={
    development:{
        baseApi:'',
        mockApi:''
    },
    test:{
        baseApi:'//test.future.com/api',
        mockApi:'https://www.fastmock.site/mock'
    },
    prod:{
        baseApi:'//future.com/api',
        mockApi:'https://www.fastmock.site/mock'
    }
}
 
export default {
    env,
    //mock的总开关
    mock: true,
    ...EnvConfig[env]
}