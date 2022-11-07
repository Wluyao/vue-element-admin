<script lang="ts" setup>
import { ref } from 'vue'
import type { CSSProperties } from 'vue'

interface IProps {
	customClass?: string
	customStyle?: CSSProperties
	// 按钮类型
	type?: 'ordinary' | 'primary' | 'danger' | 'info'
	// 按钮大小
	size?: 'mini' | 'small' | 'medium' | 'large'
	// 按钮形状
	shape?: 'square' | 'round' | 'circle'
	// 是否为朴素按钮
	plain?: boolean
	// 禁用
	disabled?: boolean
	// 加载状态
	loading?: boolean
	// 是否为块级按钮
	block?: boolean
}

const props = withDefaults(defineProps<IProps>(), {
	type: 'ordinary',
	size: 'small',
	shape: 'square',
})

const emit = defineEmits(['click'])

const rootClass = ref('base-button')

const handleClick = (e: MouseEvent) => {
	if (!props.disabled && !props.loading) {
		emit('click', e)
	}
}
</script>

<template>
	<div
		:class="[
			rootClass,
			`${rootClass}-${type}`,
			`${rootClass}-${shape}`,
			`${rootClass}-${size}`,
			{
				[`${rootClass}-plain`]: plain,
				[`${rootClass}-block`]: block,
				[`${rootClass}-disabled`]: disabled || loading,
			},
			customClass,
		]"
		:style="customStyle"
		@click="handleClick"
	>
		<i v-if="loading" class="el-icon-loading" :class="`${rootClass}-icon`"></i>
		<slot></slot>
	</div>
</template>

<style lang="less" scoped>
.base-button {
	display: inline-block;
	padding: 0 10px;
	line-height: 1;
	text-align: center;
	white-space: nowrap;
	user-select: none;
	cursor: pointer;

	&-ordinary {
		color: @black3;
		background-color: #fff;
		border: 1px solid #eee;
	}

	&-primary {
		color: #fff;
		background-image: linear-gradient(to bottom, #14cc9b, @theme);
		box-shadow: 0 10px 10px -10px rgba(0, 150, 136, 0.5);

		&:active:not(.base-button-disabled) {
			background-image: linear-gradient(to bottom, @theme, @theme);
			box-shadow: none;
		}

		&.base-button-plain {
			border: 1px solid @theme;
			color: @theme;
			background-image: none !important;
			box-shadow: none !important;
		}
	}

	&-danger {
		color: #fff;
		background-image: linear-gradient(to bottom, #ff7149, #f23138);
		box-shadow: 0 10px 10px -10px rgba(229, 28, 35, 0.5);

		&:active:not(.base-button-disabled) {
			background-image: linear-gradient(to bottom, #f23138, #f23138);
			box-shadow: none;
		}

		&.base-button-plain {
			border: 1px solid @red;
			color: @red;
			background-image: none !important;
			box-shadow: none !important;
		}
	}

	&-info {
		color: #fff;
		background-color: #ddd;
	}

	&-large {
		height: 50px;
		padding: 16px 10px;
		font-size: 16px;
		font-weight: bold;

		&.base-button-circle {
			min-width: 50px;
		}
	}

	&-medium {
		height: 40px;
		padding: 11px 10px;
		font-size: 16px;
		font-weight: bold;

		&.base-button-circle {
			min-width: 40px;
		}
	}

	&-small {
		height: 36px;
		padding: 10px 10px;

		&.base-button-circle {
			min-width: 36px;
		}
	}

	&-mini {
		height: 32px;
		padding: 8px 10px;

		&.base-button-circle {
			min-width: 32px;
		}
	}

	&-square {
		border-radius: 12px;
	}

	&-round {
		border-radius: 20px;
	}

	&-circle {
		padding-left: 0;
		padding-right: 0;
		border-radius: 50%;
	}

	&-block {
		display: block;
	}

	&-disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}

	&-icon {
		font-size: 18px;
		margin-right: 4px;
	}
}
</style>
