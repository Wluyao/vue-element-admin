import Mock from 'mockjs'

const loginInfo = Mock.mock({
	token: '@lower(@guid)',
})

const userInfo = Mock.mock({
	id: '@lower(@guid)',
	name: '@cname',
	gender: '@pick(["男", "女"])',
	avatar: 'https://s2.ax1x.com/2019/08/02/edRc1P.jpg',
	email: '@email',
	mobilePhone: /^1[345789]\d{9}$/,
	roles: ['admin'],
	routeNames: [],
})

const adminToken = '6f81bbab-5b7e-abfb-bd44-efd5aeee82cc'
const editorToken = 'd02fd62b-cfdf-9efb-adfb-7fc1e85bf99c'
const guestToken = 'ecfe1e6b-cba6-dfee-fdba-12015b7f2420'

const login = config => {
	const { username } = JSON.parse(config.body)
	if (username === 'editor') {
		loginInfo.token = editorToken
	} else if (username === 'guest') {
		loginInfo.token = guestToken
	} else {
		loginInfo.token = adminToken
	}
	return {
		code: 200,
		data: loginInfo,
	}
}

const logout = () => {
	return {
		code: 200,
		data: {},
	}
}

const getUserInfo = config => {
	const { token } = JSON.parse(config.body)
	// 如果配置了一级菜单，则它之下的所有子菜单都可访问。
	if (token === editorToken) {
		userInfo.roles = ['editor']
		userInfo.routeNames = ['Dashboard', 'Blank', 'Mine', 'Article', 'Error', 'More', '404']
	} else if (token === guestToken) {
		userInfo.roles = ['guest']
		userInfo.routeNames = [
			'Dashboard',
			'Blank',
			'Mine',
			'Icon',
			'Chart',
			'Form',
			'Excel',
			'Tab',
			'AMap',
			'Error',
			'More',
			'404',
		]
	} else {
		userInfo.roles = ['admin']
		userInfo.routeNames = [
			'Dashboard',
			'Blank',
			'Mine',
			'Icon',
			'Chart',
			'Form',
			'Excel',
			'Tab',
			'AMap',
			'Error',
			'Permission',
			'User',
			'Article',
			'More',
			'404',
		]
	}
	return {
		code: 200,
		data: userInfo,
	}
}

const getCaptcha = config => {
	return {
		code: 200,
		data: {},
	}
}

const register = config => {
	return {
		code: 200,
		data: {},
	}
}

const updatePassword = config => {
	return {
		code: 200,
		data: {},
	}
}

Mock.mock(/\/account\/login/, 'post', login)
Mock.mock(/\/account\/logout/, 'post', logout)
Mock.mock(/\/account\/userInfo/, 'post', getUserInfo)
Mock.mock(/\/account\/captcha/, 'post', getCaptcha)
Mock.mock(/\/account\/register/, 'post', register)
Mock.mock(/\/account\/updatePassword/, 'post', updatePassword)
