// login.Data 参数类型
export interface LoginData {
    pageName: string
    form: {
        name: string
        // tslint:disable-next-line: trailing-comma
        password: string
    }
}
export interface LoginFromData {
    name: string
    password: string
}
// VUEX login.State 参数类型
export interface LoginState {
    [key: string]: any
}
// GET_DATA_ASYN 接口参数类型
// export interface DataOptions {}
