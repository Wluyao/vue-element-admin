import { useAppStore } from '@/store'

const usePermission = () => {
	const appStore = useAppStore()

	const checkPermission = (value: string = '') => {
		return appStore.permissions.includes(value)
	}

	return {
		checkPermission,
	}
}

export default usePermission
