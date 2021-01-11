<template>
	<view class="app-body">
		<u-tabs :list="list" active-color="#FF8666" :is-scroll="false" :current="current" @change="change" style="border-bottom: 1px solid #F6F6F6;"></u-tabs>
		<view class="app-header" :style="{'height': titleBarHeight}">
			<dropdown v-if="showDown" :top="top" :timeType="timeType" :menuList="dropdownMenu" @menuStatus="menuStatus"
			 @menuDate="menuDate"></dropdown>
			<substitution v-if="!showDown" :top="top" :timeType="timeType" :menuList="dropdownMenu" @menuStatus="menuStatus"
			 @menuDate="menuDate"></substitution>
		</view>
		<view class="app-content" v-if="showBox1">
			<view class="apply-block">
				<!-- 请假列表 -->
				<view class="apply-list" v-if="applyShow">
					<view class="apply-list-item" v-for="(item,index) in leaveList" :key="index">
						<view class="head-wrapper flexbox middle justify">
							<view class="text1">请假申请</view>
							<view class="text2" :style="{color: item.colorText}">{{item.statusText}}</view>
						</view>
						<view class="info-wrapper flexbox middle justify">
							<view class="info-left">
								<view class="text1">提交人</view>
								<view class="text2">{{item.nanny_name}}</view>
							</view>
							<view class="info-right">
								<image class="jsa-img" src="../../static/icon/icon-phone.png" mode="widthFix" @click="callPhone(item)" />
							</view>
						</view>
						<view class="msg-wrapper">
							<view class="msg-head flexbox justify middle">
								<text class="text1">请假时长({{item.days}})天</text>
								<text class="text2" @click="gotoOrder">查看工作日历</text>
							</view>
							<view class="msg-steps">
								<view class="step flexbox left middle">
									<view class="step-dot flexbox"></view>
									<view class="step-text">{{item.start_date}}</view>
									<view class="step-line"><text class="u-line"></text></view>
								</view>
								<view class="step flexbox left middle">
									<view class="step-dot flexbox"></view>
									<view class="step-text">{{item.end_date}}</view>
								</view>
							</view>
							<view class="msg-label flexbox middle" @click="showPopup">
								涉及<text style="color: #f86660;">4</text>个雇主，<text style="color: #f86660;">9</text>个订单
								<u-icon name="arrow-right" color="#f86660" size="18" style="margin-left: 8upx;"></u-icon>
							</view>
							<view class="msg-tips">提交时间：{{item.create_time}}</view>
						</view>
						<view class="reason">
							<view class="reason-title">
								请假事由
							</view>
							<view class="reason-text">
								{{item.remark}}
							</view>
						</view>
						<view class="btn-group flexbox right" v-if="item.status==0?true:false">
							<view class="button" @click="leaveReview(false,item)">拒绝</view>
							<view class="button button-primary" @click="leaveReview(true,item)">批准</view>
						</view>
					</view>

				</view>
				<!-- 时间调整列表 -->
				<view class="apply-list" v-if="timeShow">
					<view class="apply-list-item" v-for="(item,index) in timeList" :key="index">
						<view class="head-wrapper flexbox middle justify">
							<view class="text1">日期调整</view>
							<view class="text2" :style="{color: item.colorText}">{{item.statusText}}</view>
						</view>
						<view class="explain">
							<view class="explain-item" v-for="(ele,index) in item.textList" :key="ele.title">
								<view class="explain-title">
									{{ele.title}}
								</view>
								<view class="explain-text">
									{{ele.text}}
								</view>
							</view>
						</view>

						<view class="jsa-phone flexbox justify">
							<view class="jsa-phone-item">
								<view class="name">雇主</view>
								<view class="msgBox flexbox middle justify">
									<text class="default">{{item.user_name}}</text>
									<image class="jsa-img" src="../../static/icon/icon-phone.png" mode="widthFix" @click="callPhone(item.user_phone)"></image>
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


						<!-- <view class="btn-group flexbox right" v-if="item.status==0?true:false">
							<view class="button" @click="toExamine(false,item)">拒绝</view>
							<view class="button button-primary" @click="toExamine(true,item)">批准</view>
						</view> -->
					</view>

				</view>
				<!-- 改派/换人列表 -->
				<view class="apply-list" v-if="substitutionShow">
					<view class="apply-list-item" v-for="(item) in substitutionList" :key="item.id">
						<view class="head-wrapper flexbox middle justify" style="height:108rpx">
							<view class="text1" style="font-size: 36rpx;font-weight: 550;color: #1A1A1A;">{{item.typeTetx}}</view>
							<view class="text2" style="color: #999999">{{item.create_time}}</view>
						</view>
						<view class="explain">
							<view class="explain-item" >
								<view class="explain-title">
									{{item.title}}
								</view>
								<view class="explain-text">
									{{item.text}}
								</view>
							</view>
							<view class="explain-item" >
								<view class="explain-title">
									服务地址：
								</view>
								<view class="explain-text">
									{{item.address}}
								</view>
							</view>
						</view>
						<view class="employer">
							<view class="employer-left">
								<view class="employer-left-title">
									雇主
								</view>
								<view class="employer-left-name">
									{{item.user_name}}
								</view>
							</view>
							<view class="employer-right">
								<image class="jsa-img" src="../../static/icon/icon-phone.png" mode="widthFix" @click="callPhone(item.user_phone)"></image>
							</view>

						</view>
						<view class="jsa-phone flexbox justify">
							<view class="jsa-phone-item">
								<view class="name">原家政师</view>
								<view class="msgBox flexbox middle justify">
									<text class="default">{{item.old_nanny_name}}</text>
									<image class="jsa-img" src="../../static/icon/icon-phone.png" mode="widthFix" @click="callPhone(item.old_nanny_phone)"></image>
								</view>
							</view>
							<view class="jsa-phone-item">
								<view class="name">现家政师</view>
								<view class="msgBox flexbox middle justify">
									<text class="default">{{item.nanny_name}}</text>
									<image class="jsa-img" src="../../static/icon/phone.png" mode="widthFix" @click="callPhone(item.nanny_phone)"></image>
								</view>
							</view>
						</view>


						<!-- <view class="btn-group flexbox right" v-if="item.status==0?true:false">
							<view class="button" @click="toExamine(false,item)">拒绝</view>
							<view class="button button-primary" @click="toExamine(true,item)">批准</view>
						</view> -->
					</view>

				</view>
			</view>
		</view>
		<view class="none" v-if="showBox2">
			<image class="none-src" src="../../static/index/none.png" mode=""></image>
			<view class="none-text">
				当前页面，暂无内容～
			</view>
		</view>
		<popup ref="popup"></popup>
		<changeTime ref="changeTime"></changeTime>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import changeTime from "../../components/index/popup/changeTime.vue";
	import dropdown from '../../components/dropdown/dropdown.vue';
	import substitution from '../../components/dropdown/substitution.vue';
	import popup from '../../components/apply/popup.vue';

	import {
		leavelist,
		saveleave,
		reassignmentList,
		reassignmentExamine,
		getsubstitution
	} from '../../utils/api.js';
	import {
		format
	} from '../../utils/common.js';
	export default {
		components: {
			dropdown,
			popup,
			changeTime,
			substitution
		},

		data() {

			return {
				showBox1: true,
				showBox2: false,
				applyShow: true,
				timeShow: false,
				substitutionShow: false,
				showDown: true,
				dropdownMenu: ['全部状态', '已批准', '待审批', '已拒绝', '已过期'],
				orderStatus: [{
						status: 1,
						statusText: '已批准',
						colorText: '#40C486'
					},
					{
						status: 2,
						statusText: '待审批',
						colorText: '#CAA573'
					},
					{
						status: 3,
						statusText: '已拒绝',
						colorText: '#FF2020'
					},
					{
						status: 4,
						statusText: '已取消',
						colorText: '#CCCCCC'
					},
				],
				statusBarHeight: '', // 状态栏的高度
				titleBarHeight: '', // 自定义导航栏的高度
				top: '', // tab菜单到顶部的距离
				show: false,
				leaveList: [],
				list: [{
					name: '请假申请'
				}, {
					name: '日期调整'
				}, {
					name: '换人/改派'
				}],
				current: 0,
				timeList: [],
				substitutionList: [],
				newTime: "",
				leave: {
					time: format(new Date(), 'yyyy-MM-dd'),
					type: 4
				},
				adjustment: {
					time: format(new Date(), 'yyyy-MM-dd'),
					type: 4
				},
				timeType: {
					time: format(new Date(), 'yyyy-MM-dd'),
					type: 4
				},
				butShow: true

			}
		},
		onShow() {
			this.current=0
			this.showDown= true
			this.newTime = format(new Date(), 'yyyy-MM-dd')
			let data = {
				create_time: this.newTime,
				status: 4
			}
			this.getList(data);
		},
		created() {
			const that = this;
			uni.getSystemInfo({
				success: (res) => {
					if (res.model.indexOf('iPhone') !== -1) {
						that.titleBarHeight = 44 + 'px';
					} else {
						that.titleBarHeight = 48 + 'px';
					}
					that.statusBarHeight = res.statusBarHeight + 'px';
					that.top = parseInt(that.titleBarHeight) * 2 + parseInt(that.statusBarHeight)
				}
			})
		},
		methods: {

			menuStatus(val) {
				if (this.current == 0) {

					if (val == "全部状态") {
						this.leave.type = 4
						this.$store.commit("setLeaveType", this.leave.type)
						// let data = {
						// 	create_time: "2020-11-18",
						// 	status: 4
						// }
						// this.getList(data);
					}
					if (val == "待审批") {
						this.leave.type = 0
						this.$store.commit("setLeaveType", this.leave.type)
						// let data = {
						// 	create_time: "2020-11-18",
						// 	status: 0
						// }
						// this.getList(data)
					}
					if (val == "已拒绝") {
						this.leave.type = 1
						this.$store.commit("setLeaveType", this.leave.type)
						// let data = {
						// 	create_time: "2020-11-18",
						// 	status: 1
						// }
						// this.getList(data);
					}
					if (val == "已过期") {
						this.leave.type = 2
						this.$store.commit("setLeaveType", this.leave.type)
						// let data = {
						// 	create_time: "2020-11-18",
						// 	status: 2
						// }
						// this.getList(data);

					}
					if (val == "已批准") {
						this.leave.type = 3
						this.$store.commit("setLeaveType", this.leave.type)
						// console.log(1111)
						// let data = {
						// 	create_time: "2020-11-18",
						// 	status: 3
						// }
						// this.getList(data);
					}
				}
				if (this.current == 1) {
					if (val == "全部状态") {
						this.adjustment.type = 4
						this.$store.commit("setAdjustmentType", this.adjustment.type)
						// let data = {
						// 	create_time: "2020-12-15",
						// 	status: 4
						// }
						// this.Modification(data);
					}
					if (val == "待审批") {
						this.adjustment.type = 0
						this.$store.commit("setAdjustmentType", this.adjustment.type)
						// let data = {
						// 	create_time: "2020-12-15",
						// 	status: 0
						// }
						// this.Modification(data)
					}
					if (val == "已拒绝") {
						this.adjustment.type = 1
						this.$store.commit("setAdjustmentType", this.adjustment.type)
						// let data = {
						// 	create_time: "2020-12-15",
						// 	status: 1
						// }
						// this.Modification(data);
					}
					if (val == "已过期") {
						this.adjustment.type = 2
						this.$store.commit("setAdjustmentType", this.adjustment.type)
						// let data = {
						// 	create_time: "2020-12-15",
						// 	status: 2
						// }
						// this.Modification(data);

					}
					if (val == "已批准") {
						this.adjustment.type = 3
						this.$store.commit("setAdjustmentType", this.adjustment.type)
						// console.log(1111)
						// let data = {
						// 	create_time: "2020-12-15",
						// 	status: 3
						// }
						// this.Modification(data);
					}
				}

			},
			menuDate(date) {
				console.log(111)
				if (this.current == 0) {

					this.leave.time = date
					this.$store.commit("setLeaveTime", this.leave.time)

					let data = {
						create_time: this.leave.time,
						status: this.leave.type
					}
					this.getList(data);
				}
				if (this.current == 1) {

					this.adjustment.time = date
					this.$store.commit("setAdjustmentTime", this.adjustment.time)
					let data = {
						create_time: this.adjustment.time,
						status: this.adjustment.type
					}
					this.Modification(data);
				}

			},
			callPhone(val) {
				console.log(val)
				uni.makePhoneCall({
					phoneNumber: val.phone,
					fail(err) {}
				});
			},
			gotoOrder() {
				uni.navigateTo({
					url: '/pages/order/order?id=4'
				});
			},
			//获取请假列表
			getList(data) {
				leavelist(data).then(res => {
					console.log(res)
					if (res.code == 0) {
						if (res.data.list.length != 0) {
							this.showBox1 = true
							this.showBox2 = false
							res.data.list.map(item => {
								// 0=待审批1=未通过2=已过期（弃用）3=已同意
								if (item.status == 0) {
									this.butShow = true
									item.statusText = "待审批"
									item.colorText = "#CAA573"
								}
								if (item.status == 1) {
									this.butShow = false
									item.statusText = "未通过"
									item.colorText = "#FF2020"
								}
								if (item.status == 2) {
									this.butShow = false
									item.statusText = "已过期"
									item.colorText = "#cccccc"
								}
								if (item.status == 3) {
									this.butShow = false
									item.statusText = "已通过"
									item.colorText = "#40C486"
								}
							})
							this.leaveList = res.data.list
							console.log(this.leaveList)
						} else {
							console.log(222)
							this.leaveList = []
							this.showBox1 = false
							this.showBox2 = true
						}

					} else {
						this.$refs.uToast.show({
							title: res.msg
						})
					}

				})
			},
			//家政师请假审核
			leaveReview(whether, item) {
				let obj = {}
				if (whether == false) {
					obj = {
						leave_id: item.id,
						status: 1

					}
				}
				if (whether == true) {
					obj = {
						leave_id: item.id,
						status: 3

					}
				}
				saveleave(obj).then(res => {
					console.log(res)
					if (res.code == 0) {
						let data = {
							create_time: this.leave.time,
							status: this.leave.type
						}
						this.getList(data);
					} else {
						this.$refs.uToast.show({
							title: res.mag
						})
					}
				})
			},
			//弹出popup查看涉及的订单和雇主
			showPopup() {
				this.$refs.popup.eject()
			},
			change(index) {
				this.current = index;
				// console.log(111)
				if (index == 0) {
					this.applyShow = true
					this.timeShow = false
					this.substitutionShow = false
					this.showDown = true
					let data = {
						create_time: this.leave.time,
						status: this.leave.type
					}
					this.getList(data);

					this.timeType = {
						time: this.leave.time,
						type: this.leave.type
					}


				}
				if (index == 1) {
					this.applyShow = false
					this.timeShow = true
					this.substitutionShow = false
					this.showDown = false
					let data = {
						create_time: this.adjustment.time,
						status: this.adjustment.type
					}
					this.Modification(data);
					this.timeType = {
						time: this.adjustment.time,
						type: this.adjustment.type
					}



				}
				if (index == 2) {
					this.applyShow = false
					this.timeShow = false
					this.substitutionShow = true
					this.showDown = false

					let data = {
						create_time: this.newTime
					}
					this.substitution(data)



				}
			},
			//打电话给雇主
			callPhone(phone) {
				uni.makePhoneCall({
					phoneNumber: phone,
					fail(err) {}
				});
			},
			//请求修改时间列表
			Modification(data) {
				reassignmentList(data).then((res) => {
					if (res.code == 0) {
						let list = res.data.list
						if (list.length != 0) {
							this.showBox1 = true
							this.showBox2 = false
							list.map(item => {
								item.textList = [{
									title: "保洁整理：",
									text: item.goods_name
								}, {
									title: "预定日期：",
									text: item.old_service_time
								}, {
									title: "期望日期：",
									text: item.service_time
								}, {
									title: "上门时间：",
									text: item.old_part_time
								}, {
									title: "服务地址：",
									text: item.address
								}]
								if (item.status == 0) {
									item.statusText = "待审批"
									item.colorText = "#CAA573"
								}
								if (item.status == 1) {
									item.statusText = "未通过"
									item.colorText = "#FF2020"
								}
								if (item.status == 2) {
									item.statusText = "已过期"
									item.colorText = "#cccccc"
								}
								if (item.status == 3) {
									item.statusText = "已通过"
									item.colorText = "#40C486"
								}
							})
							this.timeList = list
							console.log(this.timeList)
						} else {
							console.log(222)
							this.showBox1 = false
							this.showBox2 = true
						}
					} else {
						console.log(333)
						this.$refs.uToast.show({
							title: res.msg
						})
					}

					// console.log(list)

					// console.log(list)
				})
			},

			//修改时间申请审核
			toExamine(istrue, item) {
				if (istrue == true) {
					let data = {
						id: item.id,
						status: 3
					}
					reassignmentExamine(data).then(res => {
						if (res.code == 0) {
							let data = {
								create_time: this.adjustment.time,
								status: this.adjustment.type
							}
							this.Modification(data);
						} else {
							this.$refs.uToast.show({
								title: res.msg
							})
						}
					})
				} else {
					let data = {
						id: item.id,
						status: 3
					}
					reassignmentExamine(data).then(res => {
						if (res.code == 0) {
							let data = {
								create_time: this.adjustment.time,
								status: this.adjustment.type
							}
							this.Modification(data);
						} else {
							this.$refs.uToast.show({
								title: res.msg
							})
						}
					})
				}

			},
			//改派换人的公共方法
			substitution(data) {

				getsubstitution(data).then(res => {
					if (res.code == 0) {
						if (res.data.list.length > 0) {
							this.showBox1 = true
							this.showBox2 = false
							let list = res.data.list
							list.map((item, index) => {
								if (item.changetype == 1) {
									item.typeTetx = "家政师更换"
									item.title = "保洁整理："
									item.text = item.goods_name + "()"


								}
								if (item.changetype == 2) {
									item.typeTetx = "改派通知"
									item.title = "上门日期："
									item.text = item.service_time + " " + item.part_time
								}
							})
							this.substitutionList = list
							console.log(this.substitutionList)
						} else {
							this.showBox1 = false
							this.showBox2 = true
						}
					} else {
						this.$refs.uToast.show({
							title: res.msg
						})
					}
				})
			}

		},
		computed: {
			chang() {
				return this.$store.state.order.change;
			},
			changTime() {
				return this.$store.state.home.changeTime;
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

			},
			changTime(val) {
				if (this.current == 1) {
					this.timeType = {
						time: this.newTime,
						type: 4
					}
					let data = {
						create_time: this.adjustment.time,
						status: this.adjustment.type
					}
					this.Modification(data);

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
	/deep/.u-tab-bar[data-v-3b2b1a80] {
		position: absolute;
		bottom: -6rpx;
	}

	.app-body {
		height: 100%;
	}

	.app-header {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;

		background-color: #fff;
		z-index: 11;
	}

	.app-content {
		height: calc(100% - 88upx);
		z-index: 1;
		overflow: scroll;
	}

	.apply-block {

		.apply-list {
			padding: 30upx 30upx 0 30upx;


			.apply-list-item {
				background-color: #fff;
				border-radius: 16upx;
				padding: 0 30upx;
				padding-bottom: 40upx;
				box-shadow: 0 0 20upx 0 rgba(0, 0, 0, 0.06);
				margin-bottom: 40rpx;

				.head-wrapper {
					height: 98upx;
					border-bottom: 2upx solid #ededed;

					.text1 {
						color: #1A1A1A;
						font-size: 36upx;
						height: 50upx;
						line-height: 50upx;
					}

					.text2 {
						color: #ccc;
						font-size: 28upx;
						height: 40upx;
						line-height: 40upx;
					}
				}

				.info-wrapper {
					padding-top: 24upx;
					padding-bottom: 30upx;

					.info-left {
						.text1 {
							color: #999999;
							font-size: 28upx;
							height: 40upx;
							line-height: 40upx;
							margin-bottom: 8upx;
						}

						.text2 {
							color: #202020;
							font-size: 32upx;
							height: 44upx;
							line-height: 44upx;
						}
					}

					.jsa-img {
						width: 64upx;
						height: 64upx;
						border-radius: 50%;
					}
				}

				.msg-wrapper {
					padding: 24upx 30upx 28upx 30upx;
					background-color: #F8F8F8;
					border-radius: 16upx;

					.msg-head {
						.text1 {
							color: #202020;
							font-size: 32upx;
							height: 44upx;
							line-height: 44upx;
						}

						.text2 {
							color: $jsa-text-primary;
							font-size: 32upx;
							height: 44upx;
							line-height: 44upx;
						}
					}

					.msg-steps {
						display: flex;
						flex-direction: column;
						margin-top: 22upx;
						margin-bottom: 24upx;

						.step {
							min-height: 52upx;
							flex-direction: row;
							flex: 1;
							position: relative;

							.step-dot {
								width: 20upx;
								height: 20upx;
								border: 2upx solid #e2e2e2;
								flex-direction: row;
								border-radius: 50%;
							}

							.step-text {
								margin-left: 10upx;
								color: #999;
								font-size: 28upx;
								height: 40upx;
								line-height: 40upx;
							}

							.step-line {
								position: absolute;
								z-index: 0;
								height: 50%;
								top: 65%;
								left: calc(18upx / 2);

								.u-line {
									margin: 0;
									border-color: #e2e2e2;
									border-left-width: 2upx;
									border-left-style: solid;
									height: 100%;
								}
							}
						}
					}

					.msg-label {
						color: #202020;
						margin-bottom: 24upx;
						font-size: 28upx;
					}

					.msg-tips {
						color: #999;
						font-size: 28upx;
						height: 40upx;
						line-height: 40upx;
					}
				}

				.btn-group {
					margin-top: 36upx;

					.button {
						margin-left: 30upx;
						border-radius: 32upx;
						font-size: 28upx;
						line-height: 40upx;
						text-align: center;
						color: #202020;
						border: 2upx solid #ededed;
						padding: 11upx 66upx;
					}

					.button:first-child {
						margin-left: 0;
					}

					.button-primary {
						border: 2upx solid #ff8666;
						color: #ff8666;
					}
				}

				.employer {
					display: flex;
					justify-content: space-between;
					// width: 630px;
					height: 136rpx;
					background: #F8F8F8;
					border-radius: 16rpx;
					align-items: center;
					margin-top: 24rpx;

					.employer-left {
						display: flex;
						align-items: center;

						.employer-left-title {
							margin-left: 30rpx;
							margin: 24rpx;
						}
					}

					.employer-right {
						.jsa-img {
							width: 64upx;
							height: 64upx;
							border-radius: 50%;
							margin-right: 30rpx;
						}
					}
				}
			}

			.explain {
				.explain-item {
					display: flex;
					// align-items: center;
					margin-top: 24rpx;

					.explain-title {
						width: 160rpx;
						height: 44rpx;
						font-size: 32rpx;
						font-weight: 400;
						color: #666666;
						line-height: 44rpx;
					}

					.explain-text {
						width: 470rpx;

						font-size: 32rpx;
						font-weight: 550;
						color: #202020;
						line-height: 44rpx;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						overflow: hidden;
					}
				}
			}

			.jsa-phone {
				padding-bottom: 36upx;
				margin-top: 24rpx;

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



		}

		//#ifdef H5
		.apply-list {
			padding-bottom: 100upx;
		}

		//#endif

		.reason {
			padding-top: 30rpx;

			.reason-title {
				font-size: 28rpx;
				font-weight: 400;
				color: #999999;
				line-height: 40rpx;
				padding-bottom: 8rpx;
			}

			.reason-text {
				font-size: 32rpx;
				font-weight: 550;
				color: #202020;
				line-height: 44rpx;
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
