import api from '@/api'
import { sessionMng } from '@/utils/storage-mng'

export default {
	state: {
		token: sessionMng.getItem('token'),
		userInfo: {},
		routeMap: [],
	},
	mutations: {
		SET_TOKEN(state, token) {
			state.token = token
		},
		SET_USER_INFO(state, userInfo) {
			state.userInfo = userInfo
		},
		SET_ROUTE_MAP(state, routeMap) {
			state.routeMap = routeMap
		},
	},
	actions: {
		// 登录获取token
		async login({ commit }, loginInfo) {
			const username = loginInfo.username.trim()
			const password = loginInfo.password
			const res = await api.account.login({
				username,
				password,
			})
			const token = res.token
			sessionMng.setItem('token', token)
			commit('SET_TOKEN', token)
		},
		// 实际开发token放在请求头的Authorization中
		async getUserInfo({ commit, state }) {
			const res = await api.account.getUserInfo({
				token: state.token,
			})
			commit('SET_USER_INFO', res)
			return res
		},
		async logout({ commit, state }) {
			await api.account.logout({
				token: state.token,
			})
			commit('SET_TOKEN', '')
			commit('SET_USER_INFO', {})
			commit('SET_ROUTE_MAP', [])
			sessionMng.clear()
		},
	},
}
