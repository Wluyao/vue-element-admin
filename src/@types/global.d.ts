declare global {
	interface Window {
		$message: typeof import('@/utils/message')['default']
	}

	type Status = 'primary' | 'success' | 'warning' | 'danger' | 'info'
}

export {}
