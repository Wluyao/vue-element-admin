<script lang="ts" setup>
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { enumGender } from '@/config/enum'
import { useEnumStore } from '@/store'
import { IUser } from '@/model/user'

const emit = defineEmits(['success'])

defineExpose({
  open(data?: IUser) {
    visible.value = true
    if (data) {
      detail.value.id = data.id
      getDetail()
    }
  },
})

const formRef = ref()
const visible = ref(false)
const initLoading = ref(false)
const confirmLoading = ref(false)
const detail = ref<IUser>({} as IUser)

const enumStore = useEnumStore()
const { enumRole } = storeToRefs(enumStore)

const isAdd = computed(() => !detail.value.id)

const formRule = {}

const getDetail = async () => {
  try {
    initLoading.value = true
    const data = await window.$apis.user.getUserDetail(detail.value.id)
    detail.value = {
      ...data,
      roles: data.roles.map((item) => item.id),
    }
  } catch (err) {
    console.error(err)
  } finally {
    initLoading.value = false
  }
}

const handleConfirm = async () => {
  try {
    confirmLoading.value = true
    await window.$apis.user.editUser(detail)
    window.$message.success(isAdd ? '用户编辑成功' : '用户创建成功')
    emit('success')
    handleClose()
  } catch (err) {
    console.error(err)
  } finally {
    confirmLoading.value = false
  }
}

const handleClose = () => {
  visible.value = false
  formRef.value.clearValidate()
  detail.value = {} as IUser
}
</script>

<template>
  <BaseDialog
    :title="isAdd ? '新增用户' : '编辑用户'"
    :visible="visible"
    :confirm-loading="confirmLoading"
    @confirm="handleConfirm"
    @close="handleClose"
  >
    <el-form v-loading="initLoading" ref="formRef" :model="detail" :rules="formRule">
      <el-form-item prop="username" label="账号">
        <el-input v-model="detail.name" placeholder="请输入用户账号" :disabled="!!detail.id"></el-input>
      </el-form-item>
      <el-form-item prop="name" label="姓名">
        <el-input v-model="detail.name" placeholder="请输入用户姓名"> </el-input>
      </el-form-item>
      <el-form-item prop="roles" label="角色" multiple>
        <el-select v-model="detail.roles" placeholder="请选择角色">
          <el-option v-for="item in enumRole.origin" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="gender" label="性别">
        <el-radio-group v-model="detail.gender">
          <el-radio v-for="item in enumGender.origin" :key="item.id" :label="item.id">{{ item.name }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="phone" label="手机">
        <el-input v-model="detail.phone" placeholder="请填写手机号"></el-input>
      </el-form-item>
      <el-form-item prop="email" label="邮箱">
        <el-input v-model="detail.email" placeholder="请填写邮箱地址"></el-input>
      </el-form-item>
      <el-form-item prop="remark" label="备注">
        <el-input v-model="detail.remark" type="textarea" :rows="5" placeholder="请输入备注"> </el-input>
      </el-form-item>
    </el-form>
  </BaseDialog>
</template>

<style lang="less" scoped></style>
