import request from '@/utils/request'

// 登录
export const login = data => request.post('/account/login', data)

// 退出登录
export const logout = data => request.post('/account/logout', data)

// 获取用户信息
export const getUserInfo = data => request.post('/account/userInfo', data)

// 注册
export const register = data => request.post('/account/register', data)

// 获取验证码
export const getCaptcha = data => request.post('/account/captcha', data)

//  修改密码
export const updatePassword = data => request.post('/account/updatePassword', data)
