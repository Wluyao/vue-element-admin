<template>
	<div class="outer-layout">
		<div class="outer-layout__header">
			<icon name="logo" :size="36"></icon>
			<span>后台管理系统</span>
		</div>

		<div class="outer-layout__page">
			<router-view></router-view>
		</div>

		<style-setting class="style-setting"></style-setting>
	</div>
</template>

<script>
/**
 * 外部布局(未登录)
 */
import StyleSetting from '@/components/business/setting/style-setting'

export default {
	components: {
		StyleSetting,
	},
}
</script>

<style lang="scss" scoped>
.outer-layout {
	min-height: 100vh;
	background: url(~@/assets/images/layout/outer_bg.jpg) no-repeat fixed center;
	background-size: cover;

	&__header {
		padding-top: 60px;
		text-align: center;
		font-size: 32px;
		color: #fff;
	}

	&__page {
		width: 440px;
		margin: 0 auto;
		margin-top: 60px;
	}

	.style-setting {
		display: none;
	}
}
</style>
