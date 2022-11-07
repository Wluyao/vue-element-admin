<template>
	<div class="portal">
		<div class="portal-header">
			<BaseIcon :size="36"><IconCustomLogo /></BaseIcon>
			<span class="ml-1">后台管理系统</span>
		</div>

		<div class="portal-page">
			<router-view></router-view>
		</div>
	</div>
</template>

<script lang="ts" setup></script>

<style lang="less" scoped>
.portal {
	height: 100vh;
	padding-top: 60px;
	background: url(@/assets/images/layout/portal_bg.jpg) no-repeat fixed center;
	background-size: cover;

	&-header {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 32px;
		color: #fff;
	}

	&-page {
		width: 440px;
		margin: 0 auto;
		margin-top: 60px;
	}
}
</style>
