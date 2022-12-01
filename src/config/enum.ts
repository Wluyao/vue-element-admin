import { enumMng } from '@/utils/core'
import uiConfig from '@/config/ui'

const { success, warning, error, info } = uiConfig.statusColor

// 性别
export const enumGender = enumMng([
	{
		id: '1',
		name: '男',
	},
	{
		id: '2',
		name: '女',
	},
])

//  用户状态
export const enumUserStatus = enumMng([
	{
		id: '0',
		name: '停用',
		status: 'danger',
	},
	{
		id: '1',
		name: '启用',
		status: 'success',
	},
])
