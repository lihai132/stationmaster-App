<template>
	<view class="choice">
		<u-popup v-model="show" mode="bottom" height="90%" :closeable="true">
			<view class="choiceBox" v-if="showBox1">
				<view class="title">
					请选择要改派的家政师：
				</view>
				<view class="nannyList">
					<view class="nannyItem" v-for="(item,index) in nannyList" :key="index" @click="select(item,index)">
						<view class="item-left">
							<view class="nanny-tx">
								<image class="txSrc" :src="item.headimgurl" mode=""></image>
							</view>
							<view class="nanny-name">
								{{item.nanny_name}}
							</view>
						</view>
						<view class="item-right">
							<image class="ischeck" :src="item.check" mode=""></image>
						</view>
					</view>
				</view>
				<button type="default" class="determine" @click="determine">确认</button>
			</view>
			<view class="none" v-if="showBox2">
				<image class="none-src" src="../../static/index/none.png" mode=""></image>
				<view class="none-text">
					当日暂无可用更换的家政师
				</view>
			</view>
		</u-popup>
		<u-toast ref="uToast" />
	</view>

</template>

<script>
	import {

		changenannylist,
		changenanny
	} from '../../utils/api.js';
	export default {
		data() {
			return {
				show: false,
				nannyList: [],
				service_id: "",
				nanny_id: "",
				showBox1: true,
				showBox2: false

			}
		},
		methods: {
			open(service_id) {
				this.show = true

				this.service_id = service_id
				let data = {
					service_id: service_id
				}
				this.getList(data)
			},
			close() {
				this.show = false
			},

			//改派时请求家政师列表
			getList(data) {
				changenannylist(data).then(res => {

					if (res.code == 0) {

						if (res.data.list.length > 0) {
							res.data.list.map(item => {
								item.disabled = false
								item.check = "../../static/order/nochoic.png"
								item.ischeck = false
							})
							this.nannyList = res.data.list
							this.showBox1 = true
							this.showBox2 = false
						} else {
							this.showBox1 = false
							this.showBox2 = true
						}

					} else {
						this.showBox1 = false
						this.showBox2 = true
						this.$refs.uToast.show({
							title: res.msg,
						})
					}

				})
			},
			//选中家政师
			select(item, index) {
				// console.log(item, this.nannyList)
				for (let i in this.nannyList) {
					if (item.nanny_name == this.nannyList[i].nanny_name) {
						this.nannyList[i].ischeck = true
						this.nannyList[i].check = "../../static/order/choic.png"
					} else {
						this.nannyList[i].ischeck = false
						this.nannyList[i].check = "../../static/order/nochoic.png"
					}
				}
				this.nanny_id = item.nanny_id


			},
			//确定改派事件
			determine() {
				let data = {
					nanny_id: this.nanny_id,
					service_id: this.service_id
				}
				changenanny(data).then(res => {
					if (res.code == 0) {
						this.close()
						this.$emit("refresh")

					} else {
						this.$refs.uToast.show({
							title: res.msg,
						})
					}
				})
			}

		}
	}
</script>

<style lang="scss" scoped>
	uni-button:after {
		border: none;
	}

	.choice {
		position: relative;

		.title {
			padding: 0 40rpx;
			font-size: 48rpx;
			font-weight: 400;
			color: #333333;
			line-height: 66rpx;
			padding-top: 152rpx;
			padding-bottom: 48rpx;
			border-bottom: 2rpx solid #E6E6E6;
		}

		.nannyItem {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 40rpx;
			border-bottom: 2rpx solid #E6E6E6;

			.item-left {
				display: flex;
				align-items: center;

				.nanny-tx {
					padding: 22rpx 0;

					.txSrc {
						width: 100rpx;
						height: 100rpx;
						border-radius: 50%;
						margin-right: 40rpx;
					}
				}

				.nanny-name {

					font-size: 36rpx;

					font-weight: 400;
					color: #333333;
					// line-height: 50px;
				}
			}

			.item-right {
				.ischeck {
					width: 36rpx;
					height: 36rpx;
				}
			}



		}

		.determine {
			width: 690rpx;
			height: 92rpx;
			background: linear-gradient(90deg, #FFBB9F 0%, #FF8666 100%);
			color: #fff;
			line-height: 88rpx;
			font-size: 32rpx;
			position: absolute;
			bottom: 130rpx;
			left: 30rpx;
		}

		.none {
			text-align: center;
			margin-top: 400rpx;

			.none-src {
				width: 360rpx;
				height: 208rpx;
			}

			.none-text {
				text-align: center;
				margin-top: 44rpx;
				font-size: 28rpx;

				font-weight: 400;
				color: #666666;
				line-height: 40rpx;
			}
		}
	}
</style>
