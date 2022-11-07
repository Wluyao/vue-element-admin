import Mock from 'mockjs'
import './modules/article'
import './modules/home'
import './modules/portal'
import './modules/role'
import './modules/user'

//延时数据返回
Mock.setup({
	timeout: '100-500',
})
