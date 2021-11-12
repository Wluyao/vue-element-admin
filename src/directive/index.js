import Vue from 'vue'
import _ from 'lodash'

const directiveContext = require.context('./modules', false, /\.js$/)

directiveContext.keys().forEach(path => {
	const directiveName = _.upperFirst(
		_.camelCase(
			path
				.split('/')
				.pop()
				.replace(/\.\w+$/, '')
		)
	)
	const directiveConfig = directiveContext(path)
	Vue.directive(directiveName, directiveConfig.default)
})
