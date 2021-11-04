<template>
	<div class="header-bar">
		<i
			class="header-bar__collapse"
			:class="sideCollapse ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
			@click="handleCollapse"
		/>

		<el-tooltip effect="dark" :content="isFullScreen ? '取消全屏' : '全屏浏览'" placement="bottom">
			<i class="el-icon-rank" @click="handleTriggerFullScreen"></i>
		</el-tooltip>

		<el-dropdown @command="handleCommand">
			<img class="avatar" :src="userInfo.avatar" alt />
			<el-dropdown-menu slot="dropdown">
				<router-link to="/mine">
					<el-dropdown-item>个人中心</el-dropdown-item>
				</router-link>
				<el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>

		<i class="el-icon-setting" @click="handleOpenSetting"></i>

		<system-setting ref="systemSettingRef"></system-setting>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { resetRouter } from '@/router'
import SystemSetting from './Setting'

export default {
	components: { SystemSetting },
	data() {
		return {
			isFullScreen: false,
			avatar: '',
		}
	},
	computed: {
		...mapGetters(['sideCollapse', 'userInfo']),
	},
	methods: {
		//折叠侧边栏
		handleCollapse() {
			this.$store.commit('SET_SIDE_COLLAPSE', !this.sideCollapse)
		},
		// 全屏浏览
		handleTriggerFullScreen() {
			if (this.isFullScreen) {
				const doc = document
				const exitFullScreen =
					doc.exitFullscreen || doc.webkitCancelFullScreen || doc.mozCancelFullScreen || doc.msExitFullscreen
				if (exitFullScreen) {
					exitFullScreen.call(doc)
				}
			} else {
				const htmlDOM = document.documentElement
				const enterFullScreen =
					htmlDOM.requestFullscreen ||
					htmlDOM.webkitRequestFullScreen ||
					htmlDOM.mozRequestFullScreen ||
					htmlDOM.msRequestFullscreen
				if (enterFullScreen) {
					enterFullScreen.call(htmlDOM)
				} else {
					this.$message({
						type: 'warning',
						message: '您的浏览器不支持全屏浏览，请升级或更换浏览器！',
					})
				}
			}
			this.isFullScreen = !this.isFullScreen
		},
		// 退出登录
		async handleCommand(command) {
			if (command === 'logout') {
				await this.$store.dispatch('logout')
				resetRouter()
				this.$router.replace('/account/login')
			}
		},
		// 打开设置
		handleOpenSetting() {
			this.$refs.systemSettingRef.open()
		},
	},
}
</script>

<style lang="scss" scoped>
.header-bar {
	display: flex;
	align-content: center;
	height: 50px;
	padding: 0 20px;
	box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0, 0, 0, 0.12);
	background-color: var(--theme);

	&__collapse {
		margin-right: auto;
		color: #fff;
		font-size: 24px;
		line-height: 50px;
		cursor: pointer;

		&:hover {
			color: $black9;
		}
	}

	.el-icon-rank {
		margin-right: 10px;
		font-size: 40px;
		color: #fff;
		line-height: 50px;
		transform: rotateZ(45deg);
		cursor: pointer;
	}

	.el-dropdown {
		padding: 5px;
		height: 40px;
	}

	.avatar {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		cursor: pointer;
	}

	.el-icon-setting {
		margin-left: 10px;
		font-size: 36px;
		color: #fff;
		line-height: 50px;
		cursor: pointer;
	}
}
</style>
