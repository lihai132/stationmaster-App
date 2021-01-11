<template>
	<view class="app-body">
		<view class="app-container" v-if="show">
			<view class="feedback-wrapper">
				<view class="feedback-block flexbox justify middle">
					<view class="feedback-switch">
						<!-- <u-switch v-model="checked" @change="checkHandle" active-color="#ff8666"></u-switch>
						<view class="switch-text">隐藏相同</view> -->
					</view>
					<view class="feedback-msg flexbox">
						<view class="master">雇主的 反馈</view>
						<view class="houserkeeper">家政师的 反馈</view>
					</view>
				</view>
				<view class="question-block">
					<view class="question-title flexbox justify">
						<view class="question-left">反馈问题</view>
						<view class="question-right flexbox middle">
							<view class="item flexbox middle">
								<view class="round pink"></view>
								<text class="txt">不同</text>
							</view>
							<view class="item flexbox middle">
								<text class="round"></text>
								<text class="txt">相同</text>
							</view>
							<view class="item flexbox middle">
								<text>-</text>
								<text class="txt">无</text>
							</view>
						</view>
					</view>
					<view class="question-table">
						<view class="tr flexbox middle" v-for="(item, index) in tableList" :key="index">
							<view class="td title flex1">{{item.title}}</view>
							<template>
								<view class="td m-status" v-if="item.m_status == 0" :class="item.different==true?'different':''">-</view>
								<view class="td m-status" v-if="item.m_status == 1" :class="item.different==true?'different':''">是</view>
								<view class="td m-status" v-if="item.m_status == 2" :class="item.different==true?'different':''">否</view>
							</template>
							<template>
								<view class="td m-status" v-if="item.h_status == 0" :class="item.different==true?'different':''">-</view>
								<view class="td m-status" v-if="item.h_status == 1" :class="item.different==true?'different':''">是</view>
								<view class="td m-status" v-if="item.h_status == 2" :class="item.different==true?'different':''">是</view>
							</template>
						</view>
					</view>
				</view>
				<view class="area-block" v-if="showArea">
					<view class="title">做过的区域</view>
					<view class="area-list flexbox wrap">
						<view class="item" v-for="(item, index) in areaList" :key="index">{{item.title}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="none" v-if="!show">
			<image class="none-src" src="../../static/index/none.png" mode=""></image>
			<view class="none-text">
				当前订单，暂无反馈～
			</view>
		</view>
		<changeTime ref="changeTime"></changeTime>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import changeTime from "../../components/index/popup/changeTime.vue";
	import {
		getserviceevaluate
	} from '../../utils/api.js';
	export default {
		data() {
			return {
				checked: false,
				tableList: [{
						title: '饭菜是否摆放整齐？',
						m_status: 0,
						h_status: 1
					},
					{
						title: '有帮您清洁卫生间的马桶吗？',
						m_status: 0,
						h_status: 1
					},
					{
						title: '饭菜是否摆放整齐？',
						m_status: 0,
						h_status: 1
					},
					{
						title: '饭菜是否好吃？',
						m_status: 0,
						h_status: 1
					}
				],
				areaList: [{
					title: '厨房'
				}, {
					title: '客厅'
				}, {
					title: '餐厅'
				}],
				service_id: "",
				show: true,
				showArea:true
			}
		},
		onLoad(options) {
			this.service_id = options.service_id;
			// this.service_id =520201217000000323
		},
		onShow() {
			getserviceevaluate({
				// service_id: "520201217000000323",
				service_id: this.service_id
			}).then(res => {
				if (res.code == 0) {
					let list = res.data.list
					if(list.area.length!=0){
						this.areaList = list.area
					}else{
						this.showArea=false
					}
					
					if (list.n_problem.length != 0) {
						list.n_problem.map((item, index) => {
							this.tableList[index].title = item.title
							this.tableList[index].id = item.id
							if (item.checked == true) {
								this.tableList[index].h_status = 1
							} else {
								this.tableList[index].h_status = 2
							}
						})
					}


					if (list.u_problem.length != 0) {
						this.tableList.map((item, index) => {
							list.u_problem.map(ele => {
								if (item.id == ele.id) {
									if (ele.checked == "true") {
										item.m_status = 1
									} else {
										item.m_status = 2
									}
								}
							})

						})
					}



					if (list.n_problem.length != 0 && list.u_problem.length == 0) {
						this.tableList.map((item, index) => {
							item.m_status = 0

						})
					}
					if (list.n_problem.length == 0 && list.u_problem.length != 0) {
						list.u_problem.map((item, index) => {
							if (item.checked == true) {
								item.m_status = 1
								item.h_status = 0
							} else {
								item.m_status = 2
								item.h_status = 0
							}

						})
						this.tableList = list.u_problem
					}
					if (list.n_problem.length == 0 && list.u_problem.length == 0) {
						this.show = false
					}
					
				} else {
					this.$refs.uToast.show({
						title: res.msg
					})
				}
			})
		},
		methods: {
			checkHandle(status) {
				this.checked = status;
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
	.app-body {
		width: 750upx;
	}

	.feedback-block {
		padding: 0 30upx;
		height: 240upx;

		.feedback-switch {
			.switch-text {
				font-size: 24upx;
				margin-top: 14upx;
				color: #202020;
			}
		}

		.feedback-msg {
			font-size: 28upx;
			font-weight: 500;
			color: #1A1A1A;

			.master {
				width: 84upx;
				text-align: center;
				margin-right: 74upx;
			}

			.houserkeeper {
				width: 112upx;
				text-align: center;
			}
		}
	}

	.question-block {
		padding-bottom: 40upx;
		border-bottom: 20upx solid #f8f8f8;

		.question-title {
			padding: 0 40upx;
			margin-bottom: 24upx;

			.question-right {
				.item {
					margin-left: 28upx;

					.round {
						width: 16upx;
						height: 16upx;
						border-radius: 50%;
						background: #FFFFFF;
						border: 1px solid #E3E4E5;
					}

					.round.pink {
						background: rgba(255, 134, 102, 0.2);
						border-color: transparent;
					}

					.txt {
						color: #333333;
						font-size: 24upx;
						margin-left: 12upx;
					}
				}
			}
		}

		.question-table {
			.tr {
				height: 102upx;
				border-top: 1px solid #E3E4E5;

				.title {
					padding-left: 30upx;
				}

				.m-status {
					height: 102upx;
					line-height: 102upx;
					border-left: 1px solid #E3E4E5;
					border-right: 1px solid #E3E4E5;
					border-bottom: 1px solid #e3e4e5;
				}
			}

			.tr:last-child {
				border-bottom: 1px solid #E3E4E5;
			}

			.td:not(:first-child) {
				width: 170upx;
				text-align: center;
			}
		}
	}

	.area-block {
		padding: 0 30upx;

		.title {
			height: 40upx;
			line-height: 40upx;
			font-size: 28upx;
			color: #202020;
			font-weight: 600;
			margin-top: 40upx;
			margin-bottom: 36upx;
		}

		.area-list {
			.item {
				width: 210upx;
				height: 70upx;
				line-height: 70upx;
				background: #F2F2F4;
				border-radius: 12upx;
				color: #666;
				font-size: 28upx;
				text-align: center;
				margin-right: 30upx;
				margin-bottom: 30upx;
			}

			.item:nth-child(3n) {
				margin-right: 0;
			}
		}
	}

	.different {
		background: #FFE7E0;
	}
	.none {
		text-align: center;
		margin-top: 300rpx;
	
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
</style>
