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
		<BaseIcon class="button-hover ml-auto" :size="22" @click="$router.push('/setting')"><IconCustomSetting /></BaseIcon>

		<el-popover popper-class="layout-header-popover" trigger="click">
			<template #reference>
				<div class="flex items-center">
					<div class="individual">
						<Avatar :image="userInfo.avatar" />
						<div class="ml-2">{{ userInfo.name }}</div>
					</div>
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
	</div>
</template>

<style lang="less" scoped>
.platform-layout-header {
	display: flex;
	align-items: center;
	height: 50px;
	padding: 0 20px;
	color: @black6;

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

		cursor: pointer;

		&:hover {
			color: @theme;
		}
	}

	:deep(.el-breadcrumb__separator) {
		font-weight: normal;
		margin: 0 5px;
	}
}

.layout-header-popover {
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
.layout-header-popover {
	padding: 5px 0 !important;
}
</style>
