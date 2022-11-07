import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import _ from 'lodash'
import { useAppStoreWithOut } from '@/store'
import { getTreeNodeValue } from '@/utils/core'
import { TokenName } from '@/config/const'
import { localMng } from '@/utils/storage-mng'
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
	const token = localMng.getItem(TokenName)
	const outerPaths = getTreeNodeValue(portalRoutes, 'path')
	// token不存在(说明没登录),但是路由将要进入系统内部，自动跳到登录页面。
	if (!token && !outerPaths.includes(to.path)) {
		return '/login'
	} else {
		const appStore = useAppStoreWithOut()
		// 如果token存在(说明已登录)，但是用户信息不存在，这时应该获取用户信息(用于处理刷新页面的情况)
		if (token && !appStore.userInfo.id) {
			await appStore.getUserInfo()
			return { ...to, replace: true }
		}
	}
})

export default router
