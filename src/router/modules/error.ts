import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
	{
		name: 'NotFound',
		path: '/error/not-found',
		component: () => import('@/views/error/not-found/NotFound.vue'),
		meta: {
			title: '欢迎使用',
			activePath: '/home',
		},
	},
	{
		name: 'Forbidden',
		path: '/error/forbidden',
		component: () => import('@/views/error/forbidden/Forbidden.vue'),
		meta: {
			title: '无权限',
			activePath: '/home',
		},
	},
]

export default routes
