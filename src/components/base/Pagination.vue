<script lang="ts" setup>
type Position = 'left' | 'center' | 'right'

interface IProps {
	total: number
	pageNumber?: number
	pageSize?: number
	pageSizes?: number[]
	layout?: string
	background?: boolean
	position?: Position
}

const props = withDefaults(defineProps<IProps>(), {
	pageNumber: 1,
	pageSize: 10,
	pageSizes: () => [10, 20, 30, 50, 100],
	layout: 'total, sizes, prev, pager, next, jumper',
	background: true,
	position: 'right',
})

const emits = defineEmits(['update:pageNumber', 'update:pageSize', 'pagination'])

const currentPage = computed({
	get() {
		return props.pageNumber
	},
	set(val: number) {
		emits('update:pageNumber', val)
		emits('pagination', val)
	},
})

const pageSizeNum = computed({
	get() {
		return props.pageSize
	},
	set(val: number) {
		emits('update:pageSize', val)
		emits('pagination', val)
	},
})
</script>

<template>
	<div class="pagination" :class="`pagination--${position}`">
		<el-pagination
			:total="total"
			v-model:currentPage="currentPage"
			v-model:pageSize="pageSizeNum"
			:page-sizes="pageSizes"
			:layout="layout"
			:background="background"
		>
		</el-pagination>
	</div>
</template>

<style lang="less" scoped>
.pagination {
	display: flex;
	margin-top: 30px;
	padding: 10px;

	&--left {
		justify-content: start;
	}

	&--center {
		justify-content: center;
	}

	&--right {
		justify-content: end;
	}
}
</style>

<style lang="less">
.pagination {
	.el-pagination {
		.el-pager {
			.number {
				font-weight: normal !important;
				color: @info-primary;
			}
		}

		.el-pager li,
		.btn-next,
		.btn-prev {
			width: 24px;
			height: 24px;
			min-width: 24px;
		}
	}
}
</style>
