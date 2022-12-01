<script lang="ts" setup>
import { ref, computed } from 'vue'
import _ from 'lodash'
import { IUser } from '@/model/common'
import { useAppStore } from '@/store'
import { regMobile, regEmail } from '@/config/regexp'
import apis from '@/apis'

defineExpose({
	open(type) {
		visible.value = true
		editType.value = type
		formData.value = _.cloneDeep(appStore.userInfo)
	},
})

const visible = ref(false)
const formRef = ref()
const formData = ref<Partial<IUser>>({})
const confirmLoading = ref(false)
const editType = ref<'email' | 'mobile'>('email')

const title = computed(() => {
	const titleMap = {
		email: '邮箱',
		mobile: '手机号',
	}
	return titleMap[editType.value]
})

const appStore = useAppStore()

const formRule = {
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

const handleConfirm = () => {
	formRef.value.validate(async (valid: boolean) => {
		if (!valid) return
		try {
			confirmLoading.value = true
			await apis.individual.editUserInfo(formData.value)
			window.$message.success(title.value + '修改成功')
			appStore.getUserInfo()
			handleClose()
		} catch (err) {
			console.error(err)
		} finally {
			confirmLoading.value = false
		}
	})
}

const handleClose = () => {
	visible.value = false
	formRef.value.clearValidate()
}
</script>

<template>
	<BaseDialog
		:title="'修改' + title"
		:visible="visible"
		width="500px"
		:confirm-loading="confirmLoading"
		@confirm="handleConfirm"
		@close="handleClose"
	>
		<el-form ref="formRef" :model="formData" :rules="formRule">
			<el-form-item v-if="editType === 'email'" prop="email" label="邮箱：">
				<el-input v-model="formData.email" placeholder="请输入邮箱"></el-input>
			</el-form-item>

			<el-form-item v-if="editType === 'mobile'" prop="mobile" label="手机：">
				<el-input v-model="formData.mobile" placeholder="请输入手机号码"></el-input>
			</el-form-item>
		</el-form>
	</BaseDialog>
</template>
