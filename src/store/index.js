import Vue from 'vue'
import Vuex from 'vuex'

import account from './modules/account'
import setting from './modules/setting'
import cache from './modules/cache'
import getters from './getters'

Vue.use(Vuex)
const store = new Vuex.Store({
	getters,
	modules: {
		account,
		setting,
		cache,
	},
})

export default store
