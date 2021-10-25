<template>
	<div class="copy-directive">
		<section>
			<h3>复制文本</h3>
			<div class="copy-directive__content">
				<el-input v-model="text" placeholder="请输入要复制的内容"></el-input>
			</div>
			<el-button type="primary" @click="handleCopyText">点击复制输入框中的内容</el-button>
		</section>

		<section>
			<h3>复制元素节点</h3>
			<div>
				<div class="copy-directive__content red" ref="content" id="content">
					<p>我是红色的内容</p>
					<p style="background-color: yellow">内容111</p>
					<img src="https://picsum.photos/200/200/?random" alt="" />
					<p>我是红色的内容</p>
					<p>我是红色的内容</p>
					<p>我是红色的内容</p>
				</div>
			</div>
			<el-button type="primary" @click="handleCopyNode">点击复制红色内容</el-button>
		</section>
	</div>
</template>

<script>
export default {
	name: 'Copy',
	data() {
		return {
			text: '我input中的内容，我input中的内容，我input中的内容。',
		}
	},

	methods: {
		handleCopyText() {
			const wrap = document.createElement('p')
			wrap.innerText = this.text
			document.body.appendChild(wrap)
			this.handleCopyElem(wrap)
			document.body.removeChild(wrap)
		},
		handleCopyNode() {
			this.handleCopyElem(this.$refs.content)
		},
		handleCopyElem(elem) {
			if (!elem) {
				return this.$message.warning('没有要复制的内容')
			}
			const selection = window.getSelection()
			// 如果剪切板中已经有复制了的内容，需要清掉。
			if (selection.rangeCount > 0) {
				selection.removeAllRanges()
			}
			const range = document.createRange()
			range.selectNodeContents(elem)
			selection.addRange(range)
			const result = document.execCommand('Copy')
			// 清除选中的内容,也可以使用 window.getSelection().removeAllRanges()
			range.collapse(false)
			if (result) {
				this.$message.success('复制成功')
			} else {
				this.$message.error('复制失败')
			}
		},
	},
}
</script>

<style lang="scss" scoped>
.content {
	border: 1px solid #d9d9d9;
	padding: 1em;
	text-indent: 2em;
	margin-bottom: 1em;
}

.copy-directive {
	section {
		padding: 1em 0;
	}

	.copy-directive__content {
		padding: 1em;
		text-align: center;
		border: 1px solid #d9d9d9;
		cursor: pointer;
		margin-bottom: 1em;
	}

	.red {
		color: #f56c6c;
	}
}
</style>
