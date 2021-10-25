<template>
	<el-dialog
		class="base-dialog"
		:custom-class="customClass"
		:title="title"
		:visible.sync="dialogVisible"
		:destroy-on-close="destroyOnClose"
		:width="width"
		:top="top"
		@close="handleClose"
	>
		<div slot="title" v-if="!title">
			<slot name="title"></slot>
		</div>

		<div slot="footer" v-if="showFooter">
			<el-button v-if="showCancel" @click="handleClose">
				{{ cancelText || '取消' }}
			</el-button>
			<el-button
				v-if="showConfirm"
				:type="danger ? 'danger' : 'primary'"
				:disabled="confirmDisabled"
				:loading="confirmLoading"
				@click="handleConfirm"
			>
				{{ confirmText || '确认' }}
			</el-button>
		</div>

		<slot></slot>
	</el-dialog>
</template>

<script>
export default {
	props: {
		customClass: {
			type: String,
			default: '',
		},
		title: String,
		confirmText: String,
		cancelText: String,
		confirmLoading: Boolean,
		confirmDisabled: Boolean,
		danger: Boolean,
		width: {
			type: String,
			default: '500px',
		},
		top: String,
		visible: {
			type: Boolean,
			default: false,
		},
		showFooter: {
			type: Boolean,
			default: true,
		},
		showConfirm: {
			type: Boolean,
			default: true,
		},
		showCancel: {
			type: Boolean,
			default: true,
		},
		destroyOnClose: {
			type: Boolean,
			default: true,
		},
	},
	computed: {
		dialogVisible: {
			get() {
				return this.visible
			},
			set(val) {
				this.$emit('update:visible', val)
			},
		},
	},
	data() {
		return {}
	},
	methods: {
		handleConfirm() {
			this.$emit('confirm')
		},
		handleClose() {
			// this.dialogVisible = false
			this.$emit('close')
		},
	},
}
</script>

<style lang="scss">
.base-dialog {
	.el-dialog__body {
		padding: 20px;
	}
	.el-dialog__footer {
		text-align: center;
	}
}
</style>
