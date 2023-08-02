import request from '@/utils/request'

// 登录
export const login = (payload) => request.post('/system/login', payload)

// 注册
export const register = (payload) => request.post('/system/register', payload)

// 重置密码
export const resetPassword = (payload: any) => request.post('/system/password/reset', payload)
