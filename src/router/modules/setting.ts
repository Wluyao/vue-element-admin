import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
	{
		name: 'Setting',
		path: '/setting',
		component: () => import('@/views/setting/Setting.vue'),
		meta: {
			title: '系统设置',
			activePath: '/setting',
		},
	},
]

export default routes
