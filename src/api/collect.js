import request from '@/utils/request'

// 获取
export const getMyAllCollect = () => {
    return request('/my/getMyAllCollect', 'get')
}

// 获取收藏民宿用户列表
export const getCollectUser = (data) => {
    return request('/my/getCollectUser', 'get', data)
}

// 获取民宿收藏数量
export const getCollectNum = (data) => {
    return request('/my/getCollectNum', 'get', data)
}

