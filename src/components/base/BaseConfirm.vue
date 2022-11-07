<script lang="ts" setup>
interface IProps {
	type?: Status
	visible?: boolean
	title?: string
	confirmText?: string
	cancelText?: string
	confirmLoading?: boolean
	message?: string
	description?: string
}

withDefaults(defineProps<IProps>(), {
	title: '提示',
	visible: false,
	type: 'primary',
})

const emit = defineEmits(['confirm', 'close'])

const handleConfirm = () => {
	emit('confirm')
}

const handleClose = () => {
	emit('close')
}
</script>

<template>
	<BaseDialog
		:title="title"
		:visible="visible"
		:type="type"
		:confirm-loading="confirmLoading"
		:confirm-text="confirmText"
		:cancel-text="cancelText"
		@confirm="handleConfirm"
		@close="handleClose"
	>
		<div class="flex items-center py-5">
			<BaseIcon :class="`icon-${type}`" :size="40">
				<IconCustomWarning />
			</BaseIcon>
			<div class="ml-2">
				<div class="text-base font-bold">{{ message }}</div>
				<div class="mt-1">{{ description }}</div>
			</div>
		</div>
	</BaseDialog>
</template>

<style lang="less" scoped>
.icon {
	&-primary {
		color: @theme;
	}

	&-success {
		color: @green;
	}

	&-warning {
		color: @orange;
	}

	&-danger {
		color: @red;
	}

	&-info {
		color: @gray;
	}
}
</style>
