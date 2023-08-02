import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
	{
		name: 'Blank',
		path: '/blank',
		component: () => import('@/views/blank/Blank.vue'),
		meta: {
			title: '空白页',
			activePath: '/blank',
		},
	},
]

export default routes
