import Mock from 'mockjs'

export const permissionList = [
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
				name: '打印',
				type: 'menu',
				path: '/more/print',
			},
			{
				id: 102,
				name: 'fileToBase64',
				type: 'menu',
				path: '/more/fileToBase64',
			},
		],
	},
]

const getPermissionList = () => {
	return {
		code: 200,
		data: permissionList,
	}
}

const getAllRoleList = () => {
	return {
		code: 200,
		data: [
			{
				id: 1,
				name: '管理员',
			},
			{
				id: 2,
				name: '运营',
			},
			{
				id: 3,
				name: '游客',
			},
		],
	}
}

Mock.mock(/\/role\/permission/, 'post', getPermissionList)
Mock.mock(/\/role\/all/, 'post', getAllRoleList)
