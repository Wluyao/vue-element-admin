import 'babel-polyfill'
import Vue from 'vue'
import dayjs from 'dayjs'
import ElementUI from 'element-ui'
import reminder from './components/base/reminder'

import App from './App'
import router from './router'
import store from './store'

import './assets/styles/app.scss'
import '@/assets/icons'

// mock数据
import './mock'

import api from './api'

// 全局注册的组件、指令、过滤器
import './components'
import './directive'
import './filters'

Vue.use(ElementUI, {
	size: store.getters.size,
})

Object.defineProperty(Vue.prototype, '$api', {
	value: api,
})
Object.defineProperty(Vue.prototype, '$dayjs', {
	value: dayjs,
})
Object.defineProperty(Vue.prototype, '$reminder', {
	value: reminder,
})

Vue.config.productionTip = false

console.log(111);
new Vue({
	el: '#app',
	router: router,
	store: store,
	render: h => h(App),
})
