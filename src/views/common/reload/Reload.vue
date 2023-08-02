<template></template>

<script lang="ts">
// 用来刷新路由
export default {
	beforeRouteEnter(to, from, next) {
		next((vm) => {
			vm.$router.replace(from)
		})
	},
}
</script>
