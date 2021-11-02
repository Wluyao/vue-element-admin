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
	'Pdf',
	'Other',
	'404',
]

export const guest = ['Icon', 'Chart', 'Form', 'Excel', 'Tab', 'AMap', 'Error', 'Other', '404']

export const editor = ['Article', 'Error', 'Other', '404']
