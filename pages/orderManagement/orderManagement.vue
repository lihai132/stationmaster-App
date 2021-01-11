<template>
	<view class="management">
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
			<dropdown :top="top" :timeShow="timeShow" :menuList="dropdownMenu" @menuStatus="menuStatus"></dropdown>
			<orderCalendar class="orderCalendar" ref="orderCalendar" @getmonthList="getmonthList" @showNone="showNone" @showList="showList"
			 @getOrderList="getOrderList" v-on:headIncrease="headIncrease" v-on:headReduce="headReduce"></orderCalendar>
			<OrderNav class="OrderNav" ref="OrderList" @open="open" @putAway="putAway" :listType="listType"></OrderNav>
			<u-toast ref="uToast" />
			<changeTime ref="changeTime"></changeTime>
		</view>

	</view>
</template>

<script>
	import dropdown from '../../components/dropdown/orderDowm.vue';
	import changeTime from "../../components/index/popup/changeTime.vue";
	import {
		postServicedayscount,
		postServicedayslist,
		stationList
	} from '../../utils/api.js';
	import OrderNav from "../../components/order/management.vue";
	import orderCalendar from "../../components/order/rili.vue";

	export default {

		data() {
			return {
				titleBarHeight: '',
				statusBarHeight: '',
				name: "",
				dropdownMenu: ['全部状态', '待上门', '服务中', '已完成', '已改派'],
				current: 0,
				menuText1: '全部状态',
				timeShow: false,

				curDate: '',
				markDays: [],
				topHeight: false,
				heightNum: "",
				order_header: {
					height: ""
				},
				orderList: [],
				nannyId: "",
				listType: -1
			}
		},

		onLoad(options) {
			this.nannyId = options.id
			var date = new Date();
			var date1 = date.getFullYear()
			var date2 = date.getMonth()
			var date3 = date.getDate();

			let time = date1 + "-" + (date2 * 1 + 1)
			this.$store.commit("setMonth", time)
		},
		onShow() {
			console.log(111)
			var date = new Date();
			var date1 = date.getFullYear()
			var date2 = date.getMonth()
			var date3 = date.getDate();
			let month = this.$store.state.management.changMonth
			let time = date1 + "-" + (date2 * 1 + 1)
			this.getmonthList(month);


			// this.monthDay(this.y, this.m);

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
					that.top = parseInt(that.titleBarHeight) * 2 + parseInt(that.statusBarHeight);
				}
			})
		},

		methods: {
			search() {
				uni.navigateTo({
					url: '../../pages/nameList/nameList?name=' + this.name
				})
				// console.log(this.name)
			},

			//类型
			menuStatus(val) {
				// '全部状态', '待上门', '服务中', '已完成', '已改派'
				if (val == "全部状态") {
					this.listType = -1
				}
				if (val == "待上门") {
					this.listType = 0
				}
				if (val == "服务中") {
					this.listType = 1
				}
				if (val == "已完成") {
					this.listType = 2
				}
				if (val == "已改派") {
					this.listType = 3
				}
				this.$store.commit("setListType", this.listType)
				console.log(this.$store.state.management.listType)

			},


			headIncrease() {
				this.topHeight = true
			},
			headReduce() {
				this.topHeight = false
			},
			open() {
				this.$refs.orderCalendar.toggle()
			},
			putAway() {
				// console.log(222)
				this.$refs.orderCalendar.putAway()
			},
			//请求当前日期的订单数据
			getOrderList(time) {

				let data = {
					status: this.listType,
					service_time: time,
					name: ""
				}
				this.$refs.OrderList.getOrderList(data)
			},
			//请求月份订单数据
			getmonthList(time) {
				// let y = new Date().getFullYear() // 年
				// let m = new Date().getMonth() + 1 // 月
				// this.$refs.orderCalendar.monthDay(y, m);
				stationList({
					status: this.listType,
					service_time: time
				}).then(res => {
					console.log(res)
					if (res.code == 0) {
						// console.log(res.data.list);
						if (res.data.list != null) {

							res.data.list.map((item, index) => {
								let dayArr = item.days.split("-")
								item.month = dayArr[1]
								item.day = dayArr[2]
							})
							this.orderList = res.data.list;
							this.$store.commit("setOrderList", this.orderList)
						}


					} else {
						this.$refs.uToast.show({
							title: '系统错误',
						})
					}
				})
			},
			//当前日期是否有订单
			showNone() {
				this.$refs.OrderList.showNone()
				// console.log(111)
			},
			showList() {

				this.$refs.OrderList.showList()
			}

		},
		components: {
			dropdown,
			orderCalendar,
			OrderNav,
			changeTime
		},
		computed: {
			listData() {
				return this.$store.state.order.heightNum
			},
			chang() {
				return this.$store.state.order.change;
			},
		},
		watch: {
			listData(val) {
				// console.log(val)
				this.heightNum = val
				this.order_header.height = val

				// console.log(this.order_header.height)
				// console.log("vuex高度"+this.order_header.height)
			},
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
	.management {

		height: 100%;
		background: #F5F5F5;

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
						}
					}
				}
			}
		}
	}

	.dropdown-menu {
		width: 100%;
		height: 64upx;
		z-index: 11;

		// position: relative;
		.dropdown-item {
			width: 342upx;
			// border-right: 2upx solid #F6F6F6;

			.dropdown-text {
				margin-right: 8upx;
				color: #202020;
				font-size: 28upx;
				height: 40upx;
				line-height: 40upx;
			}

			.icon {
				transition: transform .3s;
			}
		}

		.dropdown-item:nth-child(2) {
			border-right: none;
		}

		.dropdown-item.current {
			.icon {
				transform: rotate(180deg);
			}
		}
	}

	.OrderNav {
		overflow: scroll;
	}
</style>
