import Mock from 'mockjs'

const getChartData = () => {
	const dataSource = Mock.mock({
		'data|50': [
			{
				value: '@natural(0,200)',
			},
		],
	})

	const currentDate = Date.now()
	const ONE_DAY = 24 * 60 * 60 * 1000
	const getDate = (date) => `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`

	const week = dataSource.data.slice(-7).map((item, index) => {
		const date = new Date(currentDate - (7 - index) * ONE_DAY)
		return {
			date: getDate(date),
			value: item.value,
		}
	})
	const month = dataSource.data.slice(-30).map((item, index) => {
		const date = new Date(currentDate - (30 - index) * ONE_DAY)
		return {
			date: getDate(date),
			value: item.value,
		}
	})

	return {
		week,
		month,
	}
}

const getStatistics = () => {
	return {
		code: 200,
		data: Mock.mock({
			visit: '@natural(15000,30000)',
			user: '@natural(2500,5000)',
			goods: '@natural(500,1200)',
			comment: '@natural(1600,3000)',
		}),
	}
}

const getTrendData = () => {
	return {
		code: 200,
		data: getChartData(),
	}
}

const getTaskList = () => {
	return Mock.mock({
		code: 200,
		'data|10': [
			{
				id: '@natural',
				status: '@boolean(3,7,true)',
				'content|1-5': '待办事项 ',
			},
		],
	})
}

const addTask = () => {
	return {
		code: 200,
	}
}

const editTask = () => {
	return {
		code: 200,
	}
}

const deleteTask = () => {
	return {
		code: 200,
	}
}

const finishTask = () => {
	return {
		code: 200,
	}
}

const getGoodsList = () => {
	return Mock.mock({
		code: 200,
		'data|10': [
			{
				id: '@natural',
				name: '@string',
				address: '@city',
				price: '@natural(10,50)',
			},
		],
	})
}

Mock.mock(/\/home\/statistics/, 'post', getStatistics)
Mock.mock(/\/home\/chart\/visit/, 'post', getTrendData)
Mock.mock(/\/home\/chart\/user/, 'post', getTrendData)
Mock.mock(/\/home\/chart\/goods/, 'post', getTrendData)
Mock.mock(/\/home\/chart\/comment/, 'post', getTrendData)
Mock.mock(/\/home\/task\/list/, 'post', getTaskList)
Mock.mock(/\/home\/task\/add/, 'post', addTask)
Mock.mock(/\/home\/task\/edit/, 'post', editTask)
Mock.mock(/\/home\/task\/delete/, 'post', deleteTask)
Mock.mock(/\/home\/task\/finish/, 'post', finishTask)
Mock.mock(/\/home\/goods\/list/, 'post', getGoodsList)
