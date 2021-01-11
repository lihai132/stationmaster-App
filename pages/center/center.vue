<template>
	<view class="app-body">
		<view class="app-header" :style="{'height': titleBarHeight,'padding-top': statusBarHeight}">
			<view class="search-block">
				<view class="search-wrapper flexbox middle">
					<view class="search-icon">
						<u-icon name="search" color="#202122" size="28"></u-icon>
					</view>
					<input class="search-input flex1" v-model="name" placeholder="输入家政师的姓名"></input>
					<view class="search-btn">
						<button class="btn btn-primary" @click="search">搜索</button>
					</view>
				</view>
			</view>
			<view class="tabs-block">
				<view class="tabs-wrapper flexbox">
					<view class="tab-item flexbox middle center" @click="tabHandle(0)">
						当日订单量
						<view class="icon-box">
							<template v-if="dayNum != ''">
								<template v-if="dayNum == 'desc'">
									<image class="img arrow-up" src="../../static/icon/arrow-up.png" mode=""></image>
									<image class="img arrow-down" src="../../static/icon/arrow-down2.png" mode=""></image>
								</template>
								<template v-if="dayNum == 'asc'">
									<image class="img arrow-up" src="../../static/icon/arrow-up2.png" mode=""></image>
									<image class="img arrow-down" src="../../static/icon/arrow-down.png" mode=""></image>
								</template>
							</template>
							<template v-else>
								<image class="img arrow-up" src="../../static/icon/arrow-up.png" mode=""></image>
								<image class="img arrow-down" src="../../static/icon/arrow-down.png" mode=""></image>
							</template>
						</view>
					</view>
					<view class="tab-item flexbox middle center" @click="tabHandle(1)">
						总订单量
						<view class="icon-box">
							<template v-if="monthNum != ''">
								<template v-if="monthNum == 'desc'">
									<image class="img arrow-up" src="../../static/icon/arrow-up.png" mode=""></image>
									<image class="img arrow-down" src="../../static/icon/arrow-down2.png" mode=""></image>
								</template>
								<template v-if="monthNum == 'asc'">
									<image class="img arrow-up" src="../../static/icon/arrow-up2.png" mode=""></image>
									<image class="img arrow-down" src="../../static/icon/arrow-down.png" mode=""></image>
								</template>
							</template>
							<template v-else>
								<image class="img arrow-up" src="../../static/icon/arrow-up.png" mode=""></image>
								<image class="img arrow-down" src="../../static/icon/arrow-down.png" mode=""></image>
							</template>
						</view>
					</view>
					<view class="tab-item flexbox middle center" @click="tabHandle(2)">
						累计点赞量
						<view class="icon-box">
							<template v-if="greatNum != ''">
								<template v-if="greatNum == 'desc'">
									<image class="img arrow-up" src="../../static/icon/arrow-up.png" mode=""></image>
									<image class="img arrow-down" src="../../static/icon/arrow-down2.png" mode=""></image>
								</template>
								<template v-if="greatNum == 'asc'">
									<image class="img arrow-up" src="../../static/icon/arrow-up2.png" mode=""></image>
									<image class="img arrow-down" src="../../static/icon/arrow-down.png" mode=""></image>
								</template>
							</template>
							<template v-else>
								<image class="img arrow-up" src="../../static/icon/arrow-up.png" mode=""></image>
								<image class="img arrow-down" src="../../static/icon/arrow-down.png" mode=""></image>
							</template>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="app-content" :style="{'padding-top': titleBarHeight}">
			<view class="person-list">
				<view class="items flexbox" v-for="(item,index) in orderList" :key="index">
					<view class="person-img">
						<image class="app-img" :src="item.headimgurl" mode=""></image>
					</view>
					<view class="person-info flex1">
						<view class="personal flexbox justify">
							<view class="person-name">{{item.nanny_name}}</view>
							<view class="person-icon">
								<image class="icon-img" src="../../static/icon/icon-calendar.png" mode="widthFix" @click="gotoOrder(item)"></image>
								<image class="icon-img" src="../../static/icon/icon-mobile.png" mode="widthFix" @click="callPhone(item)"></image>
							</view>
						</view>
						<view class="personal2 flexbox">
							<view class="age">40岁</view>
							<view class="great"><text class="primary-text">{{item.star}}</text>赞</view>
						</view>
						<view class="personal3 flexbox">
							<view class="day-num">
								当日订单<text class="default-text">{{item.service_total_days}}</text>
							</view>
							<view class="month-num">
								总订单<text class="default-text">{{item.service_total}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<changeTime ref="changeTime"></changeTime>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import changeTime from "../../components/index/popup/changeTime.vue";
	import {
		nannylist
	} from '../../utils/api.js';
	import {
		getDate
	} from '../../utils/common.js';
	export default {
		data() {
			return {
				titleBarHeight: '',
				statusBarHeight: '',
				tabActice: 0,
				dayNum: '',
				monthNum: '',
				greatNum: '',
				orderList: [],
				name: ""
			}
		},

		onShow() {
			this.dayNum = 'asc';
			this.monthNum = '';
			this.greatNum = '';
			// let date=getDate()
			// console.log(date)

			let data = {
				name: "",
				orderby: 1,
				asc: 2
			}
			this.getList(data)

		},
		created() {
			const that = this;
			uni.getSystemInfo({
				success: (res) => {
					if (res.model.indexOf('iPhone') !== -1) {
						that.titleBarHeight = 88 + 'px';
					} else {
						that.titleBarHeight = 96 + 'px';
					}
					that.statusBarHeight = res.statusBarHeight + 'px'
					that.top = parseInt(that.titleBarHeight) * 2 + parseInt(that.statusBarHeight)
				}
			})
		},
		methods: {
			toPage() {
				uni.navigateTo({
					url: '../../pages/search/search?type=center'
				})
			},
			tabHandle(index) {
				this.tabActice = index;
				if (this.tabActice == index) {
					switch (index) {
						case 0:
						
						this.monthNum = '';
						this.greatNum = '';
							this.dayNum = this.dayNum == 'desc' ? 'asc' : 'desc';
							

							if (this.dayNum == 'desc') {
								let data = {
									name: "",
									orderby: 1,
									asc: 1
								}
								this.getList(data)
							} else {
								let data = {
									name: "",
									orderby: 1,
									asc: 2
								}
								this.getList(data)
							}
							break;
						case 1:
							this.dayNum = '';
							
							this.greatNum = '';
							this.monthNum = this.monthNum == 'desc' ? 'asc' : 'desc';
							console.log(this.monthNum)
							if (this.monthNum == 'desc') {
								let data = {
									name: "",
									orderby: 2,
									asc: 1
								}
								this.getList(data)
							} else {
								let data = {
									name: "",
									orderby: 2,
									asc: 2
								}
								this.getList(data)
							}
							break;
						case 2:
						this.dayNum = '';
						this.monthNum = '';
						
							this.greatNum = this.greatNum == 'desc' ? 'asc' : 'desc';
							if (this.greatNum == 'desc') {
								let data = {
									name: "",
									orderby: 3,
									asc: 1
								}
								this.getList(data)
							} else {
								let data = {
									name: "",
									orderby: 3,
									asc: 2
								}
								this.getList(data)
							}
							break;
					}
				} else {
					this.tabActice = index;
					switch (index) {
						case 0:
							this.dayNum = 'desc';
							this.monthNum = '';
							this.greatNum = '';
							break;
						case 1:
							this.dayNum = '';
							this.monthNum = 'desc';
							this.greatNum = '';
							break;
						case 2:
							this.dayNum = '';
							this.monthNum = '';
							this.greatNum = 'desc';
							break;
					}
				}
			},
			callPhone(item) {

				uni.makePhoneCall({
					phoneNumber: item.phone,
					fail(err) {}
				});
			},
			gotoOrder(item) {
				uni.setStorageSync('nanny_id', item.nanny_id)
				uni.navigateTo({
					url: '/pages/order/order?id=' + item.nanny_id
				});
			},
			getList(data) {
				nannylist(data).then(res => {
					if (res.code == 0) {
						this.orderList = res.data.list
						// console.log(this.orderList)
						this.name = ""
					} else {
						this.$refs.uToast.show({
							title: res.msg
						})
					}

				})
			},
			search() {
				let data = {
					name: this.name,
					orderby: 1,
					asc: 2
				}
				this.getList(data)
			}
		},
		components: {
			changeTime
		},
		computed: {
			chang() {
				return this.$store.state.order.change;
			},
		},
		watch: {
			chang(val) {
				if (val == true) {
					this.$refs.changeTime.open()
				}
				if (val == false) {
					this.$refs.changeTime.close()
				}

			}
		}
	}
</script>

<style lang="scss" scoped>
	.default-text {
		color: #202020;
		font-weight: bold;
	}

	.primary-text {
		color: #ff8666;
	}

	.app-header {
		top: 0;
		position: fixed;
		width: 100%;
		left: 0;
		background-color: #fff;
		z-index: 11;

		// ����
		.search-block {
			background-color: #fff;
			padding: 8upx 30upx;
			box-sizing: border-box;
			z-index: 11;

			.search-wrapper {
				width: 100%;
				height: 72upx;
				border-radius: 36upx;
				background-color: #f6f8f8;

				.search-icon {
					padding: 0 24upx;
				}

				.search-input {
					font-size: 28upx;
					color: #999;
				}

				.search-btn {
					margin-right: 6upx;

					.btn {
						padding: 16upx 26upx;
						border-radius: 30upx;
						font-size: 28upx;
					}
				}
			}
		}

		// tabs
		.tabs-block {
			.tabs-wrapper {
				height: 86upx;
				text-align: center;
				border-bottom: 2upx solid #ededed;
				background-color: #fff;

				.tab-item {
					width: 248upx;
					color: #202020;
					font-size: 28upx;

					.icon-box {
						width: 14upx;
						margin-left: 8rpx;
						position: relative;

						.img {
							width: 14upx;
							height: 8upx;
						}

						.arrow-up {
							position: absolute;
							top: -8upx;
						}

						.arrow-down {
							position: absolute;
							bottom: -12upx;
						}
					}
				}

				.tab-item:nth-child(2) {
					border-left: 2upx solid #ededed;
					border-right: 2upx solid #ededed;
					width: 248upx;
					height: 64upx;
					line-height: 64upx;
					margin: 12upx 0;
				}
			}
		}
	}

	.app-content {
		height: calc(100% - 176upx);

		.person-list {
			.items {
				padding-top: 32upx;
				padding-bottom: 30upx;
				margin: 0 40upx;

				.person-img {
					margin-right: 30upx;

					.app-img {
						width: 210upx;
						min-width: 210upx;
						height: 210upx;
						background-color: #ededed;
						border-radius: 12upx;
					}
				}

				.person-info {
					.personal {
						.person-name {
							color: #202020;
							font-size: 36upx;
							height: 50upx;
							line-height: 50upx;
							margin-top: 24upx;
						}

						.icon-img {
							width: 84upx;
							height: 84upx;
							margin-left: 28upx;
						}
					}

					.personal2 {
						font-size: 26upx;
						color: #666;
						height: 36upx;
						line-height: 36upx;

						.age {
							margin-right: 20upx;
						}
					}

					.personal3 {
						font-size: 26upx;
						color: #666;
						height: 40upx;
						line-height: 40upx;
						margin-top: 24upx;

						.day-num {
							margin-right: 20upx;
						}
					}
				}
			}

			.items:not(:first-child) {
				border-top: 1px solid #EDEDED;
			}
		}

		//#ifdef APP-PLUS
		.person-list {
			padding-top: 32upx;
		}

		//#endif
		//#ifdef H5
		.person-list {
			padding-bottom: 100upx;
		}

		//#endif
	}
</style>
