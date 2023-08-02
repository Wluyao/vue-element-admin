export interface IStatistics {
	visit: number
	user: number
	goods: number
	comment: number
}

export interface ITask {
	id: number
	content: string
	status: boolean
}

export interface IGoods {
	id: number
	name: string
	address: string
	price: number
}
