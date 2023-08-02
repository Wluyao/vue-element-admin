<script lang="ts" setup>
import { IGoods } from '@/model/home'
import apis from '@/apis'

const goodsList = ref<IGoods[]>([])

onMounted(() => {
	getGoodsList()
})

const getGoodsList = async () => {
	const data = await apis.home.getGoodsList()
	goodsList.value = data
}
</script>

<template>
	<el-card class="goods-card">
		<template #header>
			<div class="flex items-center">
				<span class="text-base">今日新上架商品</span>
			</div>
		</template>
		<el-table :data="goodsList" height="400">
			<el-table-column prop="name" label="名称"></el-table-column>
			<el-table-column prop="address" label="产地" width="160"></el-table-column>
			<el-table-column prop="price" label="价格(元)" width="100"></el-table-column>
		</el-table>
	</el-card>
</template>
