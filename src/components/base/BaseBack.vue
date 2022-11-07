<script lang="ts" setup>
import { useRouter } from 'vue-router'

interface IProps {
	title?: string
	back?: () => void
}

const props = defineProps<IProps>()

const router = useRouter()

// 返回
const handleBack = () => {
	if (props.back) {
		props.back()
	} else {
		router.back()
	}
}
</script>

<template>
	<div class="back">
		<div class="back-icon" @click="handleBack">
			<BaseIcon :size="16" :rotate="180"><IconCustomRight /></BaseIcon>
		</div>
		<span class="title text-lg">{{ title }}<slot></slot></span>
	</div>
</template>

<style lang="less" scoped>
.back {
	display: flex;
	align-items: center;
}

.back-icon {
	width: 24px;
	height: 24px;
	background: #d8ecff;
	border-radius: 50%;
	margin-right: 10px;
	color: @theme;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
}

.title {
	font-weight: bold;
	font-size: 18px;
	color: @black3;
}
</style>
