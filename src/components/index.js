// 注册全局组件
import Vue from 'vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

const componentContext = require.context('./base', true, /\.vue$/)

componentContext.keys().forEach(fileName => {
	// 获取组件的PascalCase命名
	const componentName = upperFirst(
		camelCase(
			fileName
				.split('/')
				.pop()
				.replace(/\.\w+$/, '')
		)
	)
	const componentConfig = componentContext(fileName)
	Vue.component(componentName, componentConfig.default || componentConfig)
})
