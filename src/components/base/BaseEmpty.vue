<script lang="ts" setup>
interface IProps {
	visible?: boolean
	iconSize?: number
	message?: string
}

withDefaults(defineProps<IProps>(), {
	visible: true,
	iconSize: 150,
	message: '暂无数据',
})
</script>

<template>
	<div v-if="visible" class="base-empty">
		<BaseIcon :size="iconSize"> <IconCustomEmpty /> </BaseIcon>

		<div class="message">
			{{ message }}
			<slot></slot>
		</div>
	</div>
</template>

<style lang="less" scoped>
.base-empty {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 20px;
	height: 100%;
}

.message {
	line-height: normal;
	padding: 10px;
	color: @info9;
}
</style>
