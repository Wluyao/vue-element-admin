import Mock from 'mockjs'

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
Mock.mock(/\/system\/captcha/, 'post', getCaptcha)
Mock.mock(/\/system\/register/, 'post', register)
Mock.mock(/\/system\/password\/modify/, 'post', modifyPassword)
