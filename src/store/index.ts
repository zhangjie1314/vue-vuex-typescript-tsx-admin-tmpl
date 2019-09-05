import Vue from 'vue'
import Vuex from 'vuex'
import Login from './module/login'
import Index from './module/index'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        Login,
        Index,
    },
})
