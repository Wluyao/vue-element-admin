<script lang="ts" setup>
import { blobToBase64 } from '@/utils/file'

const pageRef = ref()
const contentRef = ref()
const hasFile = ref(false)
const fileText = ref('')

onMounted(() => {
	onDrop()
})

const onDrop = () => {
	pageRef.value.addEventListener('dragenter', (event) => {
		event.preventDefault()
	})
	pageRef.value.addEventListener('dragover', (event) => {
		event.preventDefault()
	})
	pageRef.value.addEventListener('drop', async (event) => {
		event.preventDefault()
		const data = await blobToBase64(event.dataTransfer.files[0])
		contentRef.value.insertAdjacentText('afterBegin', data)
		fileText.value = data
		hasFile.value = true
	})
}

// 复制
const handleCopy = async () => {
	try {
		await navigator.clipboard.writeText(fileText.value)
		window.$message.success('复制成功')
	} catch (err) {
		window.$message.error('复制失败')
		console.error(err)
	}
}

const handleClear = () => {
	contentRef.value.innerText = ''
	fileText.value = ''
	hasFile.value = false
}
</script>

<template>
	<div class="file-to-base64" ref="pageRef">
		<div class="flex justify-end">
			<el-button type="primary" @click="handleCopy">复制</el-button>
			<el-button type="info" @click="handleClear">清除</el-button>
		</div>

		<div class="empty" v-if="!hasFile">任意文件<br />拖到这里</div>
		<div class="content" ref="contentRef"></div>
	</div>
</template>

<style lang="less" scoped>
.file-to-base64 {
	position: relative;
	min-height: 100%;
	padding: 20px;
	background-color: #fff;

	.empty {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		font-size: 50px;
		font-family: Consolas, 'Andale Mono', 'Lucida Console', 'Lucida Sans Typewriter', Monaco, 'Courier New', monospace;
		white-space: pre;
		text-align: center;
		color: gray;
	}

	.content {
		word-break: break-all;
		font-family: Consolas, 'Andale Mono', 'Lucida Console', 'Lucida Sans Typewriter', Monaco, 'Courier New', monospace;
	}
}
</style>
