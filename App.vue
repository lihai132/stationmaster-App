<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	page {
	  height: 100%;
	}
	// 解决顶部问题
	.status_bar {
		width: 100%;
		height: var(--status-bar-height);
	}
	// 按钮 start
	.btn {
		width: 100%;
		background-color: #fff;
		line-height: 1;
	}
	.btn::after {
		border: none;
	}
	.btn.btn-info {
		background-color: #d4d4d4 !important;
		color: #fff !important;
	}
	.btn.btn-primary {
		background: linear-gradient(90deg, #FFBB9F 0%, #FF8666 100%) !important;
		color: #fff !important;
	}
	.btn.is-primary {
		background-color: #fff !important;
		border: 2upx solid #ffcbbb !important;
		color: #aaa !important;
	}
	// 按钮 end
	.app-body {
		width: 750upx;
		height: 100%;
		box-sizing: border-box;
	}
	.app-body view {
		box-sizing: border-box;
	}
	.flexbox {
		display: -webkit-box;
		display: -moz-box;
		display: -ms-flexbox;
		display: -webkit-flex;
		display: flex;
	}
	.flexbox.wrap {
		-moz-box-direction: normal;
		-webkit-box-direction: normal;
		-moz-box-lines: multiple;
		-webkit-box-lines: multiple;
		-webkit-flex-wrap: wrap;
		-moz-flex-wrap: wrap;
		-ms-flex-wrap: wrap;
		-o-flex-wrap: wrap;
		flex-wrap: wrap;
	}
	.flexbox.center {
		-webkit-box-pack: center;
		-ms-flex-pack: center;
		-moz-justify-content: center;
		-webkit-justify-content: center;
		justify-content: center;
	}
	.flexbox.left {
		-webkit-box-pack: start;
		-ms-flex-pack: start;
		-ms-justify-content: flex-start;
		-moz-justify-content: flex-start;
		-webkit-justify-content: flex-start;
		justify-content: flex-start
	}
	.flexbox.right {
		-webkit-box-pack: end;
		-ms-flex-pack: end;
		-ms-justify-content: flex-end;
		-moz-justify-content: flex-end;
		-webkit-justify-content: flex-end;
		justify-content: flex-end
	}
	.flexbox.justify {
		-webkit-box-pack: justify;
		-ms-flex-pack: justify;
		-moz-justify-content: space-between;
		-webkit-justify-content: space-between;
		justify-content: space-between
	}
	.flexbox.middle {
		-webkit-box-align: center;
		-ms-flex-align: center;
		-moz-align-items: center;
		-webkit-align-items: center;
		align-items: center
	}
	.flexbox.top {
		-webkit-box-align: start;
		-ms-flex-align: start;
		-moz-align-items: flex-start;
		-webkit-align-items: flex-start;
		align-items: flex-start
	}
	.flexbox.bottom {
		-webkit-box-align: end;
		-ms-flex-align: end;
		-moz-align-items: flex-end;
		-webkit-align-items: flex-end;
		align-items: flex-end
	}
	.flex1 {
		width: 0;
		-webkit-box-flex: 1;
		-webkit-flex: 1;
		-moz-flex: 1;
		-ms-flex: 1;
		flex: 1;
	}
</style>
