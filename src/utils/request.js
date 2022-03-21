import axios from 'axios'
import store from '@/store'

export const baseURL = 'http://127.0.0.1:3007'
const instance = axios.create({
    baseURL,
    timeout: 5000
})

// 请求拦截器
instance.interceptors.request.use(config => {
    // 获取用户信息对象
    const user = store.state.user.user
    // console.log(user);
    // 是否有token
    if (user.token) {
        // 设置token
        config.headers.Authorization = `${user.token}`
    }
    return config
}, err => {
    return Promise.reject(err)
})

export default (url, method, submitData) => {
    // 负责发请求：请求地址，请求方式，提交的数据
    return instance({
        url,
        method,
        [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}