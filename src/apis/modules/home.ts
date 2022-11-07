import request from '@/utils/request'

export const getStatistics = () => request.post('/home/statistics')

export const getVisitTrend = () => request.post('/home/chart/visit')
export const getUserTrend = () => request.post('/home/chart/user')
export const getGoodsTrend = () => request.post('/home/chart/goods')
export const getCommentTrend = () => request.post('/home/chart/comment')

export const getTaskList = () => request.post('/home/task/list')
export const addTask = (data) => request.post('/home/task/add', data)
export const editTask = (data) => request.post('/home/task/edit', data)
export const deleteTask = (id: number) => request.post(`/home/task/delete/${id}`)
export const finishTask = (data) => request.post('/home/task/finish', data)

export const getGoodsList = () => request.post('/home/goods/list')
