import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
	{
		name: 'Individual',
		path: '/individual',
		component: () => import('@/views/individual/Individual.vue'),
		meta: {
			title: '个人中心',
			activePath: '/individual',
		},
	},
]

export default routes
