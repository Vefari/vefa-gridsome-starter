<template lang="pug">
component(
    v-bind="$vefa.element"
    :is="this.tag"
)
    component(
        v-bind="$vefa.header"
        v-if="showHeader"
        :is="elements.header"
    )
        component(
            v-bind="$vefa.hed"
            :is="elements.hed"
        ) {{ title }}

    template(
        v-for="route in routes"
    )
        component(
            v-bind="$vefa.item"
            :is="elements.item"
            :key="route.slug"
        )
            router-link(
                v-bind="$vefa.link"
                :to="{ name: route.id }"
            ) {{ route.navLabel || route.shortName || route.name }}
</template>


<script>
export default {
    name: "RouteList",
    inheritAttrs: false,
    props: {
        routes: {
            type: Array,
            default: null
        },
        tag: {
            type: String,
            default: "dl",
            validator (tag) {
                return [
                    "dl",
                    "nav",
                    "ul"
                ].includes(tag)
            }
        },
        title: {
            type: String,
            default: null
        },
    },
    computed: {
        elements () {
            const tags = {
                "dl": {
                    header: "dt",
                    hed: "span",
                    item: "dd"
                },
                "nav": {
                    header: "header",
                    hed: "h5",
                    item: "li"
                },
                "ul": {
                    item: "li"
                }
            }
            return tags[this.tag ]
        },
        showHeader () {
            return (this.tag !== "ul" && !!this.title)
        }
    }
}
</script>

<vefa>
element: {}
</vefa>


<style lang="stylus">
</style>
