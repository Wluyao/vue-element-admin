import type { App } from 'vue'
import auth from './modules/auth'

const directives = { auth }

export const setupDirectives = (app: App) => {
	Object.keys(directives).forEach((key) => {
		app.directive(key, directives[key])
	})
}
