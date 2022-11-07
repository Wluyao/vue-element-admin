import type { Directive } from 'vue'
import { usePermission } from '@/hooks/business'

const auth: Directive<HTMLElement, string | undefined> = {
	mounted(el, binding) {
		const { checkPermission } = usePermission()
		if (!checkPermission(binding.value)) {
			el.remove()
		}
	},
}

export default auth
