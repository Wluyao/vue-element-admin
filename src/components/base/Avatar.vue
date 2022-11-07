<script lang="ts" setup>
import { computed } from 'vue'
import imgAvatar from '@/assets/images/common/avatar_default.png'

interface IProps {
	size?: number
	border?: 'ignore' | 'default' | 'male' | 'female' | 'white'
	image?: string
	circle?: boolean
}

const props = withDefaults(defineProps<IProps>(), {
	size: 40,
	border: 'ignore',
	circle: true,
})

const avatarClass = computed(() => [`border-${props.border}`, `shape-${props.circle ? 'circle' : 'rect'}`])
const avatarStyle = computed(() => ({ width: props.size + 'px', height: props.size + 'px' }))
</script>

<template>
	<img class="avatar" :class="avatarClass" :style="avatarStyle" :src="image || imgAvatar" />
</template>

<style lang="less" scoped>
.avatar {
	&.shape {
		&-circle {
			border-radius: 50%;
		}

		&--rect {
			border-radius: size(4);
		}
	}

	&.border {
		&-ignore {
			border: none;
		}

		&-default {
			border: 1px solid #999;
		}

		&-male {
			border: 1px solid #3c90ff;
		}

		&-female {
			border: 1px solid #ee5b5b;
		}

		&-white {
			border: 2px solid #fff;
		}
	}
}
</style>
