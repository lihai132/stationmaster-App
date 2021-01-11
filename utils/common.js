// 时间格式化
export const format = (date, fmt) => {
	var o = {
		"M+": date.getMonth() + 1, // 月份
		"d+": date.getDate(), // 日
		"H+": date.getHours(), // 时
		"m+": date.getMinutes(), // 分
		"s+": date.getSeconds(), // 秒
		"q+": Math.floor((date.getMonth() + 3) / 3), // 季度
		"S": date.getMilliseconds() // 毫秒
	};
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[
				k])
			.substr(("" + o[k]).length)));
	return fmt;
}

// 去除字符串空格
export const trim = (str, type) => {
	// type 1-所有空格  2-前后空格  3-前空格 4-后空格
	switch (Number(type)) {
		case 1:
			return str.replace(/\s+/g, "");
		case 2:
			return str.replace(/(^\s*)|(\s*$)/g, "");
		case 3:
			return str.replace(/(^\s*)/g, "");
		case 4:
			return str.replace(/(\s*$)/g, "");
		default:
			return str;
	}
}

// 时间
export const getTime = (start, end) => {
	var startDate = new Date(start.replace(/-/g, "/")); //replace方法将-转为/
	var endDate = new Date(end.replace(/-/g, "/"));
	var dateDiff = endDate.getTime() - startDate.getTime(); //时间差的毫秒数
	var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000)); //计算出相差天数
	var leave1 = dateDiff % (24 * 3600 * 1000) //计算天数后剩余的毫秒数
	var hours = Math.floor(leave1 / (3600 * 1000)) //计算出小时数
	//计算相差分钟数
	var leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数
	var minutes = Math.floor(leave2 / (60 * 1000)) //计算相差分钟数
	let time = hours + "小时" + minutes+"分"
	return time;
}

// 获取当前时间，格式为YY-MM-DD
export const getDate = (start, end) => {
	var myDate = new Date();
	myDate.getYear();        //获取当前年份(2位)
	myDate.getFullYear();    //获取完整的年份(4位,1970-????)
	myDate.getMonth();       //获取当前月份(0-11,0代表1月)
	myDate.getDate();        //获取当前日(1-31)
	myDate.getDay();         //获取当前星期X(0-6,0代表星期天)
	myDate.getTime();        //获取当前时间(从1970.1.1开始的毫秒数)
	myDate.getHours();       //获取当前小时数(0-23)
	myDate.getMinutes();     //获取当前分钟数(0-59)
	myDate.getSeconds();     //获取当前秒数(0-59)
	myDate.getMilliseconds();    //获取当前毫秒数(0-999)
	myDate.toLocaleDateString();     //获取当前日期
	var mytime=myDate.toLocaleTimeString();     //获取当前时间
	let time=myDate.getFullYear()+"-"+(myDate.getMonth()+1)+"-"+myDate.getDate();     //获取日期与时间
	// console.log(myDate)
	return time;
}
