/**
 * 路由权限配置
 * 如果配置了一级路由，则它之下的所有子路由都可访问。
 */
//

export const admin = [
	'Icon',
	'Chart',
	'Form',
	'Excel',
	'Tab',
	'AMap',
	'Error',
	'Permission',
	'User',
	'Article',
	'More',
	'404',
]

export const guest = ['Icon', 'Chart', 'Form', 'Excel', 'Tab', 'AMap', 'Error', 'More', '404']

export const editor = ['Article', 'Error', 'More', '404']
