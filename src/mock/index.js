import Mock from 'mockjs'
import './modules/account'
import './modules/dashboard'
import './modules/article'
import './modules/user'
import './modules/tab'

//延时数据返回
Mock.setup({
	timeout: '300-800',
})
