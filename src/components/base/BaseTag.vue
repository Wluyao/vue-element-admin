<script lang="ts" setup>
interface IProps {
	type?: Status
	// 指定颜色
	color?: string
}

withDefaults(defineProps<IProps>(), {
	type: 'info',
})
</script>

<template>
	<div :class="['base-tag', `base-tag-${type}`]">
		<slot></slot>
	</div>
</template>

<style lang="less" scoped>
.base-tag {
	display: inline-block;
	border-radius: 4px;
	padding: 0px 6px;
	color: #fff;
	font-size: 12px;

	&-primary {
		background-color: @primary;
	}
	&-success {
		background-color: @success;
	}
	&-warning {
		background-color: @warning;
	}
	&-danger {
		background-color: @danger;
	}
	&-info {
		background-color: @info9;
	}
}
</style>
