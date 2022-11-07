import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
	{
		name: 'Role',
		path: '/role',
		component: () => import('@/views/role/Role.vue'),
		meta: {
			title: '角色管理',
			activePath: '/role',
		},
	},
]

export default routes
