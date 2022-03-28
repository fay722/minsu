import request from '@/utils/request'

// 提交订单
export const postOrder = (params) => {
    return request('/my/postOrder', 'post', params)
}

// 获取订单
export const getOrder = () => {
    return request('/my/getOrder', 'get')
}

// 退订订单 to2
export const orderStatus2 = (data) => {
    return request('/my/orderStatus2', 'get', data)
}
// 退订订单 to1
export const orderStatus1 = (data) => {
    return request('/my/orderStatus1', 'get', data)
}