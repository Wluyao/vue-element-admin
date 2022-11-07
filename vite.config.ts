import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import windiCSS from 'vite-plugin-windicss'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'

const path = require('path')
const resolve = (dir: string) => path.resolve(process.cwd(), dir)

export default defineConfig({
	base: './',
	plugins: [
		Vue(),
		vueJsx(),
		windiCSS(),
		Icons({
			compiler: 'vue3',
			customCollections: {
				custom: FileSystemIconLoader(resolve('src/assets/icons')),
			},
		}),
		Components({
			dts: true,
			resolvers: [
				IconsResolver({
					prefix: 'icon',
					customCollections: ['custom'],
				}),
			],
		}),
	],
	resolve: {
		alias: {
			'@': resolve('src'),
		},
		dedupe: ['vue'],
	},
	css: {
		preprocessorOptions: {
			less: {
				javascriptEnabled: true,
				modifyVars: {},
				additionalData: `@import "src/assets/styles/mixin.less";@import "src/assets/styles/variable.less";`,
			},
		},
	},
	server: {
		open: true,
		host: '0.0.0.0',
		proxy: {
			'/api': {
				target: '',
				changeOrigin: true,
				ws: true,
				rewrite: (path) => path.replace(/^\/api/, ''),
			},
		},
	},
})
