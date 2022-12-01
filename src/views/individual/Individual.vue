<script lang="ts" setup>
import { ref } from 'vue'
import { IUser } from '@/model/common'
import BaseInfo from './components/BaseInfo.vue'

const formRef = ref()
const formData = ref()
</script>

<template>
	<BaseTitle>基本信息</BaseTitle>
	<BaseInfo></BaseInfo>
</template>

<style lang="less" scoped></style>
