import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
	{
		name: 'FileToBase64',
		path: '/more/fileToBase64',
		component: () => import('@/views/more/file-to-base64/FileToBase64.vue'),
		meta: {
			title: 'fileToBase64',
		},
	},
]

export default routes
