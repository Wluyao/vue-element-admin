<script lang="ts" setup>
import { ref } from 'vue'
import { FormInstance, FormRules } from 'element-plus'
import { regPassword, regMobile } from '@/config/regexp'
import { useAppStore } from '@/store'
import { encryptByDES } from '@/utils/crypto'
import { DesKey } from '@/config/const'
import { useSmsCaptcha } from '@/hooks/business'
import apis from '@/apis'

const formRef = ref<FormInstance>()
const submitLoading = ref(false)
const formData = ref({
	username: '',
	password: '',
	checkPassword: '',
	mobile: '',
	captcha: '',
})

const appStore = useAppStore()
const { captchaDisabled, captchaCount, sendCaptcha } = useSmsCaptcha()

const formRules: FormRules = {
	username: [
		{
			required: true,
			message: '账号不能为空',
		},
	],
	password: [
		{
			required: true,
			message: '请输入密码',
		},
		{
			pattern: regPassword,
			message: '密码需要为6~20位，且需要包含数字和字母',
			trigger: 'blur',
		},
	],
	checkPassword: [
		{
			required: true,
			message: '请再次输入密码',
			trigger: 'blur',
		},
		{
			validator(rule, value) {
				return value === formData.value.password
			},
			message: '两次输入的密码不一致',
			trigger: 'blur',
		},
	],
	mobile: [
		{
			required: true,
			message: '手机号码不能为空',
		},
		{
			pattern: regMobile,
			message: '手机号码格式不正确',
			trigger: 'blur',
		},
	],
	captcha: [
		{
			required: true,
			message: '请填写验证码',
		},
	],
}

// 获取验证码
const getCaptcha = async () => {
	formRef.value?.validateField('mobile', (valid) => {
		if (!valid) return
		sendCaptcha({
			mobile: formData.value.mobile,
		})
	})
}

const handleSubmit = () => {
	formRef.value?.validate(async (valid) => {
		if (!valid) return
		submitLoading.value = true
		await apis.portal.register(formData.value)
		window.$message.success('注册成功！')
		submitLoading.value = false
		appStore.login({
			username: formData.value.username,
			password: encryptByDES(formData.value.password, DesKey),
		})
	})
}
</script>

<template>
	<div class="register">
		<p class="register-header">账号注册</p>

		<el-form ref="formRef" :model="formData" :rules="formRules" :label-width="80">
			<el-form-item label="账号" prop="username">
				<el-input v-model="formData.username" placeholder="请输入账号"></el-input>
			</el-form-item>

			<el-form-item label="密码" prop="password">
				<el-input v-model="formData.password" type="password" placeholder="请输入密码"></el-input>
			</el-form-item>

			<el-form-item label="确认密码" prop="checkPassword">
				<el-input v-model="formData.checkPassword" type="password" placeholder="请再次输入密码"></el-input>
			</el-form-item>

			<el-form-item label="手机号" prop="mobile">
				<el-input v-model="formData.mobile" placeholder="请填写手机号码"></el-input>
			</el-form-item>

			<el-form-item label="验证码" prop="captcha">
				<div class="flex">
					<el-input v-model="formData.captcha" placeholder="请输入短信验证码"></el-input>
					<el-button class="ml-5" type="info" :disabled="captchaDisabled" @click="getCaptcha">
						获取验证码
						<span v-if="captchaDisabled">({{ captchaCount }}s)</span>
					</el-button>
				</div>
			</el-form-item>

			<el-form-item>
				<div class="flex">
					<el-button class="w-35" type="primary" :loading="submitLoading" @click="handleSubmit">注册</el-button>
					<el-button class="ml-5" type="primary" link @click="$router.push('/login')">使用已有账号登录</el-button>
				</div>
			</el-form-item>
		</el-form>
	</div>
</template>

<style lang="less" scoped>
.register {
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

:deep(.el-form-item__label) {
	color: #fff;
}
</style>
