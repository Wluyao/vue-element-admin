/**
 * 获取url中的查询字符串参数
 * @param {String} url  url字符串
 */
export const getURLParams = (url: string) => {
	const search = url.split('?')[1]
	if (!search) {
		return {}
	}
	return JSON.parse(
		'{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}'
	)
}

/**
 *  延迟执行
 */
export const sleep = (interval: number) => new Promise((resolve) => setTimeout(resolve, interval))

/**
 * 构造枚举字段管理对象
 */
interface EnumModel {
	id: string | number
	name: string | number
	color?: string
	status?: Status
	[key: string]: any
	[key: number]: any
}

export interface EnumResult<T extends EnumModel> {
	ids: Array<T['id']>
	names: Array<T['name']>
	origin: Array<T>
	[key: string]: any
	[key: number]: any
	getColor: (id: string) => string
	getStatus: (id: string) => Status | undefined
	getNamesByIds: (ids: Array<string | number>) => Array<string | number>
	format: (idAlias: string, nameAlias: string) => any[]
	omit: (hides: Array<string | number>) => T[]
}

export const enumMng = <T extends EnumModel>(data: Array<T>): EnumResult<T> => {
	const result: EnumResult<T> = {} as EnumResult<T>
	const ids: Array<string | number> = []
	const names: Array<string | number> = []

	data.forEach((item) => {
		result[item.id] = item.name
		ids.push(item.id)
		names.push(item.name)
	})

	result.ids = ids
	result.names = names
	result.origin = data
	result.getColor = (id) => {
		const row = data.find((item) => item.id === id)
		return row ? row.color! : ''
	}
	result.getStatus = (id: string) => {
		const row = data.find((item) => item.id === id)
		return row ? row.status : undefined
	}
	result.getNamesByIds = (ids) => {
		const names: Array<string | number> = []
		ids.forEach((id) => {
			const row = data.find((item) => item.id === id)
			row && names.push(row.name)
		})
		return names
	}
	result.format = (idAlias, nameAlias) =>
		data.map((item) => ({
			[idAlias]: item.id,
			[nameAlias]: item.name,
		}))
	result.omit = (hides) => data.filter((item) => !hides.includes(item.id))

	return result
}

/**
 * 数值录入
 * @param {String} source       输入的值
 * @param {Number}  decimals   保留几位小数，0表示整数，默认两位小数。
 * @param {Nubmer} min      最小值
 * @param {Nubmer} max      最大值
 */
export const inputNumber = (
	source: string | number,
	decimals: number = 2,
	min: number = Number.NEGATIVE_INFINITY,
	max: number = Number.POSITIVE_INFINITY
): string => {
	if (source == null) return ''
	let value = source.toString()
	value = value.replace(/^(\-)*\D*(\d*(?:\.\d*)?).*$/g, '$1$2')
	//  只能输入正数
	if (min >= 0) {
		value = value.replace('-', '')
	} else if (max < 0) {
		// 只能输入负数
		value = '-' + value
	}
	// 小数处理
	const decimalIndex = value.indexOf('.')
	if (decimals !== undefined && decimalIndex > -1) {
		if (decimals === 0) {
			value = value.slice(0, decimalIndex + decimals)
		} else if (decimals > 0) {
			value = value.slice(0, decimalIndex + decimals + 1)
		}
	}
	const numberValue = Number(value)
	if (typeof numberValue === 'number') {
		if (numberValue < min) {
			value = min.toString()
		} else if (numberValue > max) {
			value = max.toString()
		}
	}
	return value
}

/**
 * 获取树的所有节点的某个属性值
 */
export const getTreeNodeValue = (tree: any, filed: string) =>
	tree
		.map((node: any) => {
			const result: any = []
			node[filed] && result.push(node[filed])
			if (node.children) {
				result.push(...getTreeNodeValue(node.children, filed))
			}
			return result
		})
		.flat()

/**
 * 获取动态图片路径
 */
export const getImageUrl = (url: string) => new URL(`../assets/images/${url}`, import.meta.url).href
