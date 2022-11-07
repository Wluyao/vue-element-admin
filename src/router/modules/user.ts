import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
	{
		name: 'User',
		path: '/user',
		component: () => import('@/views/user/User.vue'),
		meta: {
			title: '用户管理',
			activePath: '/user',
		},
	},
]

export default routes
