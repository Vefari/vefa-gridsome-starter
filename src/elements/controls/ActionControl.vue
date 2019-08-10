<template lang="pug">
component(
    v-bind="{ ...useStyle.element, ...boundAttrs }"
    v-on="$listeners"
)
    slot(name="content")
        slot(name="icon")

        span
            slot(name="label") {{ actionLabel }}
</template>



<script>
import { mountStyles, inheritStyle } from "@styleinject"

export default {
    name: "ActionControl",
    inheritAttrs: false,
    props: {
        inheritStyle,
        actionLabel: {
            type: String,
            default: "Action"
        },
        route: {
            type: String,
            default: null
        },
    },
    inject: [ inheritStyle.injectedFrom ],
    data () {
        return {
            useStyle: mountStyles(this)
        }
    },
    computed: {
        boundAttrs () {
            const is = this.route ? "a" : "button"

            return {
                href: is == "a" ? this.route : false,
                is,
                type: is == "button" ? is : false,
            }
        }
    },
}
</script>


<vefa>
element: {}
</vefa>


<style lang="stylus">
</style>
