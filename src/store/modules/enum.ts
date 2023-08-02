/**
 * 管理需要通过独立的接口获取的枚举
 */
import { defineStore } from 'pinia'
import apis from '@/apis'
import { enumMng, EnumResult } from '@/utils/core'

interface IItem {
	id: number
	name: string
}

interface IState {
	enumUser: EnumResult<IItem>
	enumRole: EnumResult<IItem>
}
export const useEnumStore = defineStore('enum', {
	state: (): IState => ({
		enumUser: {} as EnumResult<IItem>,
		enumRole: {} as EnumResult<IItem>,
	}),
	actions: {
		initEnum() {
			this.getUserList()
			this.getRoleList()
		},
		// 获取用户列表
		async getUserList() {
			const data = await apis.user.getAllUserList()
			const userList = data.map((item) => ({
				id: item.id,
				name: item.name,
			}))
			this.enumUser = enumMng(userList)
		},
		//  获取角色列表
		async getRoleList() {
			const data = await apis.role.getAllRoleList()
			const roleList = data.map((item) => ({
				id: item.id,
				name: item.name,
			}))
			this.enumRole = enumMng(roleList)
		},
	},
})
