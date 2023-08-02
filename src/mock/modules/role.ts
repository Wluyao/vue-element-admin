import Mock from 'mockjs'

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

Mock.mock(/\/role\/all/, 'post', getAllRoleList)
