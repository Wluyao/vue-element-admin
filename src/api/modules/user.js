import request from '@/utils/request'
import { paramsSerializer } from '@/utils/core'

// 获取用户列表
export const getList = data =>
	request.get('/user/list', data, {
		paramsSerializer(params) {
			return paramsSerializer(params)
		},
	})

// 获取用户详情
export const getDetail = data => request.get('/user/detail', data)

// 新增/修改用户
export const update = data => request.post('/user/update', data)

// 删除用户
export const remove = data => request.post('/user/remove', data)
