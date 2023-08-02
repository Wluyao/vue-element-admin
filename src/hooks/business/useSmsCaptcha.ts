import { ref, computed, onBeforeUnmount } from 'vue'
import apis from '@/apis'
import { useCountDown } from '@/hooks/base'

/**
 * 发送短信验证码
 */
const useCaptcha = () => {
	// 禁用发送按钮
	const captchaDisabled = ref(false)

	const { count, startCount, resetCount } = useCountDown({
		time: 6000,
		onFinish() {
			resetCaptcha()
		},
	})

	const captchaCount = computed(() => count.value.seconds)

	const sendCaptcha = async (params: { mobile?: string; email?: string }) => {
		try {
			captchaDisabled.value = true
			if (params.email) {
				await apis.common.sendEmailCaptcha({
					email: params.email,
				})
			} else if (params.mobile) {
				await apis.common.sendSmsCaptcha({
					mobile: params.mobile,
				})
			}
			window.$message.success('验证码已发送')
			startCount()
		} catch (err) {
			captchaDisabled.value = false
			console.error(err)
		}
	}

	// 校验验证码
	const validateCaptcha = async (params: { mobile?: string; email?: string; code: string }) => {
		const captchaToken = await apis.common.validateCaptcha(params)
		return captchaToken
	}

	const resetCaptcha = () => {
		captchaDisabled.value = false
		resetCount()
	}

	onBeforeUnmount(() => {
		resetCaptcha()
	})

	return {
		captchaDisabled,
		captchaCount,
		sendCaptcha,
		validateCaptcha,
		resetCaptcha,
	}
}

export default useCaptcha
