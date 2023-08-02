<script lang="ts" setup>
import Statistics from './components/Statistics.vue'
import LineChart from './components/LineChart.vue'
import TodoList from './components/TodoList.vue'
import ProgressBar from './components/ProgressBar.vue'
import NewGoods from './components/NewGoods.vue'

const statisticType = ref<'visit' | 'user' | 'goods' | 'comment'>('visit')

const hanldeChangeType = (type) => {
	statisticType.value = type
}
</script>

<template>
	<statistics></statistics>
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
</template>
