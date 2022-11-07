<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import _ from 'lodash'
import { useAppStore } from '@/store'
import { useUiStore } from '@/store'
import MenuItem from './MenuItem.vue'

const route = useRoute()
const router = useRouter()
const uiStore = useUiStore()
const appStore = useAppStore()

const sideCollapse = computed(() => uiStore.sideCollapse)
const menuList = computed(() => appStore.menuList)

const activePath = computed(() => {
	const { meta, path } = route
	const activePath = meta.activePath as string
	return activePath || path
})
</script>

<template>
	<div class="side-bar">
		<div class="side-bar-header" :class="{ 'side-bar-header-collapse': sideCollapse }" @click="$router.push('/home')">
			<BaseIcon :size="24"><IconCustomLogo /></BaseIcon>
			<span class="platform-name">后台管理系统</span>
		</div>

		<el-menu :default-active="activePath" :collapse="sideCollapse" router>
			<menu-item v-for="menu in menuList" :key="menu.path" :config="menu"></menu-item>
		</el-menu>
	</div>
</template>

<style lang="less" scoped>
.side-bar {
	display: flex;
	flex-direction: column;

	&-header {
		display: flex;
		align-items: center;
		width: 240px;
		height: 50px;
		padding: 20px 25px;
		background-color: @theme;
		text-align: center;
		transition: all 0.3s ease-in-out;
		cursor: pointer;

		&-collapse {
			width: 64px;
			padding: 20px 18px;
		}

		.platform-name {
			white-space: nowrap;
			overflow: hidden;
			margin-left: 5px;
			font-size: 24px;
			color: #fff;
		}
	}

	.el-menu {
		border-right: none;
		overflow: auto;
	}
}
</style>
