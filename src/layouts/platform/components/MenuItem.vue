<script lang="ts" setup>
import { IMenu } from '@/model/common'
import IconHome from '~icons/custom/home'
import IconBlank from '~icons/custom/blank'
import IconUser from '~icons/custom/user'
import IconArticle from '~icons/custom/article'
import IconRole from '~icons/custom/role'
import IconMore from '~icons/custom/more'

interface IProps {
	config: IMenu
}

defineProps<IProps>()

const IconMap = {
	home: IconHome,
	blank: IconBlank,
	user: IconUser,
	article: IconArticle,
	role: IconRole,
	more: IconMore,
}
</script>

<template>
	<el-sub-menu v-if="config.children" :index="config.path!">
		<template #title>
			<BaseIcon v-if="config.icon" :size="16">
				<component :is="IconMap[config.icon!]"> </component>
			</BaseIcon>
			<span class="ml-1">{{ config.name }}</span>
		</template>
		<MenuItem v-for="childConfig in config.children" :key="childConfig.path" :config="childConfig"></MenuItem>
	</el-sub-menu>

	<el-menu-item class="flex items-center" v-else :index="config.path">
		<BaseIcon v-if="config.icon" :size="16">
			<component :is="IconMap[config.icon!]"> </component>
		</BaseIcon>
		<span v-else class="text-lg">•</span>
		<template #title>
			<span class="ml-1">{{ config.name }}</span>
		</template>
	</el-menu-item>
</template>
