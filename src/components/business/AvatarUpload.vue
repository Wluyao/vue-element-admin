<script lang="ts" setup>
import { ref, computed } from 'vue'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import apis from '@/apis'
import { blobToBase64, base64toBlob } from '@/utils/file'

interface IProps {
	// 图片URL地址
	modelValue?: string
	// 图片是否为圆形
	round?: boolean
	// 图片宽度,单位px
	width?: number
}

const props = withDefaults(defineProps<IProps>(), {
	round: true,
	width: 100,
})

const emits = defineEmits(['update:modelValue', 'change'])

const imageRef = ref()
const dialogVisible = ref(false)
const confirmLoading = ref(false)
const sourceImage = ref('')
const myCropper = ref<Cropper>({} as Cropper)

const style = computed(() => ({
	backgroundImage: `url(${props.modelValue || ''})`,
	width: props.width + 'px',
	height: props.width + 'px',
	borderRadius: props.round ? '50% ' : '8px',
}))

// 选择图片
const handleChangeImage = (data) => {
	const file = data.raw
	const limit = file.size / 1024 / 1024 < 2
	if (!limit) {
		window.$message.warning('上传的图片大小不能超过2MB!')
	}
	if (limit) {
		blobToBase64(file).then((res) => {
			sourceImage.value = res
			dialogVisible.value = true
		})
	}
}

//模态窗打开之后确认裁剪区域
const handleOpened = () => {
	myCropper.value = new Cropper(imageRef.value, {
		viewMode: 1,
		dragMode: 'none',
		initialAspectRatio: 1,
		aspectRatio: 1,
		preview: '.preview',
		background: true,
		autoCropArea: 1,
		zoomOnWheel: false,
	})
}

const handleClose = () => {
	dialogVisible.value = false
}

// 上传图片
const handleConfirm = () => {
	const cropImage = myCropper.value
		.getCroppedCanvas({
			imageSmoothingQuality: 'high',
		})
		.toDataURL()
	confirmLoading.value = true
	const formData = new FormData()
	formData.append('file', base64toBlob(cropImage))
	apis.common
		.uploadImage(formData)
		.then((res) => {
			emits('update:modelValue', res.imgUrl)
			emits('change', res.imgUrl)
			handleClose()
		})
		.catch((err) => {
			console.error(err)
		})
		.finally(() => {
			confirmLoading.value = false
		})
}
</script>

<template>
	<div>
		<el-upload
			class="avatar-upload"
			:style="style"
			action="/"
			accept=".png,.jpg"
			:show-file-list="false"
			:auto-upload="false"
			:on-change="handleChangeImage"
		>
			<BaseIcon v-if="!modelValue" color="#dcdcdc" :size="34"> <IconCustomPlus /> </BaseIcon>
		</el-upload>

		<BaseDialog
			title="图片裁剪"
			:visible="dialogVisible"
			width="500px"
			:confirm-loading="confirmLoading"
			@confirm="handleConfirm"
			@close="handleClose"
			@opened="handleOpened"
		>
			<div>
				<div class="flex">
					<div class="img-wrap">
						<img ref="imageRef" :src="sourceImage" />
					</div>

					<div class="ml-5">
						<div class="preview"></div>
						<div class="text-center mt-4">预览</div>
					</div>
				</div>
			</div>
		</BaseDialog>
	</div>
</template>

<style lang="less" scoped>
.avatar-upload {
	box-sizing: border-box;
	background-position: center;
	background-size: cover;
	background-repeat: no-repeat;
	background-color: #fcfcfc;
	border: 1px solid #dcdcdc;
	cursor: pointer;

	&:hover {
		border-color: @info9;
	}

	&--round {
		border-radius: 50%;
	}
}

.img-wrap {
	height: 320px;
	overflow: hidden;
}

.preview {
	width: 100px;
	height: 100px;
	overflow: hidden;
}

:deep(.el-upload) {
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
