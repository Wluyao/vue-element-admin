import request from '@/utils/request'

// 获取用户列表(不分页)
export const getAllRoleList = () => request.post('/role/all')
