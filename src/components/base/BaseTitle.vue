<script lang="ts" setup>
defineProps(['title'])
</script>

<template>
	<div class="base-title">
		<div class="title-icon"></div>
		<div class="title-text">
			{{ title }}
			<slot></slot>
		</div>
	</div>
</template>

<style lang="less" scoped>
.base-title {
	display: flex;
	align-items: center;
	padding: 10px 0;
}

.title-icon {
	width: 4px;
	height: 18px;
	background: #0084ff;
	border-radius: 2px;
	margin-right: 12px;
}

.title-text {
	font-size: 18px;
	color: #333;
}
</style>
