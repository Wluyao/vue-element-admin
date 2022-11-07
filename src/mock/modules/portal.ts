import Mock from 'mockjs'
import { permissionList } from './role'

const login = (config) => {
	const data = Mock.mock({
		token: '@lower(@guid)',
	})
	return {
		code: 200,
		data: data.token,
	}
}

const logout = () => {
	return {
		code: 200,
		data: {},
	}
}

const getUserInfo = (config) => {
	return Mock.mock({
		code: 200,
		data: {
			id: 1,
			name: '@cname',
			gender: '@pick(["1", "2"])',
			avatar: 'https://s2.ax1x.com/2019/08/02/edRc1P.jpg',
			email: '@email',
			phone: /^1[3456789]\d{9}$/,
			roles: [
				{
					id: 'admin',
					name: '管理员',
				},
			],
			permissionList,
		},
	})
}

const getCaptcha = () => {
	return {
		code: 200,
		data: {},
	}
}

const register = () => {
	return {
		code: 200,
		body: {},
	}
}

const modifyPassword = () => {
	return {
		code: 200,
		body: {},
	}
}

Mock.mock(/\/system\/login/, 'post', login)
Mock.mock(/\/system\/logout/, 'post', logout)
Mock.mock(/\/system\/userInfo/, 'post', getUserInfo)
Mock.mock(/\/system\/captcha/, 'post', getCaptcha)
Mock.mock(/\/system\/register/, 'post', register)
Mock.mock(/\/system\/password\/modify/, 'post', modifyPassword)
