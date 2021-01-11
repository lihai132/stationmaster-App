import {
	format
} from '../utils/common.js';
export default {
	state: {
		listType:-1,
		changMonth:""



	},
	mutations: {
		setListType(state, n) {
			state.listType = n;
		},
		setMonth(state, n) {
			state.changMonth = n;
		},
		

	}
}
