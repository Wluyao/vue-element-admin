<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { FormInstance, FormRules } from 'element-plus'
import { regPassword, regMobile } from '@/config/regexp'
import { useSmsCaptcha } from '@/hooks/business'

const formRef = ref<FormInstance>()
const formData = ref({
	mobile: '',
	captcha: '',
	password: '',
	checkPassword: '',
})
const submitLoading = ref(false)

const router = useRouter()
const { captchaDisabled, captchaCount, sendCaptcha } = useSmsCaptcha()

const formRules: FormRules = {
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
		},
		{
			validator(rule, value) {
				if (value !== formData.value.password) {
					return new Error('两次输入的密码不一致')
				}
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
	formRef.value?.validate(async (valid) => {
		if (!valid) return
		sendCaptcha({
			mobile: formData.value.mobile,
		})
	})
}

// 提交
const handleSubmit = () => {
	formRef.value?.validate(async (valid) => {
		if (!valid) return
		submitLoading.value = true
		await window.$apis.portal.modifyPassword(formData.value)
		window.$message.success('修改成功,请使用新密码进行登录')
		router.replace('/login')
	})
}
</script>

<template>
	<div class="forget">
		<div class="forget-header">忘记密码</div>

		<el-form ref="formRef" :model="formData" :rules="formRules" :label-width="80">
			<el-form-item label="新密码" prop="password">
				<el-input v-model="formData.password" placeholder="请输入新密码" type="password"></el-input>
			</el-form-item>

			<el-form-item label="确认密码" prop="checkPassword">
				<el-input
					v-model="formData.checkPassword"
					type="password"
					placeholder="请再次输入密码确认"
					@keyup.enter="handleSubmit"
				></el-input>
			</el-form-item>

			<el-form-item label="手机号" prop="mobile">
				<el-input v-model="formData.mobile" placeholder="请输入手机号"></el-input>
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
				<div class="flex justify-between">
					<el-button class="w-25" type="primary" :loading="submitLoading" @click="handleSubmit">确认</el-button>
					<el-button class="w-25 ml-5" type="info" @click="$router.push('/login')">取消</el-button>
				</div>
			</el-form-item>
		</el-form>
	</div>
</template>

<style lang="less" scoped>
.forget {
	padding: 30px 20px;
	background-color: rgba(255, 255, 255, 0);
	box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.7);
	border-radius: 10px;

	.forget-header {
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
