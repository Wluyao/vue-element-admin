import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import message from '@/utils/message'
import App from './App.vue'
import router from './router'
import store from './store'
import { setupDirectives } from './directives'
import './assets/styles/app.less'
import './mock'

window.$message = message

const app = createApp(App)

setupDirectives(app)
app.use(router)
app.use(store)
app.use(ElementPlus, {
	locale: zhCn,
	size: 'large',
})

app.mount('#app')
