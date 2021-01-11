import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex);
import login from './login';
import order from './order';
import home from './home';
import management from './management';
import nameList from './nameList';


export default new vuex.Store({
    modules: {
        login,
		order,
		home,
		management,
		nameList
		



    }

})

// const store = new Vuex.Store({
// 	state: {
// 		name: "李海"
// 	},
// 	mutations: {},
// 	actions: {}
// })
// export default store
