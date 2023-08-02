import Mock from 'mockjs'
import { getURLParams } from '@/utils/core'
import util from '../util'

const articleData = Mock.mock({
	'list|213': [
		{
			id: '@lower(@guid)',
			name: '@ctitle',
			author: '@cname',
			createDate: '@datetime("yyyy-MM-dd HH:mm:ss")',
			type: '@pick(["1", "2", "3", "4", "5"])',
			browseNum: '@natural(1000,9999)',
			imageURL: 'https://source.unsplash.com/random/200x200',
			brief: '@cparagraph(1,3)',
			content: '@cparagraph',
			accessory: [
				{
					id: '1',
					name: '图片图片.jpg',
					url: 'https://s2.ax1x.com/2019/08/02/edRc1P.jpg',
				},
				{
					id: '2',
					name: '营业执照副本.pdf',
					url: 'http://www.xdocin.com/xdoc?_key=fedii4dtyfhmvgryqyntfjavte&_func=down&_dir=document.pdf',
				},
				{
					id: '3',
					name: '数据采集表',
					url: 'http://www.xdocin.com/xdoc?_key=fedii4dtyfhmvgryqyntfjavte&_func=down&_dir=data.xlsx',
				},
			],
		},
	],
})

const table = articleData.list

const getList = (config) => {
	const { type = '', author = '', pageNumber = 1, pageSize = table.length, name = '' } = getURLParams(config.url)
	const types = type.split(',')
	const typesLength = types.length
	const result = table.filter((item) => {
		let validAuthor = false
		let validType = false
		let validName = false

		if (typesLength === 0) {
			validType = true
		} else {
			validType = types.some((item1) => {
				return item.type.includes(item1)
			})
		}
		validName = item.name.includes(name)
		validAuthor = item.author.includes(author)
		return validAuthor && validName && validType
	})
	const startNumber = (Number(pageNumber) - 1) * Number(pageSize)
	const endNumber = startNumber + Number(pageSize)
	return {
		code: 200,
		data: {
			list: util.pickFromTable(result.slice(startNumber, endNumber), [
				'id',
				'name',
				'author',
				'createDate',
				'type',
				'browseNum',
			]),
			total: result.length,
		},
	}
}

const getDetail = (config) => {
	const { id } = getURLParams(config.url)
	// 刷新编辑页面时会重新Mock数据，根据之前的id找不到对应的文章
	const detail = util.find(table, id) || table[0]
	return {
		code: 200,
		data: detail,
	}
}

const update = (config) => {
	const { detail } = window.JSON.parse(config.body)
	if (!detail.id) {
		const initRow = {
			createDate: Date.now(),
			browseNum: 0,
			author: '本人',
		}
		Object.assign(detail, initRow)
	}
	util.update(table, detail)
	return {
		code: 200,
		data: {},
	}
}

const remove = (config) => {
	const { id } = window.JSON.parse(config.body)
	util.remove(table, id)
	return {
		code: 200,
		data: {},
	}
}

Mock.mock(/\/article\/list/, 'post', getList)
Mock.mock(/\/article\/detail/, 'post', getDetail)
Mock.mock(/\/article\/update/, 'post', update)
Mock.mock(/\/article\/remove/, 'post', remove)
