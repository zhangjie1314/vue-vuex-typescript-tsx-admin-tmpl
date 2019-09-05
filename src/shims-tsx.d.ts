import 'vue-tsx-support/enable-check';

import Vue, { VNode } from 'vue'

declare global {
    namespace JSX {
        // tslint:disable-next-line:no-empty-interface
        interface Element extends VNode {}
        // tslint:disable-next-line:no-empty-interface
        interface ElementClass extends Vue {}
        interface ElementAttributesPropery {
            $props: {}
        }
        interface IntrinsicElements {
        }
    }
}

declare module 'vue/types/options' {
    interface ComponentOptions<V extends Vue> {
        [propName: string]: any
        ref?: string
    }
}
