import request from '@/utils/request'

export const getGridData = () => request.get('/dashboard/grid')

export const getLineChartData = data => request.get('/dashboard/lineChart', data)

export const getTodoListData = () => request.get('/dashboard/todoList')
