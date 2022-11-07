// 用户信息
export interface IUserInfo {
	id: number
	// 姓名
	name: string
	// 邮箱
	email: string
	// 手机号
	phone: string
	// 性别
	gender?: '1' | '2'
	// 头像
	avatar?: string
	// 角色
	roles: Array<{
		id: number
		name: string
	}>
	// 注册时间
	registerTime: string
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
