<template lang="pug">
component(
    v-bind="{ ...$vefa.element, ...boundAttrs }"
    v-on="$listeners"
)
    slot(name="icon")

    span
        slot(name="label") {{ actionLabel }}
</template>


<script>
export default {
    name: "RouteControl",
    inheritAttrs: false,
    props: {
        actionLabel: {
            type: String,
            default: "Action"
        },
        route: {
            type: String,
            default: null
        },
    },
    computed: {
        boundAttrs () {
            let is = this.isNamedRoute ? "g-link" : "a"

            return {
                href: !this.isNamedRoute ? this.route : false,
                is,
                to: this.isNamedRoute ? { name: this.route } : false
            }
        },
        isNamedRoute () {
            if (!this.route) return false
            const hasRoute = this.$router.getMatchedComponents({ name: this.route })
            return !!hasRoute.length
        }
    },
}
</script>


<vefa>
element: {}
</vefa>


<style lang="stylus">
</style>
