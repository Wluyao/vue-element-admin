<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessageBox } from 'element-plus'

const dialogVisible = ref(false)

const handleClose = (done: () => void) => {
	ElMessageBox.confirm('Are you sure to close this dialog?')
		.then(() => {
			done()
		})
		.catch(() => {
			// catch error
		})
}
</script>

<template></template>

<style scoped lang="less"></style>
