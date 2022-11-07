<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { IStatistics } from '@/model/home'

const statistics = ref<Partial<IStatistics>>({})

onMounted(() => {
	getStatistics()
})

const getStatistics = async () => {
	const data = await window.$apis.home.getStatistics()
	statistics.value = data
}
</script>

<template>
	<el-row :gutter="30">
		<el-col :lg="6" :sm="12">
			<div class="dashboard-statistic grid-red" @click="$emit('changeType', 'visit')">
				<div class="grid-left">
					<BaseIcon name="view" icon-class="grid-icon" :size="48" />
				</div>
				<div class="grid-right">
					<p class="grid-name">访问量</p>
					<CountTo class="grid-number" :end-value="statistics.visit" />
				</div>
			</div>
		</el-col>

		<el-col :lg="6" :sm="12">
			<div class="dashboard-statistic grid-blue" @click="$emit('changeType', 'user')">
				<div class="grid-left">
					<BaseIcon name="user-fill" icon-class="grid-icon" :size="48" />
				</div>
				<div class="grid-right">
					<p class="grid-name">用户数量</p>
					<CountTo class="grid-number" :end-value="statistics.user" />
				</div>
			</div>
		</el-col>

		<el-col :lg="6" :sm="12">
			<div class="dashboard-statistic grid-green" @click="$emit('changeType', 'goods')">
				<div class="grid-left">
					<BaseIcon name="goods" icon-class="grid-icon" :size="48" />
				</div>
				<div class="grid-right">
					<p class="grid-name">商品数量</p>
					<CountTo class="grid-number" :end-value="statistics.goods" />
				</div>
			</div>
		</el-col>

		<el-col :lg="6" :sm="12">
			<div class="dashboard-statistic grid-yellow" @click="$emit('changeType', 'comment')">
				<div class="grid-left">
					<BaseIcon name="message" icon-class="grid-icon" :size="48" />
				</div>
				<div class="grid-right">
					<p class="grid-name">评论数量</p>
					<CountTo class="grid-number" :end-value="statistics.comment" />
				</div>
			</div>
		</el-col>
	</el-row>
</template>

<style lang="less" scoped>
.dashboard-statistic {
	display: flex;
	position: relative;
	height: 108px;
	color: #fff;
	box-shadow: 0px 0px 10px rgba(100, 100, 100, 0.5);
	cursor: pointer;
	margin-bottom: 20px;

	&::before {
		content: '';
		position: absolute;
		top: 0px;
		height: 100%;
		width: 100px;
		background-color: rgba(0, 0, 0, 0.05);
		-webkit-transition: all 0.95s;
		transition: width 0.5s;
	}

	&:hover::before {
		width: 100%;
		box-sizing: border-box;
	}

	.grid-left {
		width: 100px;
		line-height: 108px;
		vertical-align: top;
		text-align: center;

		.grid-icon {
			vertical-align: middle;
		}
	}

	.grid-right {
		padding: 16px;

		p {
			color: #fff !important;
		}

		.grid-name {
			font-size: 20px;
			margin-bottom: 10px;
			white-space: nowrap;
		}

		.grid-number {
			font-size: 30px;
		}
	}
}

.grid {
	&-green {
		background-color: #06d6a0;
	}

	&-yellow {
		background-color: #ffd166;
	}

	&-blue {
		background-color: #06aed5;
	}

	&-red {
		background-color: #ef476f;
	}
}
</style>
