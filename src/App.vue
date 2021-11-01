<template>
	<div>
		<router-view></router-view>

		<theme-setting style="display: none"></theme-setting>
	</div>
</template>

<script>
import ThemeSetting from '@/components/business/setting/theme-setting'

export default {
	components: {
		ThemeSetting,
	},
}
</script>
