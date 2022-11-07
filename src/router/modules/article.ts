import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
	{
		name: 'Article',
		path: '/article',
		component: () => import('@/views/article/home/Home.vue'),
		meta: {
			title: '文章列表',
			activePath: '/article',
		},
	},
	{
		name: 'ArticleAdd',
		path: '/article/add',
		component: () => import('@/views/article/edit/Edit.vue'),
		meta: {
			title: '新增文章',
			activePath: '/article',
		},
	},
	{
		name: 'ArticleEdit',
		path: '/article/edit/:articleId',
		component: () => import('@/views/article/edit/Edit.vue'),
		meta: {
			title: '编辑文章',
			activePath: '/article',
		},
	},
]

export default routes
