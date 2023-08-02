<script lang="ts" setup>
/**
 * 内容溢出省略。
 * 在弹性布局中，可以尝试为父元素或者父元素的父元素设置overflow:hidden
 */

import { ref } from 'vue'

const emits = defineEmits(['checkOverflow'])

interface IProps {
	title?: string
	// 是否需要显示tootip
	showTooltip?: boolean
	// 是否需要溢出省略
	ellipsis?: boolean
	// 是否立即检测溢出
	immidiate?: boolean
	// 超过多少行之后省略
	rows?: number
	//  tooltip内容的最大宽度
	contentWidth?: number
}

const props = withDefaults(defineProps<IProps>(), {
	showTooltip: true,
	ellipsis: true,
	immidiate: false,
	rows: 1,
	contentWidth: 300,
})

const isOverFlow = ref(false)
const wrapRef = ref()
const measureRef = ref()

const styleClamp = computed(() => ({
	'-webkit-line-clamp': props.rows,
}))

watch(
	() => props.rows,
	() => {
		checkOverflow()
	}
)

onMounted(async () => {
	if (props.immidiate) {
		checkOverflow()
	}
})

const checkOverflow = () => {
	if (!wrapRef.value) return
	// 允许1px的偏差
	isOverFlow.value = measureRef.value.clientWidth - wrapRef.value.clientWidth * props.rows > 1
	emits('checkOverflow', isOverFlow.value)
}
</script>

<template>
	<div ref="wrapRef" class="relative overflow-hidden break-all" @mouseenter="checkOverflow">
		<div ref="measureRef" class="measure"><slot></slot></div>

		<el-tooltip v-if="showTooltip && isOverFlow" :hide-after="0">
			<template #content>
				<div :style="{ 'max-width': `${contentWidth}px` }">
					<template v-if="title">{{ title }}</template>
					<slot v-else></slot>
				</div>
			</template>

			<div :class="{ ellipsis: ellipsis }" :style="styleClamp"><slot></slot></div>
		</el-tooltip>
		<div v-else :class="{ ellipsis: ellipsis }" :style="styleClamp"><slot></slot></div>
	</div>
</template>

<style scoped>
.measure {
	position: fixed;
	top: -9999px;
	left: -9999px;
	white-space: nowrap;
}

.ellipsis {
	overflow: hidden;
	word-break: break-all;
	display: -webkit-box;
	-webkit-box-orient: vertical;
}
</style>
