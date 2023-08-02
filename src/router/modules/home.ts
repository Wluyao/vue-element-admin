import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
	{
		name: 'Home',
		path: '/home',
		component: () => import('@/views/home/Home.vue'),
		meta: {
			title: '首页',
			activePath: '/home',
		},
	},
]

export default routes
