import request from '@/utils/request'

export const getPermission = () => {
    return request('/admin/getPermission', 'get')
}


// 获取所有用户
export const getAllUser = () => {
    return request('/admin/allUser', 'get')
}

// 修改用户信息
export const editUser = (body) => {
    return request('/admin/editUser', 'post', body)
}

// 删除用户信息
export const deleteUser = (id) => {
    return request('/admin/delUser', 'get', id)
}

// 搜索用户
export const searchUser = (data) => {
    return request('/admin/searchUser', 'get', data)
}

// 上传民宿信息
export const addHomestays = (data) => {
    return request('/admin/addHomestays', 'post', data)
}

// 删除民宿信息
export const delHomestays = (data) => {
    return request('/admin/delHomestays', 'get', data)
}


// 获取所有攻略信息
export const getAllTips = () => {
    return request('/admin/getAllTips', 'get')
}

// 添加攻略信息
export const addTip = (data) => {
    return request('/admin/addTip', 'post', data)
}

// 删除攻略信息
export const delTip = (data) => {
    return request('/admin/delTip', 'get', data)
}

// 修改攻略信息
export const editTip = (data) => {
    return request('/admin/editTip', 'post', data)
}

// 搜索攻略
export const searchTip = (data) => {
    return request('/admin/searchTip', 'post', data)
}

// 获取所有订单信息
export const getAllOrder = (data) => {
    return request('/admin/getAllOrder', 'get')
}

// 管理员修改民宿信息
export const editHomestay = (data) => {
    return request('/admin/editHomestay', 'post', data)
}