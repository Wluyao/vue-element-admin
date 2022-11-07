import { defineStore } from 'pinia'
import _ from 'lodash'
import { localMng } from '@/utils/storage-mng'
import uiConfig from '@/config/ui'

interface IState {
	// 是否折叠侧边菜单
	sideCollapse: boolean
	// 系统主题色
	theme: string
}

export const useUiStore = defineStore('ui', {
	state: (): IState => ({
		sideCollapse: localMng.getItem('sideCollapse') || uiConfig.sideCollapse,
		theme: localMng.getItem('theme') || uiConfig.themeColor,
	}),
	getters: {},
	actions: {
		setSideCollapse(collapse: boolean) {
			this.sideCollapse = collapse
			localMng.setItem('sideCollapse', collapse)
		},
	},
})
