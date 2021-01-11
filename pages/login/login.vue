<template>
	<view class="app-body">
		<view class="status_bar"></view>
		<view class="app-content">
			<view class="container">
				<view class="login-title">
					<view class="txt1">家舒安，</view>
					<view class="txt2">站长登录！</view>
				</view>
				<view class="app-form">
					<form>
						<view class="uni-form-item flexbox left middle">
							<view class="label">+86</view>
							<view class="input flex1">
								<input type="number" v-model.trim="phone" @input="phoneInput" @blur="phoneBlur" maxlength="11" placeholder="请输入手机号码"
								 placeholder-class="placeholder" />
							</view>
						</view>
						<view class="uni-form-item flexbox left middle">
							<view class="input flex1">
								<input type="number" v-model.trim="verify" @input="verifyInput" @blur="verifyBlur" maxlength="6" placeholder="请输入验证码"
								 placeholder-class="placeholder" />
							</view>
							<view class="btns">
								<button class="btn" :disabled="verifyDisabled" @click="sendClick" :class="[{'btn-info': sendStatus == 0},{'btn-primary': sendStatus == 1},{'is-primary': sendStatus == 2}]">{{sendText}}</button>
							</view>
						</view>
						<view class="uni-form-btn">
							<button @click="formSubmit" class="btn" :disabled="!submitStatus" :class="[{'btn-primary': submitStatus == true}, {'btn-info': submitStatus == false}]">登录</button>
						</view>
					</form>
				</view>
			</view>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import {
		login,
		smsode
	} from '../../utils/api.js';
	export default {
		data() {
			return {
				phone: '',
				login_key: "",
				verify: '',
				verifyDisabled: true,
				sendStatus: 0, // 发送验证码状态 默认0 - 原始状态，1 - 发送状态, 2 - 倒数状态
				sendText: '获取验证码',
				timer: null,
				count: 60,
				submitStatus: false
			}
		},
		onShow() {
			if (uni.getStorageSync('phone') != '') {
				this.verifyDisabled = false;
				this.sendStatus = 1
				this.phone = uni.getStorageSync('phone');
				this.login_key = uni.getStorageSync('login_key');
				if (this.login_key) {

					this.loginKey()
				}

				this.mobile = uni.getStorageSync('phone');

			}
		},
		methods: {
			phoneInput(e) {
				if (e.detail.value.length >= 11) {
					this.sendStatus = 1
				}
			},
			phoneBlur(e) {
				let phone = e.detail.value;
				if (e.detail.value == '') {
					this.$refs.uToast.show({
						title: '请输入手机号码'
					})
					this.verifyDisabled = true;
					this.sendStatus = 0
					return;
				}

				if (!(/^1[3456789]\d{9}$/.test(phone))) {
					this.$refs.uToast.show({
						title: '手机号格式不正确'
					})
					this.verifyDisabled = true;
					this.sendStatus = 0
					return
				} else {
					this.verifyDisabled = false;
				}
			},
			sendClick() {
				
				if (this.phone == '') {
					this.$refs.uToast.show({
						title: '请输入手机号',
					})
				} else {
					uni.showLoading({
						title: ''
					});
					smsode({
						phone: this.phone
					}).then(res => {
						if (res.code == 0) {
							this.sendStatus = 2;
							this.verifyDisabled = true;
							this.timer = setInterval(() => {
								this.count--;
								this.sendText = this.count < 10 ? '0' + this.count + 's' : this.count + 's';
								if (this.count <= 0) {
									clearInterval(this.timer);
									this.sendText = '重新发送';
									this.sendStatus = 1;
									this.count = 60;
									this.timer = null;
									this.verifyDisabled = false;
								}
							}, 1000)
							uni.hideLoading()
						} else {
							if (res.msg) {
								this.$refs.uToast.show({
									title: res.msg
								})
								uni.hideLoading()
							} else {
								this.$refs.uToast.show({
									title: '请联系技术人员'
								})
								uni.hideLoading()
							}
						}
					})

				}
			},
			verifyInput(e) {
				if (e.detail.value.length == 4 && this.phone.length >= 11) {
					this.submitStatus = true;
				}
			},
			verifyBlur(e) {
				if (e.detail.value == '') {
					this.$refs.uToast.show({
						title: '请输入验证码'
					})
				}
			},
			formSubmit() {
				if (this.phone == '') {
					this.$refs.uToast.show({
						title: '请输入手机号码'
					})
				} else if (this.verify == '') {
					this.$refs.uToast.show({
						title: '请输入验证码'
					})
				} else {
					login({
						phone: this.phone,
						code: this.verify
					}).then(res => {
						if (res.code == 0) {
							uni.setStorageSync('phone', this.phone);
							uni.setStorageSync('token', res.data.token);
							uni.setStorageSync('login_key', res.data.login_key);
							uni.setStorageSync('station_id', res.data.station_id);
							uni.switchTab({
								url: '/pages/index/index'
							});
						} else {
							this.$refs.uToast.show({
								title: res.msg
							})
						}


					})

				}
			},
			// 手机号码login_key登录
			loginKey() {
				login({
					phone: this.phone,
					code: "",
					login_key: this.login_key
				}).then(res => {
					// console.log(res)
					if (res.code == 0) {
						uni.setStorageSync('token', res.data.token);
						uni.setStorageSync('phone', res.data.phone);
						uni.setStorageSync('login_key', res.data.login_key);
						uni.setStorageSync('nanny_id', res.data.nanny_id);
						if (res.data.jump) {
							uni.redirectTo({
								url: '../steps/step1'
							})
						} else {
							uni.switchTab({
								url: '../index/index'
							})
						}
						return;
					} else {
						this.$refs.uToast.show({
							title: res.msg
						})
						return;
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		padding: 0 60upx;
	}

	.login-title {
		margin-top: 152upx;
		color: #333;
		font-size: 52upx;
		line-height: 74upx;
		font-weight: bold;
	}

	.app-form {
		margin-top: 126upx;

		.uni-form-item {
			padding: 28upx 0;
			margin-bottom: 40upx;
			border-bottom: 2upx solid #ededed;

			.label {
				color: #333;
				font-size: 32upx;
				height: 44upx;
				line-height: 44upx;
				margin-right: 44upx;
			}

			.input input {
				width: 100%;
				font-size: 32upx;
				color: #333;
			}

			.input .placeholder {
				color: #aaa;
			}

			.btns {
				.btn {
					font-size: 24upx;
					width: 198upx;
					height: 64upx;
					line-height: 64upx;
					text-align: center;
					border-radius: 32upx;
				}
			}
		}

		.uni-form-btn {
			padding-top: 40upx;

			.btn {
				height: 96upx;
				line-height: 96upx;
				border-radius: 48upx;
				font-size: 32upx;
			}
		}
	}
</style>
