const InnerLayout = () => import(/* webpackChunkName:'innerLayout' */ '@/layouts/inner-layout')
const Dashboard = () => import(/* webpackChunkName:'dashboard' */ '@/pages/dashboard')

const route = {
	name: 'Dashboard',
	path: '/dashboard',
	component: InnerLayout,
	redirect: '/dashboard/index',
	meta: {
		title: '首页',
		icon: 'home',
	},
	children: [
		{
			path: '/dashboard/index',
			component: Dashboard,
			meta: {
				title: '首页',
				activePath: '/dashboard',
			},
		},
	],
}

export default route
