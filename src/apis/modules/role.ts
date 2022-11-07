import request from '@/utils/request'

// 获取权限列表
export const getPermissionList = () => request.post('/role/permission/')
// 获取用户列表(不分页)
export const getAllRoleList = () => request.post('/role/all')
