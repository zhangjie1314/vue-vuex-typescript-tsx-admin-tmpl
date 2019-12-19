import { LayoutState } from '@/types/views/layout.interface'
import { GetterTree, MutationTree, ActionTree } from 'vuex'
import * as LayoutApi from '@/api/layout'
const state: LayoutState = {
    menuList: [], // 菜单按钮
}
// 强制使用getter获取state
const getters: GetterTree<LayoutState, any> = {
    menuList: (state: LayoutState) => state.menuList,
}
// 更改state
const mutations: MutationTree<LayoutState> = {
    // 更新state都用该方法
    UPDATE_STATE(state: LayoutState, data: LayoutState) {
        for (const key in data) {
            if (!data.hasOwnProperty(key)) {
                return
            }
            state[key] = data[key]
        }
    },
    // 更新菜单
    UPDATE_MENULIST: (state) => {
        const premission = localStorage.getItem('permission')
        const localData = premission ? JSON.parse(premission) : []
        const menuList: any[] = []
        localData.forEach((el: any) => {
            menuList.push(itorater(el))
        })
        function itorater(menu: any): any {
            const list = []
            menu.subColumnList = menu.subColumnList ? menu.subColumnList : []
            if (menu.subColumnList) {
                for (let i = 0; i < menu.subColumnList.length; i++) {
                    if (menu.subColumnList[i].subColumnList) {
                        return itorater(menu.subColumnList)
                    } else {
                        menu.subColumnList[i].columnId = `${menu.columnId}-${i}`
                        list.push(menu)
                    }
                }
            }
            return menu
        }
        state.menuList = menuList
    },
}
const actions: ActionTree<LayoutState, any> = {
    UPDATE_STATE_ASYN({ commit, state: LayoutState }, data: LayoutState) {
        commit('UPDATE_STATE', data)
    },
    // GET_DATA_ASYN({ commit, state: LoginState }) {
    //     Layout.getData()
    // }
}
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}
