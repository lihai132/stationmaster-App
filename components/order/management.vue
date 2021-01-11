<template>
	<view class="Order-nav">
		<view class="OrderList" @touchmove="handletouchmove" @touchstart="handletouchstart" @touchend="handletouchend">

			<view class="OrderList-item" v-if="show" v-for="(item,index) in orderList" :key="index" @click="gotoDetails(item.service_id)">
				<view class="OrderList-item-title">
					<view class="OrderList-item-title-left">
						<view class="OrderList-item-title-left-type">
							<image class="OrderList-item-title-left-type-src" :src="item.typeSrc" mode=""></image>

						</view>
						<view class="OrderList-item-title-left-name">
							{{item.subtitle}}
						</view>
					</view>
					<view class="OrderList-item-title-right">
						{{item.statusText}}
					</view>
				</view>
				<view class="OrderList-item-line">

				</view>
				<view class="OrderList-item-time">
					{{item.part_time}}
				</view>
				<view class="OrderList-item-address">
					{{item.address}}
				</view>
				<!-- <view class="OrderList-item-orderNews">
					<view class="OrderList-item-orderNews-left">
						<view class="OrderList-item-orderNews-left-text">
							联系人
						</view>
						<view class="OrderList-item-orderNews-left-name">
							{{item.name}}
						</view>
					</view>
					<view class="OrderList-item-orderNews-right">
						<image class="OrderList-item-orderNews-right-phone" src="../../static/order/phone.png" mode="" @click.stop="callPhone(item.phone)"></image>
					</view>
				</view> -->
				
				<view class="jsa-phone flexbox justify">
					<view class="jsa-phone-item">
						<view class="name">雇主</view>
						<view class="msgBox flexbox middle justify">
							<text class="default">{{item.name}}</text>
							<image class="jsa-img" src="../../static/icon/icon-phone.png" mode="widthFix" @click="callPhone(item.phone)"></image>
						</view>
					</view>
					<view class="jsa-phone-item">
						<view class="name">家政师</view>
						<view class="msgBox flexbox middle justify">
							<text class="default">{{item.nanny_name}}</text>
							<image class="jsa-img" src="../../static/icon/phone.png" mode="widthFix" @click="callPhone(item.nanny_phone)"></image>
						</view>
					</view>
				</view>
				<view class="OrderList-item-details">
					<button class="OrderList-item-details-but" type="default" v-if="item.butText" @click="butOperation(item)">{{item.butText}}</button>
				</view>
			</view>
			<view class="listNone" v-if="!show">
				<image class="listNone-src" src="../../static/order/none.png" mode=""></image>
				<view class="listNone-text">
					此日没有订单
				</view>
			</view>
			<u-toast ref="uToast" />
		</view>
		<u-modal v-model="modalShow" :content="contentText" :show-cancel-button="true" :show-title="false" @confirm="modalConfirm" ></u-modal>
		<choice ref="choice" @refresh="refresh"></choice>
	</view>

</template>

<script>
	import {

		stationdayslist,
		changenanny
	} from '../../utils/api.js';
	import choice from '../management/choice.vue';
	export default {


		data() {
			return {
				orderList: [],
				flag: 0,
				text: '',
				lastX: 0,
				lastY: 0,
				show: false,
				tipSrc: "../../static/order/zhan.png",
				open: false,
				tipeClass: "tipe-src-open",
				listType: "",
				modalShow: false,
				contentText: '是否确定给该订单改派？',
				service_id: "",
				manaData: {}
			}
		},
		created() {
			this.listType = this.$store.state.management.listType
		},
		computed: {
			Type() {
				return this.$store.state.management.listType
			}
		},
		watch: {
			Type(val) {
				this.listType = val
				console.log("参数" + this.listType)
				this.manaData.status = this.listType
				this.getOrderList(this.manaData)
			}
		},
		components:{
			choice
		},
		methods: {
			callPhone(phone) {
				uni.makePhoneCall({
					phoneNumber: phone,
					fail(err) {}
				});
			},
			gotoDetails(service_id) {

				uni.navigateTo({
					url: '/pages/OrderDetails/OrderDetails?id=' + service_id,
				});

			},
			openCalendar(open) {
				if (open == false) {
					this.tipSrc = "../../static/order/shou.png"
					this.tipeClass = "tipe-src-collect";
					this.open = true

				}
				if (open == true) {
					this.tipSrc = "../../static/order/zhan.png"

					this.tipeClass = "tipe-src-open"
					this.open = false

				}
				this.$emit("open")

			},
			handletouchmove(event) {
				if (this.flag !== 0) {
					return;
				}
				let currentX = event.touches[0].pageX;
				let currentY = event.touches[0].pageY;
				let tx = currentX - this.lastX;
				let ty = currentY - this.lastY;
				let text = '';
				this.mindex = -1;
				//左右方向滑动
				if (Math.abs(tx) > Math.abs(ty)) {
					if (tx < 0) {
						text = '向左滑动';
						this.flag = 1;

					} else if (tx > 0) {
						text = '向右滑动';
						this.flag = 2;
					}
				}
				//上下方向滑动
				else {
					if (ty < 0) {
						text = '向上滑动';
						this.flag = 3;
						this.$emit("putAway")
						// console.log(11)
					} else if (ty > 0) {
						text = '向下滑动';
						this.flag = 4;
					}
				}

				//将当前坐标进行保存以进行下一次计算
				this.lastX = currentX;
				this.lastY = currentY;
				this.text = text;
				// console.log(this.text)
			},
			handletouchstart: function(event) {
				this.lastX = event.touches[0].pageX;
				this.lastY = event.touches[0].pageY;
			},
			handletouchend: function(event) {
				this.flag = 0;
				this.text = '没有滑动';
			},
			getOrderList(data) {
				this.manaData = data
				stationdayslist(data).then(res => {
					this.showList()
					if (res.code == 0) {
						// console.log(res.data.list)
						if (res.data.list.length == 0) {
							this.orderList = []
							this.showNone()
							// this.orderList = res.data.list
						} else {
							res.data.list.map((item) => {
								// item.goods_name = "保洁+做饭"
								if (item.status == 0) {
									
									item.statusText = "待上门"
									item.butText = "改派"

								}
								if (item.status == 1) {
									item.statusText = "服务中"
									item.butText = ""
								}
								if (item.status == 2) {
									item.statusText = "已完成"
									item.butText = "查看反馈"
								}
								if (item.status == 3) {
									item.statusText = "已改派"
									item.butText = ""
								}
								if (item.order_type == 0) {
									item.typeSrc = "../../static/index/ontrial.png"
								}
								if (item.order_type == 1) {
									item.typeSrc = "../../static/index/long.png"
								}
							})


							this.orderList = res.data.list

						}

					} else {
						this.$refs.uToast.show({
							title: res.msg,
						})
					}
				})
			},
			showNone() {
				this.show = false
			},
			showList() {
				this.show = true
			},
			//列表订单的操作
			butOperation(item) {
				if (item.status == 0) {
					// this.modalShow = true
					this.service_id = item.service_id
					this.$refs.choice.open(item.service_id)
				}
				if (item.status == 2) {
					//去查看反馈页

					uni.navigateTo({
						url: '../../pages/feedback/feedback?service_id=' + item.service_id
					})

				}
			},
			//改派的公共方法
			reassignment(data) {
				changenanny(data).then(res => {

					if (res.code == 0) {
						this.getOrderList(this.manaData)
					} else {
						this.$refs.uToast.show({
							title: res.msg,
						})
					}
				})
			},
			//点击弹框确认按钮
			modalConfirm() {
				let data = {
					service_id: this.service_id
				}
				this.reassignment(data)
			},
			//刷新列表
			refresh(){
				this.getOrderList(this.manaData)
			}
		}

	}
</script>

<style lang="scss" scoped>
	.Order-nav {
		height: 800rpx;
		padding-bottom: 220rpx;
	}

	.OrderList {
		// padding-bottom: 80upx;
		background: #F5F5F5;
		border-radius: 36upx 36upx 0upx 0upx;
		// padding-top: 36upx;


		.OrderList-tipe {

			padding-top: 10rpx;
			margin-bottom: 44upx;
			text-align: center;

			.tipe-src-open {
				width: 80rpx;
				height: 32rpx;
			}

			.tipe-src-collect {
				width: 80rpx;
				height: 12rpx;
			}

		}

		.OrderList-item {
			margin: 0upx 30upx;
			margin-bottom: 40upx;
			background-color: #fff;
			padding-bottom: 40upx;
			border-radius: 16upx;

			.OrderList-item-title {
				display: flex;
				justify-content: space-between;

				align-items: center;
				padding-bottom: 34rpx;
				height: 116upx;
				padding: 30upx;
				box-sizing: border-box;

				.OrderList-item-title-left {
					display: flex;
					align-items: center;

					.OrderList-item-title-left-type {
						margin-right: 20upx;
						margin-top: 20upx;

						.OrderList-item-title-left-type-src {
							width: 80upx;
							height: 48upx;

						}
					}

					.OrderList-item-title-left-name {
						font-size: 40upx;
						font-weight: 500;
						color: #202020;
						line-height: 56upx;
					}

				}

				.OrderList-item-title-right {
					font-size: 32upx;
					font-weight: 400;

					color: #FF8666;


				}
			}

			.OrderList-item-line {
				width: 630upx;
				height: 2upx;
				background: #EDEDED;
				margin: auto;

			}

			.OrderList-item-time {
				margin-top: 30upx;
				font-size: 40upx;
				font-weight: 500;
				color: #FF8666;
				line-height: 56upx;
				padding-left: 30upx;
				padding-bottom: 22upx;
			}

			.OrderList-item-address {
				padding-left: 30upx;
				padding-right: 30upx;
				font-size: 40upx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #202020;
				line-height: 56upx;
				padding-bottom: 26upx;
			}

			.OrderList-item-orderNews {
				width: 630upx;
				height: 152upx;
				background: #F5F5F5;
				border-radius: 12upx;
				margin: auto;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding-left: 40upx;
				padding-right: 40upx;

				.OrderList-item-orderNews-left {
					display: flex;
					align-items: center;

					.OrderList-item-orderNews-left-text {
						font-size: 32upx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #999999;
						margin-right: 24upx;
					}

					.OrderList-item-orderNews-left-name {

						font-size: 40upx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #202020;

					}
				}

				.OrderList-item-orderNews-right {
					.OrderList-item-orderNews-right-phone {
						width: 72upx;
						height: 72upx;
					}
				}
			}

			.OrderList-item-details {
				margin-top: 36upx;
				position: relative;
				height: 70upx;

				.OrderList-item-details-but {
					width: 192upx;
					height: 70upx;
					border-radius: 35upx;
					border: 2upx solid #FF8666;
					font-size: 32upx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #FF8666;
					line-height: 70upx;
					background-color: #fff;
					position: absolute;
					top: 0;
					right: 30upx;

				}
			}

		}

		.listNone {
			text-align: center;
			margin-top: 80rpx;

			.listNone-src {
				width: 360rpx;
				height: 208rpx;
			}

			.listNone-text {

				font-size: 28rpx;

				font-weight: 400;
				color: #666666;
				line-height: 40rpx;
				margin-top: 30rpx;
			}
		}
	}
	.jsa-phone {
		padding-bottom: 36upx;
		padding-left: 30rpx;
		padding-right: 30rpx;
	
		.jsa-phone-item {
			width: 310upx;
			border-radius: 16upx;
			background-color: #f8f8f8;
	
			.name {
				width: 100upx;
				height: 32upx;
				line-height: 32upx;
				background: #ebebeb;
				color: #666;
				font-size: 20upx;
				text-align: center;
				border-top-left-radius: 16upx;
			}
	
			.msgBox {
				padding: 10upx 30upx 30upx;
	
				.jsa-img {
					width: 64upx;
					height: 64upx;
				}
			}
		}
	}
	
</style>
