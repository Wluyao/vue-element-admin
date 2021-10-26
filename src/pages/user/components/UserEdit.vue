<template>
	<base-dialog
		class="user-edit"
		:title="detail.id ? '编辑用户' : '新增用户'"
		width="700px"
		:visible="visible"
		:confirm-loading="confirmLoading"
		@confirm="handleConfirm"
		@close="handleBeforeClose"
	>
		<el-form ref="form" :model="detail" :rules="formRules" label-width="70px" v-loading="initLoading">
			<el-form-item label="账号:" prop="account">
				<el-input
					v-model="detail.account"
					placeholder="请填写账号"
					clearable
					:disabled="detail.id ? true : false"
				></el-input>
			</el-form-item>
			<el-form-item label="姓名:" prop="name">
				<el-input v-model="detail.name" placeholder="请填写用户姓名" clearable></el-input>
			</el-form-item>

			<el-form-item label="角色:" prop="roles">
				<el-select v-model="detail.roles" multiple placeholder="请选择用户角色">
					<el-option
						v-for="item in tableMng.getTable('role')"
						:key="item.id"
						:label="item.name"
						:value="item.id"
					></el-option>
				</el-select>
			</el-form-item>

			<el-form-item label="性别:">
				<el-radio-group v-model="detail.gender">
					<el-radio v-for="item in tableMng.getTable('gender')" :key="item.id" :label="item.id">{{
						item.name
					}}</el-radio>
				</el-radio-group>
			</el-form-item>

			<el-form-item label="头像:">
				<avatar-upload v-model="detail.avatar" action="https://sm.ms/api/v2/upload" name="smfile" />
			</el-form-item>

			<el-row>
				<el-col :span="12">
					<el-form-item label="手机:" placeholder="请填写手机号" prop="mobilePhone">
						<el-input v-model="detail.mobilePhone" clearable></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="邮箱:" placeholder="请填写邮箱地址" prop="email">
						<el-input v-model="detail.email" clearable></el-input>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
	</base-dialog>
</template>

<script>
import _ from 'lodash'
import tableMng from '@/utils/tableMng'
import AvatarUpload from '@/components/business/upload/avatar-upload'

const defaultDetail = {
	id: '',
	account: '',
	name: '',
	roles: [],
	gender: '',
	avatar: '',
	mobilePhone: '',
	email: '',
}

const formRules = {
	account: [
		{
			required: true,
			message: '请填写账号',
			trigger: 'blur',
		},
		{
			pattern: /^[a-zA-Z0-9_]{5,10}$/,
			message: '账号为5到10位的字母、数字或下划线组成',
			trigger: 'blur',
		},
	],
	name: [
		{
			required: true,
			message: '请填写姓名',
			trigger: 'blur',
		},
		{
			max: 6,
			message: '姓名长度不能超过6个字',
			trigger: 'blur',
		},
	],
	roles: [
		{
			required: true,
			message: '请选择角色',
			trigger: 'change',
		},
	],
	mobilePhone: [
		{
			required: true,
			message: '请填写手机号',
			trigger: 'blur',
		},
		{
			pattern: /^1[345789]\d{9}$/,
			message: '手机号码格式不正确',
			trigger: 'blur',
		},
	],
	email: [
		{
			type: 'email',
			message: '邮箱格式不正确',
			trigger: 'blur',
		},
	],
}

export default {
	components: {
		AvatarUpload,
	},
	data() {
		return {
			tableMng,
			formRules,
			visible: false,
			detail: {},
			detailBackup: {},
			confirmLoading: false,
			initLoading: false,
		}
	},
	methods: {
		// 打开模态窗
		open(data = {}) {
			this.visible = true
			this.changeDetail(data)
			this.getDetail()
		},
		toggleVisible() {
			this.visible = !this.visible
		},
		changeDetail(data) {
			this.detail = { ...defaultDetail, ...data }
			this.detailBackup = { ...defaultDetail, ...data }
		},
		// 获取用户详情
		async getDetail() {
			const { id } = this.detail
			if (!id) return
			this.initLoading = true
			try {
				const res = await this.$api.user.getDetail({ id })
				this.changeDetail(res)
			} catch (err) {
				console.error(err)
			} finally {
				this.initLoading = false
			}
		},
		handleConfirm() {
			this.$refs.form.validate(async valid => {
				if (valid) {
					this.confirmLoading = true
					try {
						await this.$api.user.update({ detail: this.detail })
						this.$message.success('提交成功')
						this.handleClose()
						this.$emit('success')
					} catch (err) {
						console.error(err)
					} finally {
						this.confirmLoading = false
					}
				} else {
					this.$message.error('请按照正确格式填写')
				}
			})
		},
		handleBeforeClose() {
			if (window.JSON.stringify(this.detailBackup) === window.JSON.stringify(this.detail)) {
				this.handleClose()
			} else {
				this.$confirm('信息修改后未提交，确认关闭？', '提示', {
					type: 'warning',
				})
					.then(this.handleClose)
					.catch(() => {})
			}
		},
		handleClose() {
			this.$refs.form.clearValidate()
			this.visible = false
		},
	},
}
</script>
