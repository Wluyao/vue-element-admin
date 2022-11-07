import Mock from 'mockjs'

const userData = Mock.mock({
	'list|127': [
		{
			id: '@lower(@guid)',
			name: '@cname',
			phone: /^1[345789]\d{9}$/,
			gender: '@pick(["1", "2"])',
			age: '@natural(20,60)',
			roles: [{ id: 1, name: '管理员' }],
			createDate: '@datetime("yyyy-MM-dd HH:mm:ss")',
			consume: '@natural(0,10000)',
			username: /^[a-zA-Z0-9_]{5,10}$/,
			avatar: 'https://picsum.photos/200/200/?random',
			email: '@email',
		},
	],
})

const getList = (config) => {
	const { page } = JSON.parse(config.body)
	const startNumber = (page.number - 1) * page.size
	const endNumber = startNumber + page.size
	const list = userData.list
	return {
		code: 200,
		data: {
			list: list.slice(startNumber, endNumber),
			total: list.length,
		},
	}
}

const getAllUserList = () => {
	return {
		code: 200,
		data: userData.list,
	}
}

const getDetail = (config) => {
	return {
		code: 200,
		data: userData.list[0],
	}
}

const edit = () => {
	return {
		code: 200,
		data: {},
	}
}

const remove = () => {
	return {
		code: 200,
		data: {},
	}
}

Mock.mock(/\/user\/list/, 'post', getList)
Mock.mock(/\/user\/all/, 'post', getAllUserList)
Mock.mock(/\/user\/detail\/[a-z0-9]/, 'post', getDetail)
Mock.mock(/\/user\/edit/, 'post', edit)
Mock.mock(/\/user\/delete\/[a-z0-9]*/, 'post', remove)
