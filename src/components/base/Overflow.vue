<script lang="ts" setup>
	/**
	 * 单行溢出省略。
	 * 在弹性布局中，可以尝试为父元素或者父元素的父元素设置overflow:hidden
	 */
	
	import { ref } from 'vue'
	
	defineProps({
		title: String,
		showTooltip: {
			type: Boolean,
			default: true,
		},
	})
	
	const isOverFlow = ref(false)
	
	const checkOverflow = (event: any) => {
		const wrap = event.target
		const range = document.createRange()
		range.setStart(wrap, 0)
		range.setEnd(wrap, wrap.childNodes.length)
		const rangeWidth = range.getBoundingClientRect().width
		//  允许3px的偏差
		isOverFlow.value = rangeWidth - wrap.clientWidth > 3
	}
	</script>
	
	<template>
		<div class="overflow" @mouseenter="checkOverflow">
			<el-tooltip v-if="isOverFlow && showTooltip">
				<template #content>
					<template v-if="title">{{ title }}</template>
					<slot v-else></slot>
				</template>
	
				<div class="content">
					<slot></slot>
				</div>
			</el-tooltip>
	
			<div v-else class="content">
				<slot></slot>
			</div>
		</div>
	</template>
	
	<style scoped>
	.overflow {
		overflow: hidden;
	}
	
	.content {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	</style>
	