import { Component, Vue, Prop } from 'vue-property-decorator'
import { Getter, Action, State, namespace } from 'vuex-class'
import { TestData } from '@/types/components/sidebar.interface.ts'
import logoImg from '@/assets/images/ejoy-logo.png'
import style from './index.module.scss'

const AppStoreModule = namespace('Index')

@Component
export default class Sidebar extends Vue {
    public componentName = 'Sidebar Component!'
    // prop
    @Prop({
        required: true,
        default: () => [],
    })
    public menuList!: [any?]

    // state
    @AppStoreModule.State('sidebar')
    public sidebar: any

    // state
    @AppStoreModule.State('currentActive')
    public currentActive!: string

    @AppStoreModule.Action('ToggleSideBar')
    public ToggleSideBar!: any

    get isCollapse() {
        return !this.sidebar.opened
    }

    public handleClose() {
        //
    }

    public handleOpen() {
        //
    }

    public handleSelect() {
        //
    }
    public mounted() {
        //
    }

    // 子菜单
    public subMenuNode(sub: [any]) {
        sub.map((item, idx) => {
            return (
                <el-menu-item key={idx} index={item.meta.path}>
                    {item.meta.title}
                </el-menu-item>
            )
        })
    }

    protected render() {
        return (
            <div class={style['sidebar-menu']}>
                <div class={style.logo}>
                    <img style='width:64px' src={logoImg} />
                </div>
                <el-menu
                    props={{
                        select: this.handleSelect,
                        open: this.handleOpen,
                        close: this.handleClose,
                    }}
                    background-color='#2c3742'
                    text-color='#fff'
                    active-text-color='#ffd04b'
                    default-active={this.currentActive}
                    class={style['el-menu-vertical']}
                    collapse={this.isCollapse}
                >
                    {this.menuList.map((sub, idx) => {
                        return (
                            <el-submenu key={idx} index={sub.path} v-show={!sub.meta.hide}>
                                <div slot='title'>
                                    <i class='el-icon-s-home' />
                                    <span slot='title'>{sub.meta.title}</span>
                                </div>
                                {sub.children && sub.children.length > 0 ? this.subMenuNode(sub.children) : ''}
                            </el-submenu>
                        )
                    })}
                </el-menu>
            </div>
        )
    }
}
