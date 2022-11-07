<script lang="ts" setup>
import { ref, onMounted, computed, watch } from 'vue'
import { Chart } from '@antv/g2'
import apis from '@/apis'

const TYPE_NAME_MAP = {
	visit: '访问量',
	user: '用户数量',
	goods: '商品数量',
	comment: '评论数量',
}

interface IChartItem {
	date: string
	value: number
}

interface IChartTrend {
	week: IChartItem[]
	month: IChartItem[]
}

interface IChartData {
	visit: IChartTrend
	user: IChartTrend
	goods: IChartTrend
	comment: IChartTrend
}

interface IProps {
	statisticType: 'visit' | 'user' | 'goods' | 'comment'
}

const prop = withDefaults(defineProps<IProps>(), {
	statisticType: 'visit',
})

const initLoading = ref(true)
const weekChart = ref<Chart>()
const monthChart = ref<Chart>()
const chartData = ref<IChartData>({
	visit: {
		week: [],
		month: [],
	},
	user: {
		week: [],
		month: [],
	},
	goods: {
		week: [],
		month: [],
	},
	comment: {
		week: [],
		month: [],
	},
})

const chartName = computed(() => TYPE_NAME_MAP[prop.statisticType])

watch(
	() => prop.statisticType,
	(value) => {
		weekChart.value?.changeData(chartData.value[value].week)
		monthChart.value?.changeData(chartData.value[value].month)
	}
)

onMounted(() => {
	Promise.all([getVisitTrend(), getUserTrend(), getGoodsTrend(), getCommentTrend()]).then(() => {
		initLoading.value = false
		weekChart.value = createChart('weekChart', chartData.value.visit.week)
		monthChart.value = createChart('monthChart', chartData.value.visit.month)
	})
})

const getVisitTrend = async () => {
	const data = await apis.home.getVisitTrend()
	chartData.value.visit = data
}

const getUserTrend = async () => {
	const data = await apis.home.getUserTrend()
	chartData.value.user = data
}

const getGoodsTrend = async () => {
	const data = await apis.home.getGoodsTrend()
	chartData.value.goods = data
}

const getCommentTrend = async () => {
	const data = await apis.home.getCommentTrend()
	chartData.value.comment = data
}

// 创建图表
const createChart = (container: string, data: IChartItem[]) => {
	const chart = new Chart({
		container,
		autoFit: true,
		height: 300,
		padding: [30, 60, 50, 50],
	})
	chart.data(data)
	chart.scale({
		value: { alias: '数量', min: 0 },
	})
	chart.line().position('date*value')
	chart.point().position('date*value').size(4).shape('circle').style({
		stroke: '#fff',
		lineWidth: 1,
	})
	chart.render()
	return chart
}
</script>

<template>
	<el-row class="line-chart" :gutter="30">
		<el-col :lg="12" :sm="24">
			<div class="title">周{{ chartName }}增长趋势图</div>
			<div v-loading="initLoading" id="weekChart"></div>
		</el-col>

		<el-col :lg="12" :sm="24">
			<div class="title">月{{ chartName }}增长趋势图</div>
			<div v-loading="initLoading" id="monthChart"></div>
		</el-col>
	</el-row>
</template>

<style lang="less" scoped>
.line-chart {
	margin-bottom: 20px;

	.title {
		font-size: 16px;
		text-align: center;
		margin-bottom: 10px;
	}

	#weekChart,
	#monthChart {
		height: 300px;
		background-color: #fff;
	}
}
</style>
