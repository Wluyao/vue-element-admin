// 密码需要为6~20位，且需要包含数字和字母
export const regPassword = /^(?![^a-zA-Z]+$)(?!\D+$).{6,20}$/

// 手机号
export const regMobile = /(^1[3456789]\d{9}$)/

// 电子邮箱
export const regEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/

// 身份证号
export const regIdCard = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/

// 港澳通行证
export const regHkMacao = /^C\d{8}$/

// 中文
export const regChinese = /[\u4E00-\u9FA5]/
