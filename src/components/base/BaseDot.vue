<script lang="ts" setup>
interface IProps {
	type?: Status
	// 指定颜色
	color?: string
	// dot的大小，单位为px
	size?: number
	// dot是否为空心
	hollow?: boolean
}

withDefaults(defineProps<IProps>(), {
	type: 'info',
	hollow: false,
})
</script>

<template>
	<div class="base-dot">
		<div
			:class="['circle', `circle-${type}`]"
			:style="{
				'background-color': hollow ? '#fff' : color,
				'border-color': color,
				width: size + 'px',
				height: size + 'px',
			}"
		></div>
		<div :style="{ color }">
			<slot></slot>
		</div>
	</div>
</template>

<style lang="less" scoped>
.base-dot {
	display: flex;
	align-items: center;

	.circle {
		flex: none;
		width: 8px;
		height: 8px;
		margin-right: 8px;
		border-radius: 50%;
		border: 1px solid transparent;

		&-primary {
			background-color: @primary;
			border-color: @primary;
			color: @primary;
		}
		&-success {
			background-color: @success;
			border-color: @success;
			color: @success;
		}
		&-info {
			background-color: @info9;
			border-color: @info9;
			color: @info9;
		}
		&-warning {
			background-color: @warning;
			border-color: @warning;
			color: @warning;
		}
		&-danger {
			background-color: @danger;
			border-color: @danger;
			color: @danger;
		}
	}
}
</style>
