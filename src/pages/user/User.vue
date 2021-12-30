<template>
	<div class="user-manager">
		<div class="user-manager__header">
			<div class="title">
				<section-title name="用户列表" />
			</div>
			<div class="operation">
				<el-button type="primary" icon="el-icon-plus" @click="handleEdit({})"> 新增用户 </el-button>
				<el-button type="danger" icon="el-icon-minus" @click="handleDelete({})"> 批量删除 </el-button>
				<el-button icon="el-icon-download" :loading="exportLoading" @click="handleExport">导出表格</el-button>
			</div>
		</div>

		<el-form ref="queryForm" :inline="true" :model="query">
			<el-form-item label="姓名:">
				<el-input v-model="query.name" placeholder="请输入用户姓名关键字" clearable></el-input>
			</el-form-item>
			<el-form-item label="性别:">
				<el-select v-model="query.gender" placeholder="请选择性别" clearable>
					<el-option
						v-for="item in tableMng.getTable('gender')"
						:key="item.id"
						:label="item.name"
						:value="item.id"
					></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="角色:">
				<el-select v-model="query.roles" placeholder="请选择角色" multiple clearable>
					<el-option
						v-for="item in tableMng.getTable('role')"
						:key="item.id"
						:label="item.name"
						:value="item.id"
					></el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" icon="el-icon-search" @click="getTableData">查询</el-button>
				<el-button icon="el-icon-search" @click="handleReset">重置</el-button>
			</el-form-item>
		</el-form>

		<div class="user-manager__table">
			<el-table
				v-loading="tableLoading"
				:data="userList"
				border
				highlight-current-row
				@selection-change="handleSelectedRows"
			>
				<el-table-column type="selection" width="50px"></el-table-column>
				<el-table-column prop="index" label="序号" width="80px"></el-table-column>
				<el-table-column prop="name" label="姓名"></el-table-column>
				<el-table-column prop="mobilePhone" label="手机" width="120px"></el-table-column>
				<el-table-column
					prop="gender"
					label="性别"
					width="120px"
					:filters="tableMng.formatTable('gender', 'value', 'text')"
					:filter-method="handleFilterGender"
				>
					<template slot-scope="scope">
						<span>{{ tableMng.getNameById('gender', scope.row.gender) }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="roles" label="角色">
					<template slot-scope="scope">
						{{ tableMng.getNamesByIds('role', scope.row.roles) }}
					</template>
				</el-table-column>
				<!--TODO 后端排序 -->
				<el-table-column prop="createDate" label="创建时间" sortable> </el-table-column>
				<el-table-column prop="consume" label="累计消费额(元)" width="160px" sortable></el-table-column>
				<el-table-column label="操作" width="120px">
					<template slot-scope="scope">
						<el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
						<el-divider direction="vertical"></el-divider>
						<el-button type="text" @click="handleDelete(scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>

		<pagination
			:total="total"
			:page-number.sync="query.pageNumber"
			:page-size.sync="query.pageSize"
			@pagination="getTableData"
		></pagination>

		<user-edit ref="userEdit" @success="getTableData"></user-edit>
	</div>
</template>

<script>
/**
 * 用户管理
 */
import _ from 'lodash'
import { scroll } from '@/utils/core'
import tableMng from '@/utils/tableMng'
import { exportExcel } from '@/utils/excle'
import UserEdit from './components/UserEdit'

const defaultQuery = {
	name: '',
	gender: '',
	roles: [],
	pageNumber: 1,
	pageSize: 20,
}

export default {
	name: 'User',
	components: {
		UserEdit,
	},
	data() {
		return {
			tableMng,
			userList: [],
			query: _.cloneDeep(defaultQuery),
			total: 0,
			selectedRows: [],
			tableLoading: false,
			exportLoading: false,
		}
	},
	created() {
		this.getTableData()
	},
	methods: {
		//获取用户列表
		async getTableData() {
			this.tableLoading = true
			const data = await this.$api.user.getList(this.query)
			this.userList = data.list.map((item, index) => {
				return {
					...item,
					index: (this.query.pageNumber - 1) * this.query.pageSize + index + 1,
				}
			})
			this.total = data.total
			this.tableLoading = false
			const scrollElement = document.querySelector('.inner-layout__page')
			scroll(scrollElement, 0, 800)
		},
		// 重置查询
		handleReset() {
			this.query = _.cloneDeep(defaultQuery)
			this.getTableData()
		},
		// 编辑/新增
		handleEdit(row) {
			this.$refs.userEdit.open(row)
		},
		// 删除
		handleDelete(row) {
			let ids = []
			let names = []
			if (row.id) {
				ids = [row.id]
				names = [row.name]
			} else {
				ids = this.selectedRows.map(row => row.id)
				names = this.selectedRows.map(row => row.name)
			}
			if (names.length === 0) {
				this.$message.warning('请选择要删除的用户！')
			} else {
				this.$confirm(`确定删除用户：“${names.join('，')}”？`, '提示', {
					type: 'warning',
				})
					.then(async () => {
						await this.$api.user.remove({ id: ids })
						this.$message.success('删除成功！')
						this.getTableData()
					})
					.catch(() => {})
			}
		},
		// 多选
		handleSelectedRows(rows) {
			this.selectedRows = rows
		},
		handleFilterGender(value, row, column) {
			const property = column['property']
			return row[property] === value
		},
		// 导出excel表格
		async handleExport() {
			this.exportLoading = true
			const header = ['序号', '姓名', '手机', '性别', '角色', '创建时间', '累计消费额(元)']
			const res = await this.$api.user.getList()
			const data = res.list.map((item, index) => {
				return {
					index: (this.query.pageNumber - 1) * this.query.pageSize + index + 1,
					name: item.name,
					mobilePhone: item.mobilePhone,
					gender: item.gender,
					roles: item.roles.toString(),
					createDate: item.createDate,
					consume: item.consume,
				}
			})
			exportExcel(header, data, '用户数据表')
			this.exportLoading = false
		},
	},
}
</script>

<style lang="scss" scoped>
.user-manager {
	background-color: #fff;
	padding: 1em;

	.user-manager__header {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;

		.title,
		.operation {
			margin-bottom: 1em;
		}
	}
}
</style>
