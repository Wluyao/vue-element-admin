const InnerLayout = () => import(/* webpackChunkName:'innerLayout' */ '@/layouts/inner-layout')
const Permission = () => import(/* webpackChunkName:'permission' */ '@/pages/permission')

const route = {
	name: 'Permission',
	path: '/permission',
	component: InnerLayout,
	redirect: '/permission/index',
	meta: {
		title: '权限控制',
		icon: 'permission',
	},
	children: [
		{
			path: '/permission/index',
			component: Permission,
			meta: {
				title: '权限控制',
				activePath: '/permission',
			},
		},
	],
}

export default route
