/* 基础数据表管理 */

class TableMng {
	baseTable = {}

	constructor(data) {
		this.baseTable = data
	}

	// 添加数据
	addTable(data) {
		const baseTable = {
			...this.baseTable,
			...data,
		}
		this.baseTable = baseTable
	}

	/**
	 * 获取某个表
	 * @param {String} tableName 表名
	 */
	getTable(tableName) {
		const table = this.baseTable[tableName]
		if (table) {
			return table
		} else {
			throw new Error(`表“${tableName}”不存在`)
		}
	}

	/**
	 * 获取某个表的所有项的id
	 * @param {String} tableName 表名
	 */
	getIds(tableName) {
		const table = this.getTable(tableName)
		return table.map(item => item.id)
	}

	/**
	 * 获取某个表的所有项的name
	 * @param {String} tableName 表名
	 */
	getNames(tableName) {
		const table = this.getTable(tableName)
		return table.map(item => item.name)
	}

	/**
	 * 获取某个表中某一项的名称
	 * @param {String} tableName 表名
	 * @param {String} id  ID
	 *
	 */
	getNameById(tableName, id) {
		const table = this.getTable(tableName)
		const result = table.find(item => item.id === id)
		return result ? result.name : ''
	}

	getNamesByIds(tableName, ids) {
		const table = this.getTable(tableName)
		const names = []
		ids.forEach(id => {
			const row = table.find(item => item.id === id)
			row && names.push(row.name)
		})
		return names.join(',')
	}

	// 格式化为前端需要的数据结构
	formatTable(tableName, idAlias, nameAlias) {
		const table = this.getTable(tableName)
		return table.map(item => ({
			[idAlias]: item.id,
			[nameAlias]: item.name,
		}))
	}
}

// 性别
const gender = [
	{
		id: '1',
		name: '男',
	},
	{
		id: '2',
		name: '女',
	},
]

// 角色
const role = [
	{
		id: 'admin',
		name: '管理员',
	},
	{
		id: 'guest',
		name: '游客',
	},
	{
		id: 'editor',
		name: '编辑',
	},
]

// 地区
const region = [
	{
		id: '1',
		name: '华南',
	},
	{
		id: '2',
		name: '华北',
	},
	{
		id: '3',
		name: '华东',
	},
	{
		id: '4',
		name: '西南',
	},
	{
		id: '5',
		name: '东北',
	},
	{
		id: '6',
		name: '西北',
	},
]

// 文章类型
const article = [
	{
		id: '1',
		name: '新闻',
	},
	{
		id: '2',
		name: '财经',
	},
	{
		id: '3',
		name: '体育',
	},
	{
		id: '4',
		name: '娱乐',
	},
	{
		id: '5',
		name: '游戏',
	},
]

const tableMng = new TableMng({ gender, role, region, article })

export default tableMng
