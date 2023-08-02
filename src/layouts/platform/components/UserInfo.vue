<script lang="ts" setup>
import { useAppStore } from '@/store'

const appStore = useAppStore()

const userInfo = computed(() => appStore.userInfo)

// 退出登录
const logout = () => {
	appStore.logout()
}
</script>

<template>
	<el-popover popper-class="header-userinfo-popover" trigger="click">
		<template #reference>
			<div class="flex items-center">
				<Avatar :image="userInfo.avatar" />
				<div class="ml-2">{{ userInfo.name }}</div>
			</div>
		</template>

		<div class="popover-item" @click="$router.push('/individual')">
			<BaseIcon> <IconCustomUser /> </BaseIcon>
			<span class="ml-2">个人中心</span>
		</div>

		<div class="popover-item" @click="logout">
			<BaseIcon> <IconCustomExit /> </BaseIcon>
			<span class="ml-2">退出登录</span>
		</div>
	</el-popover>
</template>

<style lang="less" scoped>
.header-userinfo-popover {
	.popover-item {
		display: flex;
		align-items: center;
		padding: 10px;
		cursor: pointer;

		&:hover {
			background-color: #f2f8ff;
		}
	}
}
</style>
<style>
.header-userinfo-popover {
	padding: 5px 0 !important;
}
</style>
