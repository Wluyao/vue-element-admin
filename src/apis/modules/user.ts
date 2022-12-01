import request from '@/utils/request'

export const getUserList = (payload) => request.post('/user/list', payload)
export const getAllUserList = () => request.post('/user/all')

export const getUserDetail = (id: number) => request.post(`/user/detail/${id}`)

export const editUser = (payload) => request.post('/user/edit', payload)

export const deleteUser = (id: number) => request.post(`/user/delete/${id}`)
