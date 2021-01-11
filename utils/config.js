// process.env.NODE_ENV 
let url_config = '';


if (process.env.NODE_ENV == 'development') {
	//测试环境
	url_config = 'https://stationapi.yishenjr.cn';
	
	//正式环境
	// url_config = 'https://stationapi.jshuan.cn';
} else {
	//测试环境
	url_config = 'https://stationapi.yishenjr.cn';
	
	//正式环境
	// url_config = 'https://stationapi.jshuan.cn';
}

export default url_config