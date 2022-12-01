import request from '@/utils/request'

export const editUserInfo = (payload) => request.post('/individual/edit/userInfo', payload)
// 修改密码
export const modifyPassword = (payload: any) => request.post('/system/password/modify', payload)
