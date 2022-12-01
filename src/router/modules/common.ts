import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
	{
		name: 'NotFound',
		path: '/not-found',
		component: () => import('@/views/common/not-found/NotFound.vue'),
		meta: {
			title: '页面不存在',
			activePath: '/home',
		},
	},
	{
		name: 'Forbidden',
		path: '/forbidden',
		component: () => import('@/views/common/forbidden/Forbidden.vue'),
		meta: {
			title: '无权限',
			activePath: '/home',
		},
	},
	{
		name: 'Reload',
		path: '/reload',
		component: () => import('@/views/common/reload/Reload.vue'),
		meta: {},
	},
]

export default routes
