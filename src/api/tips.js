import request from '@/utils/request'

export const getTip = (data) => {
    return request('my/getTip', 'get', data)
}


// 获取所有攻略
export const getAllTips = () => {
    return request('my/getAllTips', 'get')
}

// 根据id获得攻略
export const getIdTip = (data) => {
    return request('my/getIdTip', 'get', data)
}