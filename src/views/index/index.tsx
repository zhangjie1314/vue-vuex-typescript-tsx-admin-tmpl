import { Component, Vue } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'
import { IndexData } from '@/types/views/index.interface'
import style from './index.module.scss'
@Component
export default class Index extends Vue {
    public pageName = 'index'

    public created() {
        //
    }
    public activated() {
        //
    }
    public mounted() {
        //
    }
    // 初始化函数
    public init() {
        //
    }

    protected render() {
        return <div class='indexWrap'>{this.pageName}</div>
    }
}
