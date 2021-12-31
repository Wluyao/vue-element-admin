import Mock from 'mockjs'

const context = require.context('./modules', false, /\.js$/)
context.keys().map(context)

//延时数据返回
Mock.setup({
	timeout: '100-500',
})
