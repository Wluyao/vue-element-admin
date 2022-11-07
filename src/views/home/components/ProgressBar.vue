<script lang="ts" setup></script>

<template>
	<el-card>
		<template #header>
			<div class="flex items-center">
				<span class="f16 mr-auto">待办事项</span>
			</div>
		</template>

		<div>
			<p>项目一</p>
			<el-progress :percentage="10" color="#409eff"></el-progress>
		</div>
		<div>
			<p>项目二</p>
			<el-progress :percentage="70"></el-progress>
		</div>
		<div>
			<p>项目三</p>
			<el-progress :percentage="80" color="#8e71c7"></el-progress>
		</div>
		<div>
			<p>项目四</p>
			<el-progress :percentage="100" status="success"></el-progress>
		</div>
	</el-card>
</template>
