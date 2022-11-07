import request from '@/utils/request'

// 登录
export const login = (data) => request.post('/system/login', data)

// 注册
export const register = (data) => request.post('/system/register', data)

// 修改密码
export const modifyPassword = (data: any) => request.post('/system/password/modify', data)
