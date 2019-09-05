import { Component, Vue } from 'vue-property-decorator'
import style from './App.module.scss'

@Component
export default class App extends Vue {
    protected render() {
        return (
            <div class={style.rootApp}>
                {this.$route.meta.keepAlive ? (
                    <keep-alive>
                        <router-view />
                    </keep-alive>
                ) : (
                    <router-view />
                )}
            </div>
        )
    }
}
