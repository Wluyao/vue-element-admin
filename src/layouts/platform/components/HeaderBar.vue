<script lang="ts" setup>
import { ref, computed, watchEffect } from 'vue'
import { useRoute, RouteLocationMatched } from 'vue-router'
import { useAppStore, useUiStore } from '@/store'

const matchList = ref<RouteLocationMatched[]>([])

const route = useRoute()
const appStore = useAppStore()
const uiStore = useUiStore()

const userInfo = computed(() => appStore.userInfo)
const sideCollapse = computed(() => uiStore.sideCollapse)

watchEffect(() => {
	matchList.value = route.matched.filter((item) => item.meta?.title)
})

// 折叠菜单栏
const toggleCollapse = () => {
	uiStore.setSideCollapse(!sideCollapse.value)
}

// 退出登录
const logout = () => {
	appStore.logout()
}
</script>

<template>
	<div class="platform-layout-header">
		<BaseIcon class="collapse" :size="24" @click="toggleCollapse">
			<IconCustomMenuFold v-if="sideCollapse" /><IconCustomMenuUnfold v-else />
		</BaseIcon>

		<el-breadcrumb separator="/">
			<el-breadcrumb-item v-for="(item, index) in matchList" :key="item.path">
				<span class="black9" v-if="index < matchList.length - 1">{{ item.meta.title }}</span>
				<span v-else class="black3">{{ item.meta.title }}</span>
			</el-breadcrumb-item>
		</el-breadcrumb>

		<div class="ml-auto flex items-center">
			<BaseIcon class="button-hover" :size="24" @click="$router.push('/setting')"><IconCustomSetting /></BaseIcon>

			<div class="individual" @click="$router.push('/individual')">
				<Avatar />
				<div class="username">{{ userInfo.name }}</div>
			</div>

			<div class="logout" @click="logout">
				<BaseIcon><IconCustomExit /></BaseIcon>
				<span class="ml-2">退出登录</span>
			</div>
		</div>
	</div>
</template>

<style lang="less" scoped>
.platform-layout-header {
	display: flex;
	align-items: center;
	height: 50px;
	padding: 0 20px;
	.collapse {
		margin-right: 10px;
		line-height: 50px;
		cursor: pointer;
		.button-hover;
	}

	.individual {
		display: flex;
		align-items: center;
		margin: 10px;
		color: @black6;
		cursor: pointer;

		.username {
			margin-left: 5px;
			.button-hover;
		}
	}

	.logout {
		display: flex;
		align-items: center;
		.button-hover;
	}

	:deep(.el-breadcrumb__separator) {
		font-weight: normal;
		margin: 0 5px;
	}
}
</style>
