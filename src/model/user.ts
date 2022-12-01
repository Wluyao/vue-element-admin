export interface IUser {
	id: number
	name: string
	username: string
	mobile: string
	email: string
	avatar: string
	gender: '1' | '2'
	age: number
	role: number
	roleName: string
	//  状态 0：停用 1：启用
	status: '0' | '1'
	createTime: string
	remark: string
}
