import request from '@/utils/request'

export const getList = data => request.get('/tab/list', data)
