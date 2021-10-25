// 项目中所有存储在localStorage中的数据的名称
const localKeyName = [
	// 还款方式。 free:自由还，day：按天还，month：按月还
	'repay_mode',
]

// 项目中所有存储在localStorage中的数据的名称
const sessionKeyName = [
	// 还款方式。 free:自由还，day：按天还，month：按月还
	'repay_mode',
]

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
			console.warn(`Storage ${keyName} set error`, err)
		}
	}

	getItem(keyName) {
		const result = this.mode.getItem(`${this.prefix}${keyName}`)
		try {
			return result ? JSON.parse(result) : result
		} catch (err) {
			console.warn(`Storage ${keyName} get error`, err)
			// 如果parse错误，代表这个存储错误，认为就是没有这个存储，保持和没存储的表现一致，返回 null
			return null
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
			if (keyName?.startsWith(this.prefix)) {
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
