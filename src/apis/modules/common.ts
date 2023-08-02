import request from '@/utils/request'

// 获取用户信息
export const getUserInfo = () => request.post('/system/user/info')
export const getMenuList = () => request.post('/system/menu/list')

// 获取验证码
export const sendEmailCaptcha = (payload: any) => request.post('/system/captcha/sms', payload)
export const sendSmsCaptcha = (payload: any) => request.post('/system/captcha/email', payload)

// 校验验证码
export const validateCaptcha = (payload: any) => request.post('/system/captcha/validate', payload)

// 退出登录
export const logout = () => request.post('/system/logout')

// 上传图片
export const uploadImage = (payload) => request.post('/system/image/upload', payload)
