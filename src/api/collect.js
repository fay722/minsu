import request from '@/utils/request'

export const getMyAllCollect = () => {
    return request('/my/getMyAllCollect', 'get')
}

// 获取收藏民宿用户列表
export const getCollectUser = (data) => {
    return request('/my/getCollectUser', 'get', data)
}

