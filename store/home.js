export default {
	state: {
		type: "",
		time: "",
		changeTime: ""

	},
	mutations: {
		setType(state, n) {
			state.type = n;
		},
		setTime(state, n) {
			state.time = n;
		},
		setChangeTime(state, n) {
			state.changeTime = n;
		}
	}
}
