import config_url from './config.js';
import request  from './request.js';

export const imgUploadUrl = config_url + '/uploadfile/upload';				// 上传图片

export const login = params => request('login/login', 'post', params);		// 登录

export const smsode = params => request('login/smscode', 'post', params);	// 发送注册登录验证码

export const servicelist = params => request('service/servicelist', 'post', params);	// 订单首页列表

export const getserviceevaluate = params => request('service/getserviceevaluate', 'post', params);	// 查看订单反馈

export const nannylist = params => request('nanny/nannylist', 'post', params);	// 家政师列表

export const leavelist = params => request('nanny/leavelist', 'post', params);	// 家政师请假列表

export const saveleave = params => request('nanny/saveleave', 'post', params);	// 家政师请假审核

export const servicedayscount = params => request('nanny/servicedayscount', 'post', params);	// 家政师工作日历

export const servicedayslist = params => request('nanny/servicedayslist', 'post', params);	// 获取点击日历家政师订单列表

export const reassignmentList = params => request('/nanny/reassignmentList', 'post', params);	// 改日期申请列表

export const reassignmentExamine = params => request('/nanny/reassignmentExamine', 'post', params);	// 改日期申请列表

export const stationList = params => request('/serviceorder/servicedayscount', 'post', params);	// 获取当前月份所有家政师的订单

export const stationdayslist = params => request('/serviceorder/servicedayslist', 'post', params);	// 获取当日所有家政师的订单

export const changenanny = params => request('/serviceorder/changenanny', 'post', params);	// 更换家政师

export const changenannylist = params => request('/serviceorder/changenannylist', 'post', params);	// 点击改派时获取现在有空的家政师列表

export const getsubstitution = params => request('/nanny/reassignmentnannylist', 'post', params);	// 改派换人列表


