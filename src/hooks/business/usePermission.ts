import { useAppStoreWithOut } from '@/store'

const usePermission = () => {
	const appStore = useAppStoreWithOut()

	const checkPermission = (value: string = '') => {
		return appStore.permissions.includes(value)
	}

	return {
		checkPermission,
	}
}

export default usePermission
