import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import AutoImport from 'unplugin-auto-import/vite'

const path = require('path')
const resolve = (dir: string) => path.resolve(process.cwd(), dir)

export default defineConfig({
	base: './',
	plugins: [
		Vue(),
		vueJsx(),
		Icons({
			compiler: 'vue3',
			customCollections: {
				custom: FileSystemIconLoader(resolve('src/assets/icons')),
			},
		}),
		AutoImport({
			imports: ['vue', 'vue-router'],
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
			'@img': resolve('src/assets/images'),
		},
		dedupe: ['vue'],
	},
	css: {
		postcss: {
			plugins: [require('tailwindcss')('tailwind.config.js')],
		},
		preprocessorOptions: {
			less: {
				javascriptEnabled: true,
				globalVars: {
					primary: '#0084ff',
					warning: '#ffae00',
					danger: '#fe1e67',
					success: '#00caa2',
					info3: '#333',
					info6: '#666',
					info9: '#999',
				},
			},
		},
	},
	server: {
		open: true,
		proxy: {
			'/api': {
				target: '',
				changeOrigin: true,
				ws: true,
				rewrite: (path) => path.replace(/^\/api/, ''),
			},
		},
	},
	build: {
		rollupOptions: {
			output: {
				manualChunks: {
					vue: ['vue', 'vue-router', 'pinia'],
					lodash: ['lodash'],
					element: ['element-plus'],
				},
				chunkFileNames: 'js/[name]-[hash].js',
				entryFileNames: 'js/[name]-[hash].js',
				assetFileNames: '[ext]/[name]-[hash].[ext]',
			},
		},
	},
})
