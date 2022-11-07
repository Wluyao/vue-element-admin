/**
 * 本地存储的读取往往分散在各个不同的地方，会显得很乱。
 * 使用本地存储的时候推荐统一采用该，同时在这里记录每个key和它的作用。
 */

import { tupleStr } from '@/utils/type'

import { TokenName } from '@/config/const'

// 项目中所有存储在localStorage中的数据
const localKeys = tupleStr(
	// token
	TokenName,
	// 是否折叠侧边菜单
	'sideCollapse',
	// 主题色
	'theme'
)

// 项目中所有存在sessionStorage中的数据的名称
const sessionKeys = tupleStr()

type localKeyName = typeof localKeys[number]
type sessionKeyName = typeof sessionKeys[number]
type keyName = localKeyName | sessionKeyName

class StorageMng {
	// key名称前缀
	private prefix: string
	// 使用localStorage还是sessionStorage
	private mode: Storage

	constructor(mode: Storage, prefix: string = '') {
		this.prefix = prefix
		this.mode = mode
	}

	public setItem(key: keyName, value: any) {
		try {
			this.mode.setItem(`${this.prefix}${key}`, window.JSON.stringify(value))
		} catch (err) {
			console.warn(`Storage ${key} set error`, err)
		}
	}

	public getItem(key: keyName) {
		const result = this.mode.getItem(`${this.prefix}${key}`)
		try {
			return result ? window.JSON.parse(result) : result
		} catch (err) {
			console.warn(`Storage ${key} get error`, err)
		}
	}

	public removeItem(key: keyName) {
		this.mode.removeItem(`${this.prefix}${key}`)
	}

	public clear() {
		this.mode.clear()
	}

	public getKey(index: number) {
		return this.getKeys()[index]
	}

	// 获取所有数据的名称
	public getKeys() {
		const keys: keyName[] = []
		Array.from({ length: this.mode.length }).forEach((item, index) => {
			const key = this.mode.key(index)
			if (key?.startsWith(this.prefix)) {
				keys.push(key.slice(this.prefix.length) as keyName)
			}
		})
		return keys
	}

	// 获取所有数据
	public getAll() {
		return Object.fromEntries(this.getKeys().map((key) => [key, this.getItem(key)]))
	}
}

const localMng = new StorageMng(localStorage)
const sessionMng = new StorageMng(sessionStorage)

export { StorageMng, localMng, sessionMng }
