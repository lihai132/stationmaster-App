<template>
	<view class="app-body">
		<view class="status_bar"></view>
		<view class="app-header">
			<view class="search-block">
				<view class="search-wrapper flexbox middle justify">
					<view class="search-backup" @click="goBack">
						<u-icon name="arrow-left" color="#1D1D1D" size="36"></u-icon>
					</view>
					<view class="search-input flexbox middle">
						<u-icon class="icon-search" name="search" color="#BFC1C1" size="28"></u-icon>
						<input type="text" v-model.trim="searchValue" :placeholder="text" placeholder-class="inputPlace" />
					</view>
					<view class="search-btn">
						<text>搜索</text>
					</view>
				</view>
			</view>
		</view>
		<view class="app-content">
			<view class="search-history">
				<view class="search-history-title">搜索历史</view>
				<view class="search-list flexbox wrap">
					<view class="search-list-item">张莉莉</view>
					<view class="search-list-item">张莉莉</view>
					<view class="search-list-item">张莉莉</view>
					<view class="search-list-item">张莉莉</view>
					<view class="search-list-item">张莉莉</view>
					<view class="search-list-item">张莉莉</view>
					<view class="search-list-item">张莉莉</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchValue: '',
				text:""
			}
		},
		onLoad(option){
			let type=option.type
			if(type=="index"){
				this.text="输入家政师或客户的姓名"
			}if(type=="center"){
				this.text="输入家政师的姓名"
			}
		},
		methods: {
			goBack() {
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.search-block {
		width: 750upx;
		padding: 0 30upx;
		.search-wrapper {
			height: 88upx;
			.search-input {
				width: 530upx;
				height: 65upx;
				background-color: #F6F8F8;
				border-radius: 36upx;
				input {
					width: 100%;
					font-size: 28upx;
				}
				.icon-search {
					padding: 0 24upx;
				}
				.inputPlace {
					color: #999999;
					font-size: 28upx;
				}
			}
			.search-btn {
				color: #ff8666;
				font-size: 28upx;
			}
		}
	}
	.search-history {
		width: 750upx;
		padding: 0 30upx;
		margin-top: 60upx;
		.search-history-title {
			color: #202020;
			font-size: 32upx;
		}
		.search-list {
			margin-top: 28upx;
			.search-list-item {
				margin-right: 24upx;
				margin-bottom: 24upx;
				padding: 12upx 20upx;
				background-color: #F5F6F8;
				color: #787979;
				font-size: 28upx;
				line-height: 28upx;
				border-radius: 26upx;
			}
		}
	}
</style>
