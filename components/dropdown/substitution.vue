<template>
	<view class="dropdown-block">
		<view class="dropdown-wrapper">
			<view class="dropdown-menu flexbox middle">
				<!-- <view class="dropdown-item flexbox middle center" :class="{'current': current == 1}" @click="changeItem(1)">
					<text class="dropdown-text">{{menuText1}}</text>
					<u-icon class="icon" name="arrow-down-fill" :color="current == 1 ? '#ff8666' : '#ddd'" size="14"></u-icon>
				</view> -->
				<view class="dropdown-item flexbox middle center" v-if="timeShow" :class="{'current': current == 2}" @click="changeItem(2)">
					<text class="dropdown-text">{{menuText2}}</text>
					<u-icon class="icon" name="arrow-down-fill" :color="current == 2 ? '#ff8666' : '#ddd'" size="14"></u-icon>
				</view>
			</view>
			<view class="dropdown-content" :class="{opacity: current == 0}" :style="{top: top+'upx'}">
				<view class="dropdown-list">
					<view v-if="current == 1">
						<view class="dropdown-list-item" v-for="(item, index) in menuList" :key="index" :class="{on: menuActice == index}">
							<text class="line" @click="menuItem(index)">{{item}}</text>
						</view>
						<view class="confirm-btn">
							<button class="btn btn-primary" @click="confirmMenu">确认</button>
						</view>
					</view>
				</view>
				<view class="mask" :style="{height: maskHeigh+'px'}" v-if="current == 1"></view>
			</view>
			<!-- 日历插件 -->
			<u-calendar v-model="showCalendar" :mode="timer" max-date="2100-12-31" :safe-area-inset-bottom="true" @change="changeCalendar"
			 active-bg-color='#FF2020' btn-type="error"></u-calendar>
		</view>
	</view>
</template>

<script>
	import {
		format
	} from '../../utils/common.js';
	export default {
		props: {
			top: {
				type: Number,
				default: 88
			},
			menuList: {
				type: Array,
				default: () => []
			},

			timeType: {
				type: Object,
				default: () => {}
			},
			timeShow: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				current: 0,
				menuActice: 0,
				menuText1: '全部状态',
				menuText2: format(new Date(), 'yyyy-MM-dd'), // 获取当前日期
				maskHeigh: '', // 遮罩的高度
				timer: 'date',
				showCalendar: false,
				status: 4,
				calendarTime: format(new Date(), 'yyyy-MM-dd')
			};
		},
		created() {
			// const that = this;
			// uni.getSystemInfo({
			// 	success: (res) => {
			// 		this.maskHeigh = res.screenHeight;
			// 	}
			// })

			if (this.timeType == true) {
				if (this.timeType.type == 0) {
					this.menuText1 = "待审批"
				}
				if (this.timeType.type == 1) {
					this.menuText1 = "已拒绝"
				}
				if (this.timeType.type == 2) {
					this.menuText1 = "已过期"
				}
				if (this.timeType.type == 3) {
					this.menuText1 = "已批准"
				}
				if (this.timeType.type == 4) {
					this.menuText1 = "全部状态"
				}
				this.menuText2 = this.timeType.time
			}


		},
		mounted() {
			this.menuText1 = this.menuList[0];

			// console.log(this.menuText2)
		},
		watch: {
			// 监听日历 开启/关闭 事件
			showCalendar: function(val) {
				if (!val) {
					this.current = 0;
				}
			},
			timeType(val) {
				if (val.type == 0) {
					this.menuText1 = "待审批"
				}
				if (val.type == 1) {
					this.menuText1 = "已拒绝"
				}
				if (val.type == 2) {
					this.menuText1 = "已过期"
				}
				if (val.type == 3) {
					this.menuText1 = "已批准"
				}
				if (val.type == 4) {
					this.menuText1 = "全部状态"
				}
				this.menuText2 = val.time
			}
		},
		methods: {
			// navbar 切换
			changeItem(index) {
				if (this.current == index) {
					this.current = 0;
				} else {
					this.current = index;
					if (index == 2) {
						this.showCalendar = true;
					}
				}
			},
			menuItem(index) {
				this.menuActice = index;

			},
			//选择所查询列表的类型
			confirmMenu() {
				this.menuText1 = this.menuList[this.menuActice];
				this.$emit('menuStatus', this.menuText1)
				this.current = 0;
				if (this.menuText1 == "全部状态") {
					this.status = 4

				}
				if (this.menuText1 == "待审批") {
					this.status = 0
				}
				if (this.menuText1 == "已拒绝") {
					this.status = 1
				}
				if (this.menuText1 == "已过期") {
					this.status = 2
				}
				if (this.menuText1 == "已批准") {
					this.status = 3
				}
				// let data = {
				// 	create_time:this.menuText2 ,
				// 	status: this.status
				// }
				this.$emit('menuDate', this.menuText2)
			},
			//选择日期
			changeCalendar(e) {
				// console.log(e)
				this.menuText2 = e.result
				// console.log(this.menuText2)
				// let data = {
				// 	create_time:this.menuText2 ,
				// 	status: this.status
				// }
				this.$emit('menuDate', this.menuText2)
				this.current = 0;
				console.log(this.menuText2);
			}
		}
	}
</script>

<style lang="scss" scoped>
	//#ifdef H5
	.dropdown-wrapper .u-drawer {
		bottom: 100upx;
	}


	//#endif
	.dropdown-block {
		background-color: #fff;
		// position: relative;
		box-sizing: border-box;

		.dropdown-wrapper {
			flex: 1;
			padding: 12upx 30upx;

			.dropdown-menu {
				width: 100%;
				height: 64upx;
				z-index: 11;

				// position: relative;
				.dropdown-item {
					width: 342upx;
					border-right: 2upx solid #F6F6F6;

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

			.dropdown-content {
				z-index: 11;
				transition: opacity .3s linear 0s;
				position: absolute;
				top: 88upx;
				left: 0;
				bottom: 0;
				// overflow: hidden;
				width: 100%;

				.dropdown-list {
					position: relative;
					z-index: 10;
					transition: all .3s;
					transform: translateY(0upx);
					background-color: #fff;

					.dropdown-list-item {
						text-align: center;
						margin-bottom: 70upx;

						.line {
							padding: 8upx 0;
							border-bottom: 2upx solid transparent;
						}
					}

					.dropdown-list-item:first-child {
						padding-top: 46upx;
					}

					.dropdown-list-item.on {
						.line {
							border-bottom: 2upx solid #ff8666;
						}
					}

					.confirm-btn {
						margin: 0 auto;
						width: 690upx;
						padding-bottom: 40upx;

						.btn {
							height: 92upx;
							line-height: 92upx;
							border-radius: 8upx;
							font-size: 32upx;
						}
					}
				}

				.mask {
					position: absolute;
					z-index: 9;
					background: rgba(0, 0, 0, .3);
					width: 100%;
					left: 0;
					top: 0;
					bottom: 0;
				}
			}

			.opacity {
				z-index: -1;
				transition: opacity .3s linear 0s;
				top: 88rpx;
				opacity: 0;

				.dropdown-list {
					position: relative;
					z-index: 10;
					transition: all .3s;
					background-color: #fff;
					transform: translateY(-100%);
					transition-duration: .3s;
				}
			}
		}

	}

	
</style>
