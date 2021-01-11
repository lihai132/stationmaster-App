import {
	format
} from '../utils/common.js';
export default {
	state: {
		heightNum: 390,
		orderList: [],
		orderDate: "",
		orderTime: "",
		orderRefresh: 0,
		change: false,
		leave: {
			time: format(new Date(), 'yyyy-MM-dd'),
			type: 4
		},
		adjustment: {
			time: format(new Date(), 'yyyy-MM-dd'),
			type: 4
		}



	},
	mutations: {
		setHeight(state, n) {
			state.heightNum = n;
		},
		setOrderList(state, n) {
			state.orderList = n;
		},
		setOrderDate(state, n) {
			state.orderDate = n;
		},
		setOrderTime(state, n) {
			state.orderTime = n;
		},
		setChange(state, n) {
			state.change = n;
		},
		setLeaveTime(state,n){
			state.leave.time=n
		},
		setLeaveType(state,n){
			state.leave.type=n
		},
		setAdjustmentTime(state,n){
			state.adjustment.time=n
		},
		setAdjustmentType(state,n){
			state.adjustment.type=n
		}

	}
}
