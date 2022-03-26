import request from '@/utils/request'

// 注册用户
export const userRequest = (params) => {
    return request('/api/register', 'post', params)
}

// 登陆用户
export const userLogin = (params) => {
    return request('/api/login', 'post', params)
}

// 修改密码
export const userChangPwd = (params) => {
    return request('/my/updatePwd', 'post', params)
}

// 获取手机号
export const getUserInfo = () => {
    return request('/my/userinfo', 'get')
}

//  收藏民宿
export const getcollectHomestay = (data) => {
    return request('/my/collectHomestay', 'get', data)
}

// 取消收藏
export const cancelCollect = (data) => {
    return request('/my/cancelCollect', 'get', data)
}

// 查看是否收藏
export const watchCollect = (data) => {
    return request('/my/watchCollect', 'get', data)
}