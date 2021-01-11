<template>
	<u-popup v-model="show" mode="bottom" border-radius="14" height="90%" closeable>
		<view class="popup-block">
			<view class="popup-title">张莉莉待沟通的雇主：</view>
			<view class="popup-list">
				<view class="popup-item flexbox justify middle">
					<view class="popup-item-left">
						<text class="name">王先生</text>
						<text class="num">3次服务</text>
					</view>
					<view class="popup-item-right">
						<image class="popup-img" src="../../static/icon/icon-phone.png" mode="widthFix" @click="callPhone"></image>
					</view>
				</view>
				<view class="popup-item flexbox justify middle">
					<view class="popup-item-left">
						<text class="name">张小姐</text>
						<text class="num">3次服务</text>
					</view>
					<view class="popup-item-right">
						<image class="popup-img" src="../../static/icon/icon-phone.png" mode="widthFix" @click="callPhone"></image>
					</view>
				</view>
				<view class="popup-item flexbox justify middle">
					<view class="popup-item-left">
						<text class="name">萧小姐</text>
						<text class="num">3次服务</text>
					</view>
					<view class="popup-item-right">
						<image class="popup-img" src="../../static/icon/icon-phone.png" mode="widthFix" @click="callPhone"></image>
					</view>
				</view>
			</view>
		</view>
	</u-popup>
</template>
<script>
	export default{
		data(){
			return{
				show: false,
			}
		},
		methods:{
			eject(){
				this.show=true
			},
			callPhone() {
				// console.log(val)
				uni.makePhoneCall({
					phoneNumber: "18617271159",
					fail(err) {}
				});
			},
		}
		
	}
</script>
<style lang="scss" scoped>
	.popup-block {
		.popup-title {
			padding-top: 152upx;
			padding-left: 40upx;
			padding-bottom: 48upx;
			font-size: 48upx;
			color: #333333;
			border-bottom: 1px solid #E6E6E6;
		}
		.popup-list {
			padding: 0 40upx;
			.popup-item {
				padding: 46upx 0 48upx 0;
				border-bottom: 1px solid #E6E6E6;
			}
		}
		.popup-item-left {
			.name {
				color: #333333;
				font-size: 36upx;
				margin-right: 20upx;
			}
			.num {
				color: #999999;
				font-size: 36upx;
			}
		}
		.popup-item-right {
			.popup-img {
				width: 64upx;
				height: 64upx;
			}
		}
	}
	
</style>