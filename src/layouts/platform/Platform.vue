<script lang="ts" setup>
import { onMounted } from 'vue'
import { useEnumStore } from '@/store'
import HeaderBar from './components/HeaderBar.vue'
import SideBar from './components/SideBar.vue'

const enumStore = useEnumStore()

onMounted(() => {
	enumStore.initEnum()
})
</script>

<template>
	<div class="platform">
		<SideBar />

		<div class="platform-main">
			<HeaderBar class="flex-none" />

			<div class="platform-page">
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>

<style lang="less" scoped>
.platform {
	display: flex;
	height: 100vh;

	&-main {
		flex: auto;
		display: flex;
		flex-direction: column;
		overflow-x: hidden;
	}

	&-page {
		position: relative;
		padding: 20px;
		height: 100%;
		flex: auto;
		background-color: #f6f6f6;
		overflow: auto;
	}
}
</style>
