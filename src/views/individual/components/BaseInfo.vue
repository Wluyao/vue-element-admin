<script lang="ts" setup>
import { useAppStore } from '@/store'
import apis from '@/apis'
import BaseEdit from './BaseEdit.vue'
import Password from './Password.vue'

const editRef = ref()
const passwordRef = ref()

const appStore = useAppStore()

const userInfo = computed(() => appStore.userInfo)

const handleUploadAvatar = async (avatar) => {
	await apis.individual.editUserInfo({ avatar })
	appStore.getUserInfo()
}
</script>

<template>
	<div class="flex items-center p-5 bg-white rounded">
		<AvatarUpload v-model="userInfo.avatar" @change="handleUploadAvatar" />

		<div class="ml-5">
			<div class="font-bold text-3xl mb-6">{{ userInfo.name }}</div>
			<div class="flex">
				<div>
					邮箱：
					<span v-if="userInfo.email">{{ userInfo.email }}</span>
					<span v-else class="text-info-regular">未设置</span>
					<el-button class="ml-2" type="primary" link @click="editRef.open('email')">
						<BaseIcon><IconCustomEdit /></BaseIcon>
					</el-button>
				</div>

				<div class="ml-10">
					手机号：
					<span v-if="userInfo.mobile">{{ userInfo.mobile }}</span>
					<span v-else class="text-info-regular">未设置</span>
					<el-button class="ml-2" type="primary" link @click="editRef.open('mobile')">
						<BaseIcon><IconCustomEdit /></BaseIcon>
					</el-button>
				</div>
			</div>
		</div>

		<el-button class="ml-auto" type="primary" @click="passwordRef.open()">修改密码</el-button>
	</div>
	<BaseEdit ref="editRef" />
	<Password ref="passwordRef" />
</template>

<style lang="less" scoped></style>
