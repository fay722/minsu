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