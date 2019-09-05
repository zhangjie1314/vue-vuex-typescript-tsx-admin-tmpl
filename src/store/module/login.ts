import { LoginState } from '@/types/views/login.interface'
import { GetterTree, MutationTree, ActionTree } from 'vuex'
import * as LoginApi from '@/api/login'

const state: LoginState = {
    login: {
        info: undefined,
    },
}
// 强制使用getter获取state
const getters: GetterTree<LoginState, any> = {
    info: (state: LoginState) => state.login.info,
}
// 更改state
const mutations: MutationTree<LoginState> = {
    // 更新state都用该方法
    UPDATE_STATE(state: LoginState, data: LoginState) {
        for (const key in data) {
            if (!data.hasOwnProperty(key)) {
                return
            }
            state[key] = data[key]
        }
    },
}
const actions: ActionTree<LoginState, any> = {
    UPDATE_STATE_ASYN({ commit, state: LoginState }, data: LoginState) {
        commit('UPDATE_STATE', data)
    },
    LOGIN({ commit, state: LoginState }) {
        LoginApi.login()
    },
}
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}
