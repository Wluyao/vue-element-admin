import request from '@/utils/request'

export const getStatistics = () => request.post('/home/statistics')

export const getVisitTrend = () => request.post('/home/chart/visit')
export const getUserTrend = () => request.post('/home/chart/user')
export const getGoodsTrend = () => request.post('/home/chart/goods')
export const getCommentTrend = () => request.post('/home/chart/comment')

export const getTaskList = () => request.post('/home/task/list')
export const addTask = (payload) => request.post('/home/task/add', payload)
export const editTask = (payload) => request.post('/home/task/edit', payload)
export const deleteTask = (id: number) => request.post(`/home/task/delete/${id}`)
export const finishTask = (payload) => request.post('/home/task/finish', payload)

export const getGoodsList = () => request.post('/home/goods/list')
