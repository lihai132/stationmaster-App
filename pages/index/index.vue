<template>
	<view class="app-body">
		<view class="app-header" :style="{'height': titleBarHeight,'padding-top': statusBarHeight}">
			<view class="search-block">
				<view class="search-wrapper flexbox middle">
					<view class="search-icon">
						<u-icon name="search" color="#202122" size="28"></u-icon>
					</view>
					<input class="search-input flex1" placeholder="输入家政师或雇主的姓名" v-model="name"></input>
					<view class="search-btn">
						<button class="btn btn-primary" @click="search">搜索</button>
					</view>
				</view>
			</view>
			<u-tabs :list="list" active-color="#FF8666" :is-scroll="false" :current="current" @change="change" style="border-bottom: 1px solid #F6F6F6;"></u-tabs>
			<dropdown :top="top" :menuList="dropdownMenu" @menuStatus="menuStatus" @menuDate="menuDate"></dropdown>
		</view>
		<view class="app-content" v-if="showBox1" :style="{'padding-top': titleBarHeight}">
			<view class="order-block">
				<view class="order-box">
					<view class="order-list" v-if="showList">
						<view class="order-list-item" v-for="(item,index) in indexList" :key="index">
							<view class="jsa-wrapper">
								<view class="jsa-header flexbox middle">
									<view class="sign orange" :class="item.typeClass">{{item.type}}</view>
									<view class="subtitle flex1">{{item.goods_name}}</view>
									<view class="status" :class="item.statusClass">{{item.statusType}}</view>
								</view>
								<view class="jsa-timer">{{item.service_time}}{{item.weekText}} {{item.part_time}}</view>
								<view class="jsa-address">{{item.address}}</view>
								<view class="jsa-tablist">
									<view class="jsa-collapse-item">
										<view class="jsa-collapse-head flexbox middle justify" @click="showTimer = !showTimer">
											<view class="head-left">服务时间</view>
											<view class="head-right flexbox middle">
												<text :class="item.service_status==2?'error':'success'">{{item.service_status==2?'异常':'正常'}}</text>
												<u-icon class="arrow-down" name="arrow-down" color="#999" size="18" :style="{transform: showTimer == true ? 'rotate(180deg)' : 'rotate(0)' }"></u-icon>
											</view>
										</view>
										<view class="jsa-collapse-wrap" v-show="showTimer">
											<view class="jsa-collapse-contant">
												<view class="items flexbox justify">
													<text>服务开始时间</text>
													<text :class="item.service_status==2?'error':'success'">{{item.startTime}}</text>
												</view>
												<view class="items flexbox justify">
													<text>服务完成时间</text>
													<text :class="item.service_status==2?'error':'success'">{{item.endTime}}</text>
												</view>
												<view class="items flexbox justify">
													<text>服务总共时长</text>
													<text class="default">{{item.duration}}</text>
												</view>
											</view>
										</view>
									</view>
									<view class="jsa-collapse-item">
										<view class="jsa-collapse-head flexbox middle justify" @click="showAddr = !showAddr">
											<view class="head-left">服务地址</view>
											<view class="head-right flexbox middle">
												<text :class="item.service_status==1?'error':'success'">{{item.service_status==1?'异常':'正常'}}</text>
												<u-icon class="arrow-down" name="arrow-down" color="#999" size="18" :style="{transform: showAddr == true ? 'rotate(180deg)' : 'rotate(0)' }"></u-icon>
											</view>
										</view>
										<view class="jsa-collapse-wrap" v-show="showAddr">
											<view class="jsa-collapse-contant">
												<view class="items">
													<view class="default">广州市荔湾区中海花湾壹号C区C7栋905</view>
												</view>
												<view class="items flexbox right">
													<view :class="item.service_status==1?'error':'success'" style="font-size: 28upx;">{{item.service_status==1?'相差大于500m':'相差小于500m'}}</view>
												</view>
											</view>
										</view>
									</view>
								</view>
								<view class="jsa-phone flexbox justify">
									<view class="jsa-phone-item">
										<view class="name">雇主</view>
										<view class="msgBox flexbox middle justify">
											<text class="default">{{item.name}}</text>
											<image class="jsa-img" src="../../static/icon/icon-phone.png" mode="widthFix" @click="callEmployer(item.phone)"></image>
										</view>
									</view>
									<view class="jsa-phone-item">
										<view class="name">家政师</view>
										<view class="msgBox flexbox middle justify">
											<text class="default">{{item.nanny_name}}</text>
											<image class="jsa-img" src="../../static/icon/icon-phone.png" mode="widthFix" @click="callNanny(item.nanny_phone)"></image>
										</view>
									</view>
								</view>
								<view class="jsa-btn flexbox right">
									<button class="btn" @click="toFeedback(item.service_id)">查看反馈</button>
								</view>
							</view>
						</view>
					</view>
					<view class="visit-list" v-if="!showList">
						<view class="order-list-item" v-for="(item,index) in indexList" :key="index">
							<view class="jsa-wrapper">
								<view class="jsa-header flexbox middle">
									<view class="sign orange" :class="item.typeClass">{{item.type}}</view>
									<view class="subtitle flex1">{{item.goods_name}}</view>
									<view class="status" :class="item.statusClass">{{item.statusType}}</view>
								</view>
								<view class="jsa-timer">{{item.service_time}}周五 {{item.part_time}}</view>
								<view class="jsa-address">{{item.address}}</view>
								<view class="jsa-tablist">
									<view class="jsa-collapse-item">
										<view class="jsa-collapse-head flexbox middle justify" @click="showTimer = !showTimer">
											<view class="head-left">服务时间</view>
											<view class="head-right flexbox middle">
												<text :class="item.service_status==2?'error':'success'">{{item.service_status==2?'异常':'正常'}}</text>
												<u-icon class="arrow-down" name="arrow-down" color="#999" size="18" :style="{transform: showTimer == true ? 'rotate(180deg)' : 'rotate(0)' }"></u-icon>
											</view>
										</view>
										<view class="jsa-collapse-wrap" v-show="showTimer">
											<view class="jsa-collapse-contant">
												<view class="items flexbox justify">
													<text>服务开始时间</text>
													<text :class="item.service_status==2?'error':'success'">{{item.startTime}}</text>
												</view>
												<view class="items flexbox justify">
													<text>服务完成时间</text>
													<text :class="item.service_status==2?'error':'success'">{{item.endTime}}</text>
												</view>
												<view class="items flexbox justify">
													<text>服务总共时长</text>
													<text class="default">{{item.duration}}</text>
												</view>
											</view>
										</view>
									</view>
									<view class="jsa-collapse-item">
										<view class="jsa-collapse-head flexbox middle justify" @click="showAddr = !showAddr">
											<view class="head-left">服务地址</view>
											<view class="head-right flexbox middle">
												<text :class="item.service_status==1?'error':'success'">{{item.service_status==1?'异常':'正常'}}</text>
												<u-icon class="arrow-down" name="arrow-down" color="#999" size="18" :style="{transform: showAddr == true ? 'rotate(180deg)' : 'rotate(0)' }"></u-icon>
											</view>
										</view>
										<view class="jsa-collapse-wrap" v-show="showAddr">
											<view class="jsa-collapse-contant">
												<view class="items">
													<view class="default">广州市荔湾区中海花湾壹号C区C7栋905</view>
												</view>
												<view class="items flexbox right">
													<view :class="item.service_status==1?'error':'success'" style="font-size: 28upx;">{{item.service_status==1?'相差大于500m':'相差小于500m'}}</view>
												</view>
											</view>
										</view>
									</view>
								</view>
								<view class="jsa-phone flexbox justify">
									<view class="jsa-phone-item">
										<view class="name">雇主</view>
										<view class="msgBox flexbox middle justify">
											<text class="default">{{item.name}}</text>
											<image class="jsa-img" src="../../static/icon/icon-phone.png" mode="widthFix" @click="callEmployer(item.phone)"></image>
										</view>
									</view>
									<view class="jsa-phone-item">
										<view class="name">家政师</view>
										<view class="msgBox flexbox middle justify">
											<text class="default">{{item.nanny_name}}</text>
											<image class="jsa-img" src="../../static/icon/icon-phone.png" mode="widthFix" @click="callNanny(item.nanny_phone)"></image>
										</view>
									</view>
								</view>
								<view class="jsa-btn flexbox right">
									<button class="btn" @click="toFeedback(item.service_id)">查看反馈</button>
									<button class="btn" @click="visit(item.service_id)">完成回访</button>
								</view>
							</view>
						</view>
					</view>
					<view class="no-data"></view>
				</view>
			</view>
		</view>
		<view class="none" v-if="showBox2">
			<image class="none-src" src="../../static/index/none.png" mode=""></image>
			<view class="none-text">
				当前页面，暂无内容～
			</view>
		</view>





		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import dropdown from '../../components/dropdown/dropdown.vue';
	import changeTime from "../../components/index/popup/changeTime.vue";
	import voice from '../../utils/voice.js';
	import {
		servicelist,
		getserviceevaluate
	} from '../../utils/api.js';
	import {
		format,
		getTime
	} from '../../utils/common.js';

	//websocket参数
	var num = 3;
	var socketTask;
	//测试环境
	var wsUrl = "wss://socket.yishenjr.cn";
	//新域名
	// var wsUrl = "wss://socket.jshuan.cn";
	var heartflag = false; //心跳开关
	var openflag = false;

	export default {
		data() {
			return {
				showBox1: true,
				showBox2: false,
				showTimer: false,
				showAddr: false,
				showList: true,
				dropdownMenu: ['全部状态', '异常订单', '反馈不一致', '反馈一致', '单方反馈'],
				titleBarHeight: '',
				statusBarHeight: '',
				top: '',
				listType: 0,
				time: "",
				indexList: [],
				name: "",
				timeout: 2 * 1000, //10秒一次心跳
				timeoutObj: null, //心跳心跳倒计时
				serverTimeoutObj: null, //心跳倒计时
				timeoutnum: null, //断开 重连倒计时
				current: 0,
				list: [{
					name: '反馈'
				}, {
					name: '回访'
				}],
			}
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
		onLoad() {
			let station_id = uni.getStorageSync('station_id');
			this.websocket();
		},
		onShow() {
			// console.log(uni.getStorageSync('token'))
			this.time = format(new Date(), 'yyyy-MM-dd')
			let data = {
				service_time: this.time,
				status: this.listType,
				name: this.name
			}

			this.getServicelist(data)
			// console.log(111)
		},

		methods: {
			//类型
			menuStatus(val) {

				this.dropdownMenu.map((item, index) => {
					if (item == val) {
						this.listType = index;
					}
				})
				this.$store.commit("setType", this.listType)
				// let data = {
				// 	service_time: this.time,
				// 	status: this.listType,
				// 	name: this.name
				// }

				// this.getServicelist(data)
				// console.log(222)
			},
			//日期
			menuDate(val) {
				console.log(val)
				this.time = val;
				this.$store.commit("setTime", this.time)
				let data = {
					service_time: this.time,
					status: this.listType,
					name: this.name
				}

				this.getServicelist(data)
				console.log(333)
			},
			//去搜索页
			toPage() {
				uni.navigateTo({
					url: '../../pages/search/search?type=index'
				})
			},
			//去查看反馈页
			toFeedback(service_id) {
				uni.navigateTo({
					url: '../../pages/feedback/feedback?service_id=' + service_id
				})
			},
			//打电话给雇主
			callEmployer(phone) {
				uni.makePhoneCall({
					phoneNumber: phone,
					fail(err) {}
				});
			},
			//打电话给家政师..
			callNanny(phone) {
				uni.makePhoneCall({
					phoneNumber: phone,
					fail(err) {}
				});
			},
			//请求首页列表
			getServicelist(parameter) {
				servicelist(parameter).then(res => {
					if (res.code == 0) {
						this.name = ""
						console.log(res.data.list.length)
						if (res.data.list.length != 0) {

							res.data.list.map(item => {
								// console.log(item.service_status)
								item.goods_name = "保洁+整理"
								if (item.start_time != null) {
									let startArr1 = item.start_time.split(" ")
									let startArr2 = startArr1[1].split(":")
									item.startTime = startArr2[0] + ":" + startArr2[1]


								}
								if (item.end_time != null) {
									let endArr1 = item.end_time.split(" ")
									let endArr2 = endArr1[1].split(":")
									item.endTime = endArr2[0] + ":" + endArr2[1]
								}
								if (item.start_time != null && item.end_time != null) {
									item.duration = getTime(item.start_time, item.end_time)
								}


								// item.duration=item.end_time-item.start_time



								if (item.order_type == 0) {
									item.type = "体验";
									item.typeClass = "orange"
								}
								if (item.order_type == 1) {
									item.type = "包月";
									item.typeClass = "green"
								}
								if (item.status == 1) {
									item.statusType = "异常订单";
									item.statusClass = "error";

								}
								if (item.status == 2) {
									item.statusType = "反馈不一致";
									item.statusClass = "error";

								}
								if (item.status == 3) {
									item.statusType = "反馈一致";
									item.statusClass = "success";

								}
								if (item.status == 4) {
									item.statusType = "单方反馈";
									item.statusClass = "primary";
								}
								if (item.weeks == 1) {
									item.weekText = "周一"
								}
								if (item.weeks == 2) {
									item.weekText = "周二"
								}
								if (item.weeks == 3) {
									item.weekText = "周三"
								}
								if (item.weeks == 4) {
									item.weekText = "周四"
								}
								if (item.weeks == 5) {
									item.weekText = "周五"
								}
								if (item.weeks == 6) {
									item.weekText = "周六"
								}
								if (item.weeks == 7) {
									item.weekText = "周日"
								}
							})
							this.indexList = res.data.list
							this.showBox1 = true
							this.showBox2 = false
						} else {

							this.indexList = []
							this.showBox1 = false
							this.showBox2 = true
						}

					} else {
						this.$refs.uToast.show({
							title: res.msg
						})
					}

					// console.log(this.indexList)
				})
			},
			search() {
				let date = format(new Date(), 'yyyy-MM-dd')
				let data = {
					service_time: this.time,
					status: this.listType,
					name: this.name
				}

				this.getServicelist(data)
				console.log(444)
			},

			//websocket方法
			openWebsocket() {
				if (openflag == false) {
					this.websocket();
				}
			},
			close() {
				heartflag = true;
				socketTask.close()
				console.log('111')
			},
			websocket() {
				heartflag = false;
				//创建websocket
				socketTask = uni.connectSocket({
					url: wsUrl,
					success: (e) => {}
				});
				//打开websocket
				socketTask.onOpen(() => {
					console.log("开始连接")
					openflag = true;
					//通过websocket发送消息告诉后端服务器你是谁
					socketTask.send({
						data: "user_type=2&uid=" + uni.getStorageSync('nanny_id'),
						async success(res) {

						},
					})
					this.sendMsg();
				})
				//接受到websocket发送给前端的消息后进行处理
				socketTask.onMessage(data => {

					var data = JSON.parse(data.data)
					if (data) {
						num = 3;
					}
					this.handle(data)

				})
				//websocket错误提示
				socketTask.onError(function() {
					// console.log('错误');
					socketTask.onOpen()
				})

				// websocket关闭
				socketTask.onClose(() => {
					// console.log('关闭')
					if (heartflag == false) {
						this.reconnect()
					}
					openflag = false;
					socketTask.onOpen()

				});
			},
			reconnect() {
				setTimeout(() => {
					this.websocket();
				}, 3000)
			},
			heart() {
				this.sendMsg();
			},
			sendMsg() {
				if (heartflag == true) {
					return;
				}

				socketTask.send({
					data: "user_type=3&uid=" + uni.getStorageSync('station_id'),
					async success(res) {
						// this.handle(res)
						// console.log("消息发送成功");
					}
				}) //此处为心跳包
				setTimeout(() => {
					this.heart()
				}, 3000)
			},
			handle(data) {
				// console.log(data);
				if (data.code == 0) {
					// console.log(data);
					let msg = JSON.parse(data.msg)
					if (msg.opt == "change_time") {
						var timestamp = (new Date()).getTime();
						this.$store.commit("setChangeTime", timestamp)
						this.openVoice("你收到一个调整服务日期的申请，请及时处理")
					}
					if (msg.opt == "change_nanny") {
						this.openVoice("你收到一个更换家政师的申请，请及时处理")
					}
					if (msg.opt == "notice") {
						this.openVoice(msg.data.msg)
					}


				} else {
					// console.log(111)

				}

			},
			//语音播报
			openVoice(text) {
				voice(text);

			},
			change(index) {
				this.current = index;

				if (index == 0) {
					let data = {
						service_time: this.time,
						status: this.listType,
						name: this.name
					}

					this.getServicelist(data)
					this.showList = true

				}
				if (index == 1) {
					console.log(1111)
					this.showList = false
				}
			},

			visit(id) {
				console.log(id)
			}
		},
		components: {
			changeTime,
			dropdown
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

<style>
	page {
		background-color: #f8f8f8;
		height: 100%;
	}
</style>
<style lang="scss" scoped>
	// page {
	// 	background-color: #F8F8F8;
	// }
	.default {
		color: #202020
	}

	.primary {
		color: #ff8666;
	}

	.success {
		color: #40C486;
	}

	.error {
		color: #FF2020;
	}

	.app-header {
		top: 0;
		position: fixed;
		width: 100%;
		left: 0;
		background-color: #fff;
		z-index: 11;

		// 搜索
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
						margin-left: 30rpx;
					}
				}
			}
		}
	}

	.order-box {
		padding-top: 94rpx;
	}

	.app-content {
		height: calc(100% - 176upx);
	}

	.order-block {
		padding: 0 30upx;
	}

	.order-list {
		padding-bottom: 50upx;
	}

	//#ifdef H5
	.order-list,
	.visit-list {
		padding-bottom: 140upx;
	}

	//#endif
	.order-list-item {
		margin-top: 40upx;
		background-color: #fff;
		font-size: 32upx;
		color: #202020;
		border-radius: 16upx;

		.jsa-wrapper {
			width: 100%;
			padding: 0 30upx;

			.jsa-header {
				height: 98upx;
				border-bottom: 2upx solid #EDEDED;

				.sign {
					position: relative;
					width: 80upx;
					height: 46upx;
					line-height: 46upx;
					border-radius: 12upx;
					text-align: center;
					font-size: 28upx;
					color: #fff;
				}

				.orange {
					background: linear-gradient(45deg, #FFBB9F 0%, #FF8666 100%);
				}

				.orange:before {
					content: ' ';
					display: block;
					width: 0;
					height: 0;
					position: absolute;
					bottom: -10upx;
					left: 28upx;
					border-left: 12upx solid transparent;
					border-right: 12upx solid transparent;
					border-top: 12upx solid #FFA789;
				}

				.green {
					background: linear-gradient(45deg, #74DC80 0%, #32BD86 100%);
				}

				.green:before {
					content: ' ';
					display: block;
					width: 0;
					height: 0;
					position: absolute;
					bottom: -10upx;
					left: 28upx;
					border-left: 12upx solid transparent;
					border-right: 12upx solid transparent;
					border-top: 12upx solid #5ED183;
				}

				.subtitle {
					color: #202020;
					font-size: 36upx;
					margin-left: 16upx;
				}

				.status {
					height: 40upx;
					font-size: 28upx;
				}
			}

			.jsa-timer {
				margin-top: 24upx;
				margin-bottom: 24upx;
			}

			.jsa-address {
				margin-bottom: 24upx;
			}

			.jsa-tablist {
				.jsa-collapse-item {
					margin-bottom: 16upx;

					.jsa-collapse-head {
						height: 92upx;
						background-color: #F8F8F8;
						border-top-left-radius: 16upx;
						border-top-right-radius: 16upx;
						padding: 0 30upx;

						.head-left {
							color: #333333;
							font-size: 32upx;
							height: 44upx;
							line-height: 44upx;
						}

						.head-right {
							height: 40upx;
							line-height: 40upx;
							font-size: 28upx;

							.arrow-down {
								margin-left: 16upx;
								transition: all .3s;
							}
						}
					}

					.jsa-collapse-wrap {
						will-change: height;
						background-color: #f8f8f8;
						overflow: hidden;
						box-sizing: border-box;
						border-bottom-left-radius: 16upx;
						border-bottom-right-radius: 16upx;

						.jsa-collapse-contant {
							padding-top: 30upx;
							padding-left: 30upx;
							padding-right: 30upx;
							font-size: 32upx;
							color: #999;

							.items {
								padding-bottom: 24upx;
							}
						}
					}
				}
			}

			.jsa-phone {
				padding-bottom: 36upx;

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

			.jsa-btn {
				padding-bottom: 30upx;

				.btn {
					width: 192upx;
					height: 64upx;
					line-height: 64upx;
					margin-left: 30rpx;
					margin-right: 0;
					border: 2upx solid #ff8666;
					border-radius: 32upx;
					color: #ff8666;
					font-size: 28upx;
				}
			}
		}
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
</style>
