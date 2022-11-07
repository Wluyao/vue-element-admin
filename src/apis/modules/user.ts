import request from '@/utils/request'

export const getUserList = (data) => request.post('/user/list', data)
// 获取用户列表(不分页)
export const getAllUserList = () => request.post('/user/all')

export const getUserDetail = (id: number) => request.post(`/user/detail/${id}`)

export const editUser = (data) => request.post('/user/edit', data)

export const deleteUser = (id: number) => request.post(`/user/delete/${id}`)
