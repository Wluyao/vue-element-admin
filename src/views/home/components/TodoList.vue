<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { ITask } from '@/model/home'
import apis from '@/apis'

const formRef = ref()
const editVisible = ref(false)
const tableLoading = ref(false)
const confirmLoading = ref(false)
const taskList = ref<ITask[]>([])
const taskDetail = ref<ITask>({} as ITask)

const formRules = {
	content: [
		{
			required: true,
			message: '请输入任务内容',
		},
	],
}

onMounted(() => {
	getTaskList()
})

const getTaskList = async () => {
	tableLoading.value = true
	const data = await apis.home.getTaskList()
	tableLoading.value = false
	taskList.value = data
}

// 删除任务
const handleDelete = async (row: ITask) => {
	await apis.home.deleteTask(row.id)
	window.$message.success('删除成功')
	getTaskList()
}

// 完成任务
const handleChangeStatus = async (row: ITask, status) => {
	await apis.home.finishTask({
		id: row.id,
		status,
	})
	window.$message.success(status ? '任务已完成' : '任务已打开')
	getTaskList()
}

const handleEdit = (row?: ITask) => {
	editVisible.value = true
	if (row) {
		taskDetail.value = row
	}
}

const handleConfirm = () => {
	formRef.value.validate(async (valid) => {
		if (!valid) return
		if (taskDetail.value.id) {
			await apis.home.addTask(taskDetail.value)
			window.$message.success('任务添加成功')
		} else {
			await apis.home.editTask(taskDetail.value)
			window.$message.success('任务编辑成功')
		}
		handleClose()
		getTaskList()
	})
}

const handleClose = () => {
	editVisible.value = false
	taskDetail.value = {} as ITask
	formRef.value.resetFields()
}
</script>

<template>
	<el-card>
		<template #header>
			<div class="flex items-center">
				<span class="f16 mr-auto">待办事项</span>
				<el-button type="primary" link @click="handleEdit()">添加</el-button>
			</div>
		</template>

		<el-table v-loading="tableLoading" :data="taskList" height="400">
			<el-table-column width="50">
				<template #default="{ row }">
					<el-checkbox v-model="row.status" @change="(value) => handleChangeStatus(row, value)"></el-checkbox>
				</template>
			</el-table-column>

			<el-table-column>
				<template #default="{ row }">
					<span :class="{ delete: row.status }">{{ row.content }}</span>
				</template>
			</el-table-column>

			<el-table-column :width="120">
				<template #default="{ row }">
					<el-button type="primary" link @click="handleEdit(row)">编辑</el-button>
					<el-divider direction="vertical"></el-divider>
					<el-popconfirm title="确认删除该条任务吗?" @confirm="handleDelete(row)">
						<template #reference>
							<el-button type="danger" link>删除</el-button>
						</template>
					</el-popconfirm>
				</template>
			</el-table-column>
		</el-table>
	</el-card>

	<BaseDialog
		:title="taskDetail.id ? '编辑任务' : '添加任务'"
		:visible="editVisible"
		:confirm-loading="confirmLoading"
		@confirm="handleConfirm"
		@close="handleClose"
	>
		<el-form ref="formRef" :model="taskDetail" :rules="formRules">
			<el-form-item label="内容" prop="content">
				<el-input v-model="taskDetail.content" placeholder="请输入任务内容"></el-input>
			</el-form-item>
		</el-form>
	</BaseDialog>
</template>

<style lang="less" scoped>
.delete {
	text-decoration: line-through;
	color: rgba(0, 0, 0, 0.4);
}

:deep(.el-table__header-wrapper) {
	display: none;
}

:deep(.el-card__header) {
	padding: 10px 20px;
}

:deep(.el-card__body) {
	padding: 10px;
}
</style>
