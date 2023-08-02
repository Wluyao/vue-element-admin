import { h, render } from 'vue'
import BaseConfirm from '@/components/base/BaseConfirm.vue'

const container = document.createElement('div')

interface IOptions<T> {
	type: Status
	title: string
	message: string | ((data: T) => void)
	description: string | ((data: T) => void)
	onConfirm: (data: T) => Promise<void>
	onClose: () => void
}

const useConfirm = <T>(options: Partial<IOptions<T>>) => {
	const handler = (data: T) => {
		const { type, title = '提示', message, description, onConfirm, onClose } = options

		const handleClose = () => {
			onClose && onClose()
			render(null, container)
		}

		const getMessage = (data: T) => {
			if (!message) return ''
			if (typeof message === 'string') {
				return message
			}
			return message(data)
		}

		const getDescription = (data: T) => {
			if (!description) return ''
			if (typeof description === 'string') {
				return description
			}
			return description(data)
		}

		const confirmNode = h(BaseConfirm, {
			type,
			title,
			visible: true,
			message: getMessage(data),
			description: getDescription(data),
			async onConfirm() {
				const props = confirmNode.component?.props!

				props.confirmLoading = true
				if (onConfirm) {
					await onConfirm(data)
				}
				props.confirmLoading = false
				handleClose()
			},
			onClose: handleClose,
		})

		render(confirmNode, container)
	}

	return handler
}

export default useConfirm
