// 用户信息

export interface IUser {
	id: number
	name: string
	username: string
	mobile: string
	email: string
	avatar: string
	gender: '1' | '2'
	age: number
	// 角色
	role: number
	createDate: string
	remark?: string
}

// 菜单
export interface IMenu {
	id: number
	name: string
	// menu:菜单权限 button:按钮权限
	type: 'menu' | 'button'
	// 菜单图标
	icon?: string
	// 权限码
	permission?: string
	// 页面路径
	path?: string
	children?: IMenu[]
}
