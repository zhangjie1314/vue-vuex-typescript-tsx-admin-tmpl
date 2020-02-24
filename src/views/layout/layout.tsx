import { Component, Vue } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'
import { LayoutData } from '@/types/views/layout.interface'
import { Sidebar } from '@/components/index'
import Router from '@/router/router'

import style from './layout.module.scss'

@Component({
    components: {
        Sidebar,
    },
})
export default class Layout extends Vue {
    public userName = 'layout'
    public isCollapse = false
    public active = ''
    public menuList = Router
    public screenfull = true
    public handlerIsCollapse() {
        //
    }
    public handleCommand() {
        //
    }
    public editPassword() {
        //
    }
    public logout() {
        //
    }
    protected render() {
        return (
            <el-container>
                <el-aside style={{ width: this.isCollapse ? '64px' : '200px ' }} class='horizontal-collapse-transition'>
                    <Sidebar
                        props={{
                            menuList: this.menuList,
                        }}
                    />
                </el-aside>
                <el-container>
                    <el-header id='header' class={style['page-title']}>
                        <h2>Aine.让你的管理更高效更简单</h2>
                        <div class={style['user-operating']}>
                            <el-dropdown trigger='click' command={this.handleCommand}>
                                <span class={style.user}>
                                    <i class='el-icon-user-solid' />
                                    {this.userName}
                                </span>
                                <el-dropdown-menu slot='dropdown' style='width:120px'>
                                    <el-dropdown-item command='setPw'>
                                        <span class='inlineBlock' on-click={this.editPassword}>
                                            修改密码
                                        </span>
                                    </el-dropdown-item>
                                    <el-dropdown-item command={this.logout} class='inlineBlock'>
                                        退出
                                    </el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>
                    </el-header>
                    <el-main>
                        <router-view />
                    </el-main>
                </el-container>
            </el-container>
        )
    }
}
