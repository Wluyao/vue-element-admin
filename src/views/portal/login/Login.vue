<script lang="ts" setup>
import { FormInstance, FormRules } from 'element-plus'
import { encryptByDES } from '@/utils/crypto'
import { DesKey } from '@/config/constant'
import { useAppStore } from '@/store'

const formRef = ref<FormInstance>()
const formData = ref({
	username: 'admin',
	password: '123456',
	remember: false,
})
const showPassword = ref(false)
const loginLoading = ref(false)

const appStore = useAppStore()

const formRules: FormRules = {
	username: [
		{
			required: true,
			message: '请输入账号',
		},
	],
	password: [
		{
			required: true,
			message: '请输入密码',
		},
		{
			min: 6,
			max: 20,
			message: '密码长度为6~20位',
			trigger: 'blur',
		},
	],
}

const handleLogin = () => {
	formRef.value?.validate(async (valid) => {
		if (!valid) return
		try {
			loginLoading.value = true
			await appStore.login({
				username: formData.value.username,
				password: encryptByDES(formData.value.password, DesKey),
			})
		} catch (err) {
			console.error(err)
		} finally {
			loginLoading.value = false
		}
	})
}
</script>

<template>
	<div class="login">
		<div class="login-header">账号登录</div>

		<el-form ref="formRef" :model="formData" :rules="formRules" label-position="top">
			<el-form-item label="账号" prop="username">
				<el-input v-model="formData.username" placeholder="请输入账号" autofocus>
					<template #prefix>
						<BaseIcon color="#333" :size="18"><IconCustomUser /></BaseIcon>
					</template>
				</el-input>
			</el-form-item>

			<el-form-item label="密码" prop="password">
				<el-input
					v-model="formData.password"
					placeholder="请输入密码"
					:type="showPassword ? 'text' : 'password'"
					@keyup.enter="handleLogin"
				>
					<template #prefix>
						<BaseIcon color="#333" :size="18"><IconCustomLock /></BaseIcon>
					</template>
					<template #suffix>
						<BaseIcon
							class="cursor-pointer"
							:name="showPassword ? 'eye-open' : 'eye-close'"
							color="#333"
							:size="18"
							@click="showPassword = !showPassword"
						/>
					</template>
				</el-input>
			</el-form-item>
		</el-form>

		<div class="flex mb-8">
			<el-checkbox v-model="formData.remember">记住账号</el-checkbox>
			<div class="ml-auto">
				<el-button type="primary" link @click="$router.push('/password')">忘记密码？</el-button>
				<span class="text-white mx-2">没有账号?</span>
				<el-button type="primary" link @click="$router.push('/register')">立即注册</el-button>
			</div>
		</div>

		<el-button class="button-login" type="primary" :loading="loginLoading" block @click="handleLogin">登录</el-button>
	</div>
</template>

<style lang="less" scoped>
.login {
	padding: 30px 20px;
	background-color: rgba(255, 255, 255, 0);
	box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.7);
	border-radius: 10px;

	&-header {
		font-size: 22px;
		text-align: center;
		color: #fff;
		margin-bottom: 10px;
	}
}

.button-login {
	width: 100%;
}

:deep(.el-form-item__label),
:deep(.el-checkbox__label) {
	color: #fff;
}
</style>
