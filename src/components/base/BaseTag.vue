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
		background-color: @theme;
	}
	&-success {
		background-color: @green;
	}
	&-info {
		background-color: @black9;
	}
	&-warning {
		background-color: @orange;
	}
	&-danger {
		background-color: @red;
	}
}
</style>
