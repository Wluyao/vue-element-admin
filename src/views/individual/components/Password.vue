<script lang="ts" setup>
import { useAppStore } from '@/store'
import { encryptByDES } from '@/utils/crypto'
import { DesKey } from '@/config/constant'

import apis from '@/apis'

defineExpose({
	open() {
		visible.value = true
	},
})

const formRef = shallowRef()
const visible = ref(false)
const submitLoading = ref(false)
const showOldPassword = ref(true)
const showPassword = ref(true)
const showCheckPassword = ref(true)
const formData = ref({
	oldPassword: '',
	password: '',
	checkPassword: '',
})

const appStore = useAppStore()

const validatePassword = (rule: Object, value: string, callback: (e?: Error) => void) => {
	if (value === formData.value.oldPassword) {
		callback(new Error('新密码不能和旧密码相同'))
	} else {
		callback()
	}
}

const validateCheckPassword = (rule: Object, value: string, callback: (e?: Error) => void) => {
	if (value === formData.value.password) {
		callback()
	} else {
		callback(new Error('两次填写的密码不一致'))
	}
}

const formRule = {
	oldPassword: [{ required: true, message: '请输入原密码' }],
	password: [
		{ required: true, message: '请输入新密码' },
		{ validator: validatePassword, trigger: 'blur' },
	],
	checkPassword: [
		{ required: true, message: '请再次输入密码' },
		{ validator: validateCheckPassword, trigger: 'blur' },
	],
}

const hanndleSubmit = () => {
	formRef.value.validate(async (valid: boolean) => {
		if (!valid) return
		try {
			submitLoading.value = true
			const { oldPassword, password } = formData.value
			await apis.individual.modifyPassword({
				password: encryptByDES(oldPassword, DesKey),
				newPassword: encryptByDES(password, DesKey),
			})
			window.$message.success('密码修改成功，请使用新密码重新登录')
			appStore.logout(false)
		} catch (err) {
			console.error(err)
		} finally {
			submitLoading.value = false
		}
	})
}

const handleClose = () => {
	visible.value = false
}
</script>

<template>
	<BaseDialog
		title="修改密码"
		:visible="visible"
		width="500px"
		:confirm-loading="submitLoading"
		@confirm="hanndleSubmit"
		@close="handleClose"
	>
		<el-form ref="formRef" :model="formData" :rules="formRule">
			<el-form-item prop="oldPassword" label="原密码：">
				<el-input v-model="formData.oldPassword" :show-password="showOldPassword" placeholder="请输入原密码">
					<template #suffix>
						<BaseIcon class="cursor-pointer" @click="showOldPassword = !showOldPassword">
							<IconCustomEyeClose v-if="showOldPassword" />
							<IconCustomEyeOpen v-else />
						</BaseIcon>
					</template>
				</el-input>
			</el-form-item>

			<el-form-item prop="password" label="新密码：">
				<el-input v-model="formData.password" :show-password="showPassword" placeholder="请输入新密码">
					<template #suffix>
						<BaseIcon class="cursor-pointer" @click="showPassword = !showPassword">
							<IconCustomEyeClose v-if="showPassword" />
							<IconCustomEyeOpen v-else />
						</BaseIcon>
					</template>
				</el-input>
			</el-form-item>

			<el-form-item prop="checkPassword" label="新密码：">
				<el-input v-model="formData.checkPassword" :show-password="showCheckPassword" placeholder="请再次输入密码">
					<template #suffix>
						<BaseIcon class="cursor-pointer" @click="showCheckPassword = !showCheckPassword">
							<IconCustomEyeClose v-if="showCheckPassword" />
							<IconCustomEyeOpen v-else />
						</BaseIcon>
					</template>
				</el-input>
			</el-form-item>
		</el-form>
	</BaseDialog>
</template>
