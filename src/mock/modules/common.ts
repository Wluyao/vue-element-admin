import Mock from 'mockjs'
import { permissionList } from './role'

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
	permissionList,
}

const getUserInfo = (config) => {
	return Mock.mock({
		code: 200,
		data: userInfo,
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
Mock.mock(/\/system\/userInfo/, 'post', getUserInfo)
