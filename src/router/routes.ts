import { RouteRecordRaw } from 'vue-router'
import portal from './modules/portal'
import article from './modules/article'
import blank from './modules/blank'
import common from './modules/common'
import home from './modules/home'
import individule from './modules/individule'
import more from './modules/more'
import role from './modules/role'
import setting from './modules/setting'
import user from './modules/user'

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		redirect: '/home',
	},
	{
		path: '/platform',
		component: () => import('@/layouts/platform/Platform.vue'),
		redirect: '/home',
		children: [...article, ...blank, ...common, ...home, ...individule, ...more, ...role, ...setting, ...user],
	},
	{
		path: '/portal',
		component: () => import('@/layouts/portal/Portal.vue'),
		redirect: '/login',
		children: portal,
	},
	{
		path: '/:pathMatch(.*)*',
		redirect: '/not-found',
	},
]

export default routes
