import { h } from 'vue'
import { defineStore } from 'pinia'
import _ from 'lodash'
import apis from '@/apis'
import router from '@/router'
import store from '@/store'
import { TokenName } from '@/config/const'
import request from '@/utils/request'
import { getTreeNodeValue } from '@/utils/core'
import { localMng, sessionMng } from '@/utils/storage-mng'
import { IUser, IMenu } from '@/model/common'

interface IState {
	token: string
	userInfo: IUser
	menuList: IMenu[]
	permissions: string[]
}

export const useAppStore = defineStore('app', {
	state: (): IState => ({
		token: localMng.getItem(TokenName),
		userInfo: {} as IUser,
		menuList: [],
		permissions: [],
	}),
	actions: {
		setToken(token: string) {
			this.token = token
		},
		// 登录
		async login(payload) {
			const data = await apis.portal.login(payload)
			this.token = data
			localMng.setItem(TokenName, data)
			request.setHeader({
				Authorization: data,
			})
			await this.getUserInfo()
			router.replace('/home')
		},
		// 获取用户信息
		async getUserInfo() {
			const data = await apis.common.getUserInfo()
			this.getMenuList(data.permissionList)
			this.userInfo = data
		},
		// 获取菜单和权限
		async getMenuList(menus: IMenu[]) {
			this.menuList = getMenuList(menus)
			this.permissions = getPermissions(menus)
		},
		//  退出
		async logout(isRequest = true) {
			if (isRequest) {
				await apis.common.logout()
			}
			router.replace('/login')
			sessionMng.clear()
			localMng.removeItem(TokenName)
			request.setHeader({
				Authorization: '',
			})
			this.$reset()
		},
	},
})

export const useAppStoreWithOut = () => useAppStore(store)

// 获取菜单
const getMenuList = (menus: IMenu[]) =>
	_.cloneDeep(menus).filter((menu) => {
		if (menu.type === 'menu') {
			if (menu.children) {
				const children = getMenuList(menu.children)
				menu.children = children.length > 0 ? children : undefined
			}
			return true
		} else {
			return false
		}
	})

// 获取用户拥有的权限
const getPermissions = (menus: IMenu[]) =>
	getTreeNodeValue(menus, 'permission').reduce(
		(accumulate: string[], current: string) => accumulate.concat(current),
		[]
	)
