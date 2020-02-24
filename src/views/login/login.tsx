import { Component, Vue } from 'vue-property-decorator'
import { LoginFromData } from '@/types/views/login.interface'
import style from './login.module.scss'
import Cookies from 'js-cookie'

@Component
export default class Login extends Vue {
    public pageName: string = 'login'
    public form: LoginFromData = {
        name: '',
        password: '',
    }

    public rulesFrom = {
        name: [{ required: true, message: '用户名不能为空！', trigger: 'blur' }],
        password: [{ required: true, message: '用户密码不能为空！', trigger: 'blur' }],
    }

    public mounted() {
        //
        console.log(style)
    }

    public handleSubmit() {
        ; (this.$refs.loginForm as any).validate((res: any) => {
            Cookies.set('token', '1233465')
            this.$router.push({
                name: 'main_index',
            })
        })
    }

    protected render() {
        return (
            <div class={style.login}>
                <div class={style['login-con']}>
                    <el-card icon='log-in'>
                        <div slot='header'>
                            <span>欢迎登录</span>
                        </div>
                        <div class={style['form-con']}>
                            <el-form
                                ref='loginForm'
                                nativeOn-keydown={(arg: any) => arg.keyCode === 13 && this.handleSubmit()}
                                props={{
                                    model: this.form,
                                }}
                                rules={this.rulesFrom}
                            >
                                <el-form-item prop='name'>
                                    <el-input
                                        size='small'
                                        value={this.form.name}
                                        on-input={(val: string) => (this.form.name = val)}
                                        prefix-icon='el-icon-user-solid'
                                        placeholder='请输入用户名'
                                    />
                                </el-form-item>
                                <el-form-item prop='password'>
                                    <el-input
                                        size='small'
                                        type='password'
                                        prefix-icon='el-icon-lock'
                                        v-model={this.form.password}
                                        placeholder='请输入密码'
                                    />
                                </el-form-item>
                                <el-form-item>
                                    <el-button on-click={this.handleSubmit} size='small' type='primary' long={true}>
                                        登录
                                    </el-button>
                                </el-form-item>
                            </el-form>
                            <p class={style['login-tip']}>欢迎使用！</p>
                        </div>
                    </el-card>
                </div>
            </div>
        )
    }
}
