declare global {
	interface Window {
		$apis: typeof import('@/apis')['default']
		$message: typeof import('@/utils/message')['default']
	}

	type Status = 'primary' | 'success' | 'warning' | 'danger' | 'info'
}

export {}
