<template>
	<div class="article-list">
		<div class="article-list__header">
			<div class="title">
				<section-title name="文章列表" />
			</div>

			<div class="operation">
				<el-button type="primary" icon="el-icon-plus" @click="handleAdd">新增文章</el-button>
				<el-button type="danger" icon="el-icon-minus" @click="handleDelete">批量删除</el-button>
				<el-button icon="el-icon-download" :loading="exportLoading" @click="handleExport">导出表格</el-button>
			</div>
		</div>

		<el-form :inline="true" :model="query">
			<el-form-item label="标题:">
				<el-input v-model="query.name" placeholder="请输入文章标题关键字" clearable></el-input>
			</el-form-item>
			<el-form-item label="作者:">
				<el-select
					v-model="query.author"
					placeholder="请输入作者姓名关键字"
					filterable
					remote
					:remote-method="getRemoteUserList"
					default-first-option
					:loading="userLoading"
				>
					<el-option v-for="(item, index) in userListOptions" :key="item + index" :label="item" :value="item" />
				</el-select>
			</el-form-item>
			<el-form-item label="类型:">
				<el-select v-model="query.type" placeholder="请选择文章类型" filterable multiple clearable>
					<el-option v-for="item in tableMng.getTable('article')" :key="item.id" :label="item.name" :value="item.id" />
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" icon="el-icon-search" @click="getArticleList"> 查询 </el-button>
			</el-form-item>
		</el-form>

		<div class="article-list__table">
			<el-table
				:data="articleList"
				border
				highlight-current-row
				v-loading="articleTableLoading"
				@selection-change="handleSelectedRows"
			>
				<el-table-column type="selection" width="50"></el-table-column>
				<el-table-column prop="index" label="序号" width="80px"></el-table-column>
				<el-table-column prop="name" label="标题"></el-table-column>
				<el-table-column prop="author" label="作者" width="120px"></el-table-column>
				<el-table-column prop="type" label="类型" width="120px">
					<template slot-scope="scope">
						<span>{{ tableMng.getNameById('article', scope.row.type) }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="browseNum" label="阅读数" sortable width="100px"></el-table-column>
				<el-table-column prop="createDate" label="创建时间" sortable width="180px"></el-table-column>
				<el-table-column label="操作" width="120px">
					<template slot-scope="scope">
						<router-link :to="`/article/edit/${scope.row.id}/${scope.row.index}`">
							<el-button type="text">编辑</el-button>
						</router-link>
						<el-divider direction="vertical"></el-divider>
						<el-button type="text" @click="handleDelete(scope.$index, scope.row)"> 删除 </el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>

		<pagination
			:total="total"
			:page-number.sync="query.pageNumber"
			:page-size.sync="query.pageSize"
			@pagination="getArticleList"
		></pagination>
	</div>
</template>

<script>
/**
 * 文章管理
 */
import api from '@/api'
import { scroll } from '@/utils/core'
import tableMng from '@/utils/tableMng'
import { exportExcel } from '@/utils/excle'

export default {
	name: 'ArticleList',
	data() {
		return {
			tableMng,
			userListOptions: [],
			userLoading: false,
			articleList: [],
			articleTableLoading: false,
			query: {
				name: '',
				author: '',
				type: [],
				pageNumber: 1,
				pageSize: 20,
			},
			total: 0,
			selectedRows: [],
			exportLoading: false,
		}
	},
	created() {
		this.getArticleList()
	},
	methods: {
		// 获取文章列表
		async getArticleList() {
			this.articleTableLoading = true
			const data = await api.article.getList({
				...this.query,
				type: this.query.type.toString(),
			})
			this.articleList = data.list.map((item, index) => {
				return {
					...item,
					index: (this.query.pageNumber - 1) * this.query.pageSize + index + 1,
				}
			})
			this.total = data.total
			this.articleTableLoading = false
			const scrollElement = document.querySelector('.inner-layout__page')
			scroll(scrollElement, 0, 800)
		},
		// 跳转到新建文章页面
		handleAdd() {
			this.$router.push('/article/add')
		},
		// 删除
		handleDelete(index, row) {
			let id = []
			let name = []
			if (row) {
				id = [row.id]
				name = [row.name]
			} else {
				id = this.selectedRows.map(row => row.id)
				name = this.selectedRows.map(row => row.name)
			}
			if (name.length === 0) {
				this.$message.warning('请选择要删除的文章！')
			} else {
				this.$confirm(`确定删除文章：“${name.join('，')}”？`, '提示', {
					type: 'warning',
				})
					.then(async () => {
						await api.article.remove({ id })
						this.$message.success('删除成功！')
						this.getArticleList()
					})
					.catch(() => {})
			}
		},
		// 多选
		handleSelectedRows(rows) {
			this.selectedRows = rows
		},
		async getRemoteUserList(keyword) {
			this.userLoading = true
			const data = await api.user.getList({ name: keyword })
			this.userListOptions = data.list.map(item => item.name)
			this.userLoading = false
		},
		// 导出文章表格
		async handleExport() {
			this.exportLoading = true
			const header = ['序号', '作者', '创建时间', '标题', '类型', '阅读数']
			const res = await api.article.getList()
			const data = res.list.map((item, index) => {
				return {
					index: (this.query.pageNumber - 1) * this.query.pageSize + index + 1,
					author: item.author,
					createDate: item.createDate,
					name: item.name,
					type: item.type,
					browseNum: item.browseNum,
				}
			})
			exportExcel(header, data, '文章数据表')
			this.exportLoading = false
		},
	},
}
</script>

<style lang="scss" scoped>
.article-list {
	min-height: 100%;
	padding: 1em;
	box-sizing: border-box;
	background-color: #fff;

	.article-list__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;

		.title,
		.operation {
			margin-bottom: 1em;
		}
	}

	.article-list__table {
		margin-bottom: 1em;
	}
}
</style>
