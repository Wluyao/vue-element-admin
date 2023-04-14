<script lang="ts" setup>
import { useTransition, TransitionPresets } from '@vueuse/core'

const props = defineProps({
	startValue: { type: Number, default: 0 },
	endValue: { type: Number, default: 0 },
	duration: { type: Number, default: 1500 },
	autoplay: { type: Boolean, default: true },
	decimals: {
		type: Number,
		default: 2,
		validator(value: number) {
			return value >= 0
		},
	},
	prefix: { type: String, default: '' },
	suffix: { type: String, default: '' },
	separator: { type: String, default: ',' },
	decimal: { type: String, default: '.' },
	useEasing: { type: Boolean, default: true },
	transition: { type: String, default: 'linear' },
})

const emit = defineEmits(['started', 'finished'])

const source = ref(props.startValue)

let outputValue = useTransition(source)

const displayValue = computed(() => formatNumber(outputValue.value))

watchEffect(() => {
	source.value = props.startValue
})

watch([() => props.startValue, () => props.endValue], () => {
	if (props.autoplay) {
		start()
	}
})

onMounted(() => {
	props.autoplay && start()
})

const start = () => {
	run()
	source.value = props.endValue
}

const run = () => {
	outputValue = useTransition(source, {
		disabled: false,
		duration: props.duration,
		onStarted: () => emit('started'),
		onFinished: () => emit('finished'),
		...(props.useEasing ? { transition: TransitionPresets[props.transition] } : {}),
	})
}

const formatNumber = (value: number | string) => {
	if (!value) {
		return '0'
	}
	const { decimals, decimal, separator, suffix, prefix } = props

	let num = value
	num = Number(num).toFixed(decimals)
	num += ''

	const x = num.split('.')
	let x1 = x[0]
	const x2 = x.length > 1 ? decimal + x[1] : ''

	const reg = /(\d+)(\d{3})/
	if (separator) {
		while (reg.test(x1)) {
			x1 = x1.replace(reg, '$1' + separator + '$2')
		}
	}
	return prefix + x1 + x2 + suffix
}
</script>

<template>
	<span>{{ displayValue }} </span>
</template>
