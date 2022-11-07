export interface IUser {
	id: number
	name: string
	username: string
	phone: string
	email: string
	avatar: string
	gender: '1' | '2'
	age: number
	// 角色
	roles: Array<{
		id: number
		name: string
	}>
	createDate: string
	remark?: string
}
