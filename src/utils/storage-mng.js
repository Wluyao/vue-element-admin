// 项目中所有存储在localStorage中的数据
const localKeyName = [
	// 主题色
	'theme',
	//  是否折叠侧边菜单
	'sideCollapse',
	// 是否显示顶部页面tag标签
	'tagVisible',
	// 系统风格 round,square
	'style',
	// 组件大小
	'size',
]

// 项目中所有存储在sessionStorage中的数据
const sessionKeyName = []

class StorageMng {
	// key名称前缀
	prefix = ''
	// 使用localStorage还是sessionStorage
	mode = localStorage

	constructor(mode, prefix = '') {
		this.prefix = prefix
		this.mode = mode
	}

	setItem(keyName, value) {
		try {
			this.mode.setItem(`${this.prefix}${keyName}`, JSON.stringify(value))
		} catch (err) {
			this.mode.setItem(`${this.prefix}${keyName}`, value)
		}
	}

	getItem(keyName) {
		const result = this.mode.getItem(`${this.prefix}${keyName}`)
		try {
			return JSON.parse(result)
		} catch (err) {
			console.warn(`Storage ${keyName} get error`, err)
			return result
		}
	}

	removeItem(keyName) {
		this.mode.removeItem(`${this.prefix}${keyName}`)
	}

	clear() {
		this.mode.clear()
	}

	getKey(index) {
		return this.getKeys()[index]
	}

	// 获取所有数据的名称
	getKeys() {
		const keys = []
		Array.from({ length: this.mode.length }).forEach((item, index) => {
			const keyName = this.mode.key(index)
			if (keyName.startsWith(this.prefix)) {
				keys.push(keyName.slice(this.prefix.length))
			}
		})
		return keys
	}

	// 获取所有数据
	getAll() {
		return Object.fromEntries(this.getKeys().map(keyName => [keyName, this.getItem(keyName)]))
	}
}

const localMng = new StorageMng(localStorage)
const sessionMng = new StorageMng(sessionStorage)

export { StorageMng, localMng, sessionMng }
