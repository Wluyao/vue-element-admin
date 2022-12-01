import Mock from 'mockjs'

const editUserInfo = (config) => {
	return {
		code: 200,
	}
}

Mock.mock(/\/individual\/edit\/userInfo/, 'post', editUserInfo)
