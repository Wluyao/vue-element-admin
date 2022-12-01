import { h, AppContext, isVNode } from 'vue'
import { ElMessage, MessageParams } from 'element-plus'
import IconLoading from '~icons/custom/loading'

const info = (options?: MessageParams, appContext?: AppContext | null) => {
	ElMessage.closeAll()
	return ElMessage.info(options, appContext)
}

const success = (options?: MessageParams, appContext?: AppContext | null) => {
	ElMessage.closeAll()
	return ElMessage.success(options, appContext)
}

const warning = (options?: MessageParams, appContext?: AppContext | null) => {
	ElMessage.closeAll()
	return ElMessage.warning(options, appContext)
}

const error = (options?: MessageParams, appContext?: AppContext | null) => {
	ElMessage.closeAll()
	return ElMessage.error(options, appContext)
}

const loading = (options?: MessageParams, appContext?: AppContext | null) => {
	ElMessage.closeAll()
	let params: MessageParams | undefined = undefined
	if (typeof options === 'string' || isVNode(options)) {
		params = {
			message: options,
		}
	} else {
		params = options
	}

	return ElMessage(
		{
			icon: h(IconLoading, { spin: true }),
			...params,
		},
		appContext
	)
}

export default {
	info,
	success,
	warning,
	error,
	loading,
}
