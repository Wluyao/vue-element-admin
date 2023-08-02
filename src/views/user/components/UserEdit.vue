<script lang="ts" setup>
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { enumGender } from '@/config/enum'
import { regMobile, regEmail } from '@/config/regexp'
import { useEnumStore } from '@/store'
import { IUser } from '@/model/user'
import apis from '@/apis'

const emit = defineEmits(['success'])

defineExpose({
	open(data?: IUser) {
		visible.value = true
		formData.value = Object.assign(
			{
				gender: '1',
				role: enumGender.origin[0],
			},
			data
		)
		if (data) {
			formData.value.id = data.id
			getDetail()
		}
	},
})

const formRef = ref()
const visible = ref(false)
const initLoading = ref(false)
const confirmLoading = ref(false)
const formData = ref<IUser>({} as IUser)

const enumStore = useEnumStore()
const { enumRole } = storeToRefs(enumStore)

const isAdd = computed(() => !formData.value.id)

const formRule = {
	username: [
		{
			required: true,
			message: '请输入账号',
		},
	],
	name: [
		{
			required: true,
			message: '请输入姓名',
		},
	],
	role: [
		{
			required: true,
			message: '请选择角色',
		},
	],
	mobile: [
		{
			pattern: regMobile,
			message: '手机号格式不正确',
			trigger: 'blur',
		},
	],
	email: [
		{
			pattern: regEmail,
			message: '邮箱格式不正确',
			trigger: 'blur',
		},
	],
}

const getDetail = async () => {
	try {
		initLoading.value = true
		const data = await apis.user.getUserDetail(formData.value.id)
		formData.value = data
	} catch (err) {
		console.error(err)
	} finally {
		initLoading.value = false
	}
}

const handleConfirm = async () => {
	try {
		confirmLoading.value = true
		await apis.user.editUser(formData.value)
		window.$message.success(isAdd ? '用户创建成功' : '用户编辑成功')
		emit('success')
		handleClose()
	} catch (err) {
		console.error(err)
	} finally {
		confirmLoading.value = false
	}
}

const handleClose = () => {
	visible.value = false
	formRef.value.clearValidate()
}
</script>

<template>
	<BaseDialog
		:title="isAdd ? '新增用户' : '编辑用户'"
		:visible="visible"
		:confirm-loading="confirmLoading"
		@confirm="handleConfirm"
		@close="handleClose"
	>
		<el-form v-loading="initLoading" ref="formRef" :model="formData" :rules="formRule" :label-width="70">
			<el-form-item prop="username" label="账号">
				<el-input v-model="formData.name" placeholder="请输入用户账号" :disabled="!isAdd"></el-input>
			</el-form-item>
			<el-form-item prop="name" label="姓名">
				<el-input v-model="formData.name" placeholder="请输入用户姓名"> </el-input>
			</el-form-item>
			<el-form-item prop="role" label="角色" multiple>
				<el-select v-model="formData.role" placeholder="请选择角色">
					<el-option v-for="item in enumRole.origin" :key="item.id" :label="item.name" :value="item.id"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item prop="gender" label="性别">
				<el-radio-group v-model="formData.gender">
					<el-radio v-for="item in enumGender.origin" :key="item.id" :label="item.id">{{ item.name }}</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item prop="mobile" label="手机">
				<el-input v-model="formData.mobile" placeholder="请填写手机号"></el-input>
			</el-form-item>
			<el-form-item prop="email" label="邮箱">
				<el-input v-model="formData.email" placeholder="请填写邮箱地址"></el-input>
			</el-form-item>
			<el-form-item prop="remark" label="备注">
				<el-input
					v-model="formData.remark"
					type="textarea"
					:rows="3"
					:maxlength="255"
					placeholder="请输入备注"
				></el-input>
			</el-form-item>
		</el-form>
	</BaseDialog>
</template>
