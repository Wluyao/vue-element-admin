import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
	{
		path: '/login',
		component: () => import('@/views/portal/login/Login.vue'),
		meta: {
			title: '登录',
		},
	},
	{
		path: '/password',
		component: () => import('@/views/portal/password/Password.vue'),
		meta: {
			title: '忘记密码',
		},
	},
	{
		path: '/register',
		component: () => import('@/views/portal/register/Register.vue'),
		meta: {
			title: '注册',
		},
	},
]

export default routes
