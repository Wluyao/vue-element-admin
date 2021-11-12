import Vue from 'vue'

const directiveContext = require.context('./modules', false, /\.js$/)

directiveContext.keys().forEach(path => {
	const directiveName = path
		.split('/')
		.pop()
		.replace(/\.\w+$/, '')
	const directiveConfig = directiveContext(path)
	Vue.directive(directiveName, directiveConfig.default)
})
