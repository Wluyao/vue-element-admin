import request from '@/utils/request'

// 获取用户信息
export const getUserInfo = () => request.post('/system/userInfo')

// 获取验证码
export const sendEmailCaptcha = (data: any) => request.post('/system/captcha/sms', data)
export const sendSmsCaptcha = (data: any) => request.post('/system/captcha/email', data)

// 校验验证码
export const validateCaptcha = (data: any) => request.post('/system/captcha/validate', data)

// 退出登录
export const logout = () => request.post('/system/logout')
