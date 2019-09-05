import { IndexState } from '@/types/views/index.interface'
import { GetterTree, MutationTree, ActionTree } from 'vuex'
import * as IndexApi from '@/api/index'
import Cookies from 'js-cookie'
const state: IndexState = {
    currentActive: '',
    sidebar: {
        opened: Cookies.get('sidebarStatus') || 1,
    },
}
// 强制使用getter获取state
const getters: GetterTree<IndexState, any> = {
    currentActive: (state: IndexState) => state.currentActive,
}
// 更改state
const mutations: MutationTree<IndexState> = {
    // 更新state都用该方法
    UPDATE_STATE(state: IndexState, data: IndexState) {
        for (const key in data) {
            if (!data.hasOwnProperty(key)) {
                return
            }
            state[key] = data[key]
        }
    },
    TOGGLE_SIDEBAR(state: IndexState) {
        if (state.sidebar.opened) {
            Cookies.set('sidebarStatus', '1')
        } else {
            Cookies.set('sidebarStatus', '0')
        }
        state.sidebar.opened = !state.sidebar.opened
    },
}
const actions: ActionTree<IndexState, any> = {
    ToggleSideBar: ({ commit }) => {
        commit('TOGGLE_SIDEBAR')
    },
    UPDATE_STATE_ASYN({ commit, state: IndexState }, data: IndexState) {
        commit('UPDATE_STATE', data)
    },
    // GET_DATA_ASYN({ commit, state: LoginState }) {
    //     Index.getData()
    // }
}
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}
