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

//  账户状态
export const enumAccountStatus = enumMng([
	{
		id: '0',
		name: '停用',
		color: error,
	},
	{
		id: '1',
		name: '启用',
		color: success,
	},
])
