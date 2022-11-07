import { createApp } from 'vue'
import 'virtual:windi.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import apis from '@/apis'
import message from '@/utils/message'
import App from './App.vue'
import router from './router'
import store from './store'
import { setupDirectives } from './directives'
import './assets/styles/app.less'
import './mock'

window.$apis = apis
window.$message = message

const app = createApp(App)

setupDirectives(app)
app.use(router)
app.use(store)
app.use(ElementPlus, {
	locale: zhCn,
})

app.mount('#app')
