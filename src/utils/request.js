import axios from 'axios'

export const baseURL = 'http://127.0.0.1:3007'
const instance = axios.create({
    baseURL,
    timeout: 5000
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