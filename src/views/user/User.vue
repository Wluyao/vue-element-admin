<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { exportExcel } from '@/utils/excle'
import { IUser } from '@/model/user'
import { enumGender } from '@/config/enum'
import { useEnumStore } from '@/store'
import UserEdit from './components/UserEdit.vue'

interface IFormData {
	name: string
	gender: 1 | 2
	roles: number[]
}

const userEditRef = ref()
const exportLoading = ref(false)
const tableLoading = ref(false)
const tableTotal = ref(0)
const tableData = ref<IUser[]>([])
const formData = ref<Partial<IFormData>>({})
const page = ref({
	number: 1,
	size: 10,
})

const enumStore = useEnumStore()

onMounted(() => {
	getTableData()
})

const getTableData = async () => {
	tableLoading.value = true
	const data = await window.$apis.user.getUserList({
		...formData.value,
		page: page.value,
	})
	tableData.value = data.list
	tableTotal.value = data.total
	tableLoading.value = false
}

const handleSearch = () => {
	page.value.number = 1
	getTableData()
}

const handleReset = () => {
	formData.value = {}
	handleSearch()
}

const handleExport = async () => {
	exportLoading.value = true
	const res = await window.$apis.user.getAllUserList()
	const data = res.map((item, index) => {
		return {
			name: item.name,
			phone: item.phone,
			gender: item.gender,
			roles: item.roles.map((item) => item.name).join('，'),
			createDate: item.createDate,
			consume: item.consume,
		}
	})
	// exportExcel(['姓名', '手机', '性别', '角色', '创建时间', '累计消费额(元)'], data, '用户数据表')
	exportLoading.value = false
}

const handleEdit = (row?: IUser) => {
	userEditRef.value.open(row)
}

const handleDelete = async (row: IUser) => {
	await window.$apis.user.deleteUser(row.id)
	window.$message.success('删除成功')
	getTableData()
}
</script>

<template>
	<div class="bg-white p-4">
		<div class="flex items-center mb-4">
			<BaseTitle>用户列表</BaseTitle>
			<div class="ml-auto">
				<el-button type="primary" @click="handleEdit()">
					<BaseIcon class="mr-1" name="plus" />
					新增用户
				</el-button>
				<el-button type="info" :loading="exportLoading" @click="handleExport">
					<BaseIcon class="mr-1" name="download" />
					导出表格
				</el-button>
			</div>
		</div>

		<el-form :inline="true" :model="formData">
			<el-form-item label="姓名:">
				<el-input v-model="formData.name" placeholder="请输入用户姓名关键字"></el-input>
			</el-form-item>
			<el-form-item label="性别:">
				<el-select v-model="formData.gender" placeholder="请选择性别">
					<el-option v-for="item in enumGender.origin" :key="item.id" :label="item.name" :value="item.id"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="角色:">
				<el-select v-model="formData.roles" placeholder="请选择角色" multiple>
					<el-option
						v-for="item in enumStore.enumRole.origin"
						:key="item.id"
						:label="item.name"
						:value="item.id"
					></el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="handleSearch">
					<BaseIcon class="mr-1" name="search" />
					查询
				</el-button>
				<el-button @click="handleReset">
					<BaseIcon class="mr-1" name="refresh" />
					重置
				</el-button>
			</el-form-item>
		</el-form>

		<div>
			<el-table v-loading="tableLoading" :data="tableData">
				<el-table-column prop="name" label="姓名"></el-table-column>
				<el-table-column prop="phone" label="手机"></el-table-column>
				<el-table-column prop="gender" label="性别">
					<template #default="scope">
						{{ enumGender[scope.row.gender] }}
					</template>
				</el-table-column>
				<el-table-column prop="roles" label="角色">
					<!-- <template #default="scope">{{ scope.row.roles.map((item) => item.name).join('，') }}</template> -->
				</el-table-column>
				<el-table-column prop="createDate" label="创建时间" sortable></el-table-column>
				<el-table-column prop="consume" label="累计消费额(元)" width="160px" sortable></el-table-column>
				<el-table-column label="操作" width="120px">
					<template #default="scope">
						<el-button type="primary" link @click="handleEdit(scope.row)">编辑</el-button>
						<el-divider direction="vertical"></el-divider>
						<el-popconfirm title="确认删除该用户吗？" @confirm="handleDelete(scope.row)">
							<template #reference>
								<el-button type="danger" link>删除</el-button>
							</template>
						</el-popconfirm>
					</template>
				</el-table-column>
			</el-table>
		</div>

		<Pagination
			v-model:pageNumber="page.number"
			v-model:pageSize="page.size"
			:total="tableTotal"
			@pagination="getTableData"
		/>

		<UserEdit ref="userEditRef" @success="getTableData" />
	</div>
</template>
