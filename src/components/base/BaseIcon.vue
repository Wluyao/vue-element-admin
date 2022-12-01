<script lang="ts" setup>
import { computed } from 'vue'
import type { CSSProperties } from 'vue'

interface IProps {
	// 图标大小
	size?: string | number
	//  图标颜色
	color?: string
	// 是否旋转
	spin?: boolean
	// 线条的粗细
	strokeWidth?: string | number
	// 描边颜色
	stroke?: string
	// 填充色
	fill?: string
	// 旋转角度
	rotate?: number
}

const props = withDefaults(defineProps<IProps>(), {
	size: 14,
	strokeWidth: 6,
	stroke: 'none',
})

const iconStyle = computed<CSSProperties>(() => ({
	fontSize: typeof props.size === 'string' ? props.size : `${props.size}px`,
	transform: `rotateZ(${props.rotate}deg)`,
	color: props.color,
	strokeWidth: props.strokeWidth,
	stroke: props.stroke,
	fill: props.fill,
}))
</script>

<template>
	<i class="base-icon" :class="{ spin }" :style="iconStyle">
		<slot></slot>
	</i>
</template>

<style lang="less">
.base-icon {
	display: inline-flex;
	justify-content: center;
	align-items: center;
	height: 1em;
	width: 1em;
	fill: currentColor;

	&.spin {
		animation: spinning 1s cubic-bezier(0, 0, 1, 1) infinite;
	}

	svg {
		height: 1em;
		width: 1em;
	}
}

@keyframes spinning {
	0% {
		transform: rotateZ(0deg);
	}
	100% {
		transform: rotateZ(360deg);
	}
}
</style>
