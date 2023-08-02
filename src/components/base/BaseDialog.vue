<script lang="ts" setup>
import { ElDialog, ElButton } from 'element-plus'

interface IProps {
	title?: string
	visible: boolean
	type?: Status
	top?: string
	width?: string
	class?: string
	confirmText?: string
	cancelText?: string
	confirmLoading?: boolean
	confirmDisabled?: boolean
	closeOnClickModal?: boolean
	showFooter?: boolean
	showConfirm?: boolean
	showCancel?: boolean
	destroyOnClose?: boolean
	modal?: boolean
	cancel?: () => void
}

const props = withDefaults(defineProps<IProps>(), {
	type: 'primary',
	width: '600px',
	modal: true,
	closeOnClickModal: false,
	showFooter: true,
	showConfirm: true,
	showCancel: true,
	destroyOnClose: true,
})

const emit = defineEmits(['confirm', 'close', 'opened'])

onUnmounted(() => {
	handleClose()
})

const handleConfirm = () => {
	emit('confirm')
}

const handleClose = () => {
	if (props.visible) {
		emit('close')
	}
}

const handleOpened = () => {
	emit('opened')
}

const handleCancel = () => {
	if (props.cancel) {
		props.cancel()
	} else {
		handleClose()
	}
}
</script>

<template>
	<el-dialog
		:class="`base-dialog ${props.class}`"
		:title="title"
		:model-value="visible"
		:width="width"
		:top="top"
		:destroy-on-close="destroyOnClose"
		append-to-body
		:modal="modal"
		:close-on-click-modal="closeOnClickModal"
		@close="handleClose"
		@opened="handleOpened"
	>
		<template #header>
			<div v-if="!title">
				<slot name="header"></slot>
			</div>
		</template>

		<slot></slot>

		<template #footer>
			<div v-if="showFooter" class="footer">
				<slot name="footer">
					<slot name="customBtn"></slot>

					<el-button v-if="showCancel" @click="handleCancel">
						{{ cancelText || '取消' }}
					</el-button>
					<el-button
						v-if="showConfirm"
						:type="type"
						:disabled="confirmDisabled"
						:loading="confirmLoading"
						@click="handleConfirm"
					>
						{{ confirmText || '确认' }}
					</el-button>
				</slot>
			</div>
		</template>
	</el-dialog>
</template>
<style lang="less">
.base-dialog {
	.el-dialog__header {
		padding: 12px 20px;
		text-align: center;
		background-color: #f2f8ff;
		margin-right: 0;
	}

	.el-dialog__title {
		font-size: 16px;
		font-weight: bold;
		color: #333;
	}

	.el-dialog__headerbtn {
		width: 20px;
		height: 20px;
		background-color: #d7e9ff;
		border-radius: 50%;
		top: 14px;
		right: 20px;

		&:hover {
			.el-dialog__close {
				opacity: 0.8;
			}
		}
	}

	.el-dialog__close {
		color: var(--el-color-primary);
	}

	.el-dialog__body {
		padding: 20px;
		color: #333;
	}

	.el-dialog__footer {
		text-align: right;
	}

	.footer {
		.el-button {
			min-width: 100px;
		}
	}
}
</style>
