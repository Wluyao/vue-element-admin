import Vue from 'vue'

const filterContext = require.context('./modules', false, /\.js$/)

filterContext.keys().forEach(path => {
	const filterName = path
		.split('/')
		.pop()
		.replace(/\.\w+$/, '')
	const filterConfig = filterContext(path)
	Vue.filter(filterName, filterConfig.default)
})
