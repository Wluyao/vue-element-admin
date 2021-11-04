import Mock from 'mockjs'
import api from '../api'

//延时数据返回
Mock.setup({
	timeout: '300-800',
})

const mock = {}
const mockContext = require.context('./modules', false, /\.js$/)
mockContext.keys().forEach(path => {
	const moduleName = _.camelCase(
		path
			.split('/')
			.pop()
			.replace(/\.\w+$/, '')
	)
	mock[moduleName] = mockContext(path)
})

const urlApiList = []
for (const moduleName in api) {
	const apiModule = api[moduleName]
	for (const apiName in apiModule) {
		const url = apiModule[apiName].toString().split("'/")[1].split("'")[0]
		urlApiList.push({ url, moduleName, apiName })
	}
}

Mock.mock(/\//, options => {
	const current = urlApiList.find(item => options.url.includes(item.url))
	const { moduleName, apiName } = current
	return mock[moduleName][apiName](options)
})

// Mock.mock(/\/account\/login/, 'post', account.login)
// Mock.mock(/\/account\/logout/, 'post', account.logout)
// Mock.mock(/\/account\/userInfo/, 'post', account.getUserInfo)
// Mock.mock(/\/account\/captcha/, 'post', account.getCaptcha)
// Mock.mock(/\/account\/register/, 'post', account.register)
// Mock.mock(/\/account\/updatePassword/, 'post', account.updatePassword)

// Mock.mock(/\/dashboard\/grid/, 'get', dashboard.getGridData)
// Mock.mock(/\/dashboard\/lineChart/, 'get', dashboard.getLineChartData)
// Mock.mock(/\/dashboard\/todoList/, 'get', dashboard.getTodoListData)

// Mock.mock(/\/article\/list/, 'get', article.getList)
// Mock.mock(/\/article\/detail/, 'get', article.getDetail)
// Mock.mock(/\/article\/update/, 'post', article.update)
// Mock.mock(/\/article\/remove/, 'post', article.remove)

// Mock.mock(/\/user\/list/, 'get', user.getList)
// Mock.mock(/\/user\/detail/, 'get', user.getDetail)
// Mock.mock(/\/user\/update/, 'post', user.update)
// Mock.mock(/\/user\/remove/, 'post', user.remove)

// Mock.mock(/\/tab\/list/, 'get', tab.getList)
