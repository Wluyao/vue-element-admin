<template>
	<svg class="base-icon" :class="iconClass" :style="iconStyle" aria-hidden="true">
		<use :xlink:href="iconName"></use>
	</svg>
</template>

<script>
/**
 * svg图标
 */
export default {
	props: {
		name: {
			required: true,
			type: String,
		},
		iconClass: {
			type: String,
			default: '',
		},
		size: {
			type: [String, Number],
			default: 18,
		},
		color: {
			type: String,
		},
	},
	computed: {
		iconName() {
			return '#icon-' + this.name
		},
		iconStyle() {
			return {
				fontSize: typeof this.size === 'string' ? this.size : `${this.size}px`,
				color: this.color,
			}
		},
	},
}
</script>

<style scoped>
.base-icon {
	width: 1em;
	height: 1em;
	vertical-align: -0.15em;
	fill: currentColor;
	overflow: hidden;
}
</style>
