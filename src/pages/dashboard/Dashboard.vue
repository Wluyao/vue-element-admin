<template>
	<div>
		<statistics @onChangeType="hanldeChangeType"></statistics>
		<line-chart :statistic-type="statisticType"></line-chart>

		<el-row :gutter="20">
			<el-col :span="8">
				<todo-list></todo-list>
			</el-col>
			<el-col :span="8">
				<progress-bar></progress-bar>
			</el-col>
			<el-col :span="8">
				<new-goods></new-goods>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import Statistics from './components/Statistics'
import LineChart from './components/LineChart'
import TodoList from './components/TodoList'
import ProgressBar from './components/ProgressBar'
import NewGoods from './components/NewGoods'

export default {
	name: 'Dashboard',
	components: {
		Statistics,
		LineChart,
		TodoList,
		ProgressBar,
		NewGoods,
	},
	data() {
		return {
			statisticType: 'visite',
		}
	},
	methods: {
		hanldeChangeType(type) {
			this.statisticType = type
		},
	},
}
</script>
