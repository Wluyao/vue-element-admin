<script lang="ts" setup>
import { RouteLocationMatched } from 'vue-router'
import { useUiStore } from '@/store'
import UserInfo from './UserInfo.vue'

const matchList = ref<RouteLocationMatched[]>([])

const route = useRoute()
const uiStore = useUiStore()

const sideCollapse = computed(() => uiStore.sideCollapse)

watchEffect(() => {
	matchList.value = route.matched.filter((item) => item.meta?.title)
})

// 折叠菜单栏
const toggleCollapse = () => {
	uiStore.setSideCollapse(!sideCollapse.value)
}
</script>

<template>
	<div class="platform-layout-header">
		<BaseIcon class="menu-collapse" :size="24" @click="toggleCollapse">
			<IconCustomMenuFold v-if="sideCollapse" />
			<IconCustomMenuUnfold v-else />
		</BaseIcon>

		<el-breadcrumb separator="/">
			<el-breadcrumb-item v-for="(item, index) in matchList" :key="item.path">
				<span class="text-info-secondary" v-if="index < matchList.length - 1">{{ item.meta.title }}</span>
				<span v-else class="text-info-primary">{{ item.meta.title }}</span>
			</el-breadcrumb-item>
		</el-breadcrumb>
		<BaseIcon class="cursor-pointer hover:opacity-80 ml-auto" :size="22" @click="$router.push('/setting')">
			<IconCustomSetting />
		</BaseIcon>

		<UserInfo />
	</div>
</template>

<style lang="less" scoped>
.platform-layout-header {
	display: flex;
	align-items: center;
	height: 50px;
	padding: 0 20px;
	color: @info-regular;

	.menu-collapse {
		margin-right: 10px;
		line-height: 50px;
		cursor: pointer;
		&:hover {
			opacity: 0, 8;
		}
	}

	.individual {
		display: flex;
		align-items: center;
		margin: 10px;

		cursor: pointer;

		&:hover {
			color: @primary;
		}
	}

	:deep(.el-breadcrumb__separator) {
		font-weight: normal;
		margin: 0 5px;
	}
}
</style>
