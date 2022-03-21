import request from '@/utils/request'

// 提交订单
export const postOrder = (params) => {
    return request('/my/postOrder', 'post', params)
}

// 获取订单
export const getOrder = () => {
    return request('/my/getOrder', 'get')
}