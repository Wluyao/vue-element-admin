<script lang="ts" setup>
interface IProps {
	title?: string
	direction?: 'rtl' | 'ltr' | 'ttb' | 'btt'
	size?: string
	visible: boolean
	type?: Status
	class?: string
	confirmText?: string
	cancelText?: string
	confirmLoading?: boolean
	confirmDisabled?: boolean
	closeOnClickModal?: boolean
	showClose?: boolean
	showFooter?: boolean
	showConfirm?: boolean
	showCancel?: boolean
	destroyOnClose?: boolean
	modal?: boolean
}

const props = withDefaults(defineProps<IProps>(), {
	size: '600px',
	type: 'primary',
	closeOnClickModal: false,
	showClose: true,
	showFooter: true,
	showConfirm: true,
	showCancel: true,
	destroyOnClose: true,
	modal: true,
})

const emit = defineEmits(['confirm', 'close', 'open'])

defineExpose({
	scrollToTop() {
		setTimeout(() => {
			scrollRef.value.scrollTop = scrollRef.value.scrollHeight
		}, 0)
	},
})

const scrollRef = ref()

onBeforeUnmount(() => {
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

const handleOpen = () => {
	emit('open')
}
</script>

<template>
	<el-drawer
		:class="`base-drawer ${props.class}`"
		:model-value="visible"
		:direction="direction"
		:size="size"
		:destroy-on-close="destroyOnClose"
		append-to-body
		:show-close="false"
		:modal="modal"
		:close-on-click-modal="closeOnClickModal"
		@close="handleClose"
		@open="handleOpen"
	>
		<template #header>
			<div class="base-drawer-header">
				<slot name="header">
					<slot name="before-title"></slot>
					<span class="title-text text-t-500">{{ title }}</span>
				</slot>

				<div v-if="showClose" class="icon-close event-area-expand" @click="handleClose">
					<BaseIcon :size="16">
						<IconCustomClose />
					</BaseIcon>
				</div>
			</div>
		</template>

		<div class="flex flex-col h-full">
			<div class="base-drawer-body" ref="scrollRef">
				<slot></slot>
			</div>

			<div v-if="showFooter" class="base-drawer-footer">
				<slot name="footer">
					<el-button v-if="showCancel" @click="handleClose">
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
		</div>
	</el-drawer>
</template>

<style lang="less" scoped>
.base-drawer {
	&-header {
		width: 100%;
		display: flex;
		align-items: center;
		height: 70px;
		padding-left: 20px;
		padding-right: 20px;
		background-color: #f2f8ff;
	}

	&-body {
		padding: 20px;
		flex: auto;
		overflow: auto;
	}

	&-footer {
		height: 80px;
		flex: none;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #fff;
		z-index: 10;
	}

	.title-text {
		font-weight: bold;
		font-size: 16px;
	}

	.icon-close {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 30px;
		height: 30px;
		border-radius: 50%;
		background-color: #d7e9ff;
		color: @theme;
		margin-left: auto;
		cursor: pointer;

		&:hover {
			opacity: 0.8;
		}
	}
}
</style>

<style lang="less">
.base-drawer {
	.el-drawer__header {
		padding: 0px;
		margin-bottom: 0px;
	}

	.el-drawer__body {
		padding: 0px;
	}

	&-footer {
		.el-button {
			min-width: 100px;
		}
	}
}
</style>
