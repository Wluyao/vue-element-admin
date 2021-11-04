<template>
	<base-drawer title="系统界面设置" :visible="visible" size="300px" :show-footer="false" @close="visible = false">
		<el-form label-width="100px">
			<el-form-item label="导航标签：">
				<el-switch v-model="tagVisible"></el-switch>
			</el-form-item>

			<el-form-item label="系统风格：">
				<style-setting></style-setting>
			</el-form-item>

			<el-form-item label="元素大小：">
				<size-setting></size-setting>
			</el-form-item>

			<el-form-item label="换肤：">
				<theme-setting></theme-setting>
			</el-form-item>
		</el-form>
	</base-drawer>
</template>

<script>
import StyleSetting from '@/components/business/setting/style-setting'
import SizeSetting from '@/components/business/setting/size-setting'
import ThemeSetting from '@/components/business/setting/theme-setting'

export default {
	components: {
		StyleSetting,
		SizeSetting,
		ThemeSetting,
	},
	data() {
		return {
			visible: false,
			tagVisible: this.$store.getters.tagVisible,
		}
	},

	watch: {
		tagVisible(value) {
			this.$store.commit('SET_TAG_VISIBLE', value)
		},
	},
	methods: {
		open() {
			this.visible = true
		},
	},
}
</script>
