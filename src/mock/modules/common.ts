import Mock from 'mockjs'

const userInfo = {
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
}

export const menuList = [
	{
		id: 1,
		name: '首页',
		type: 'menu',
		icon: 'home',
		path: '/home',
	},
	{
		id: 2,
		name: '空白页',
		type: 'menu',
		icon: 'blank',
		path: '/blank',
	},
	{
		id: 3,
		name: '用户管理',
		type: 'menu',
		icon: 'user',
		path: '/user',
		children: [
			{
				id: 31,
				name: '新增用户',
				type: 'component',
				permission: 'userAdd',
			},
			{
				id: 32,
				name: '编辑用户',
				type: 'component',
				permission: 'userEdit',
			},
			{
				id: 33,
				name: '删除用户',
				type: 'component',
				permission: 'userDelete',
			},
			{
				id: 34,
				name: '导出用户',
				type: 'component',
				permission: 'userExport',
			},
		],
	},
	{
		id: 4,
		name: '文章管理',
		type: 'menu',
		icon: 'article',
		path: '/article',
	},
	{
		id: 5,
		name: '角色管理',
		type: 'menu',
		icon: 'role',
		path: '/role',
	},
	{
		id: 10,
		name: '其他功能',
		type: 'menu',
		icon: 'more',
		path: '/more',
		children: [
			{
				id: 101,
				name: 'fileToBase64',
				type: 'menu',
				path: '/more/fileToBase64',
			},
		],
	},
]

const getUserInfo = (config) => {
	return Mock.mock({
		code: 200,
		data: userInfo,
	})
}

const getMenuList = (config) => {
	return Mock.mock({
		code: 200,
		data: menuList,
	})
}

const uploadImage = (config) => {
	return {
		code: 200,
		data: {
			imgUrl: 'https://s2.ax1x.com/2019/08/02/edRc1P.jpg',
		},
	}
}

Mock.mock(/\/system\/image\/upload/, 'post', uploadImage)
Mock.mock(/\/system\/user\/info/, 'post', getUserInfo)
Mock.mock(/\/system\/menu\/list/, 'post', getMenuList)
