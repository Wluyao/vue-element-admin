import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import _ from 'lodash'
import { useAppStore } from '@/store'
import { getTreeNodeValue } from '@/utils/core'

import routes from './routes'
import portalRoutes from './modules/portal'

const initRouter = () =>
	createRouter({
		history: createWebHashHistory(),
		routes,
		scrollBehavior: () => ({ left: 0, top: 0 }),
	})

const router = initRouter()

// 导航守卫
router.beforeEach(async (to) => {
	const title = to.meta && (to.meta.title as string)
	if (title) {
		document.title = '管理系统-' + title
	}

	const appStore = useAppStore()
	const outerPaths = getTreeNodeValue(portalRoutes, 'path')

	if (!outerPaths.includes(to.path)) {
		if (!appStore.token) {
			return '/login'
		}
		if (!appStore.userInfo.id) {
			await Promise.all([appStore.getUserInfo(), appStore.getMenuList()])
		}
	}
})

export default router
