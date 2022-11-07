import { h, AppContext, isVNode } from 'vue'
import { ElMessage, MessageParamsTyped } from 'element-plus'
import IconLoading from '~icons/custom/loading'

const info = (options?: MessageParamsTyped, appContext?: AppContext | null) => {
	ElMessage.closeAll()
	return ElMessage.info(options, appContext)
}

const success = (options?: MessageParamsTyped, appContext?: AppContext | null) => {
	ElMessage.closeAll()
	return ElMessage.success(options, appContext)
}

const warning = (options?: MessageParamsTyped, appContext?: AppContext | null) => {
	ElMessage.closeAll()
	return ElMessage.warning(options, appContext)
}

const error = (options?: MessageParamsTyped, appContext?: AppContext | null) => {
	ElMessage.closeAll()
	return ElMessage.error(options, appContext)
}

const loading = (options?: MessageParamsTyped, appContext?: AppContext | null) => {
	ElMessage.closeAll()
	let params: MessageParamsTyped | undefined = undefined
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
