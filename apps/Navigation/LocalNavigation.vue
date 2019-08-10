<template lang="pug">
q-navigation(
    v-if="navGroup"
    v-slot="{ routes }"
    :group="navGroup"
)
    nav.LocalNavigation(
        v-bind="$vefa.element"
    )
        li(
            v-bind="$vefa.item"
            v-for="route in routes"
            :key="route.id"
        )
            g-link(
                v-bind="$vefa.link"
                :to="{ name: route.id }"
            ).
                {{ route.navLabel }}

            slot(
                name="nav-children"
                v-bind="{ route }"
            )
</template>


<script>
import QNavigation from "@Navigation/QNavigation"

export default {
    name: "LocalNavigation",
    props: {
        navGroup: {
            type: String,
            default: null
        }
    },
    components: {
        QNavigation
    }
}
</script>


<vefa>
element:
    o-base: flex:h--p:start
    o-economy: flex:v

item:
    o-base: module:static flex:h:wrap--p:start
    o-economy: edge:yEnd--def:tint

link:
    active-class: is-active
    class: type:chrome--face:chrome--case:upper control:muted fx:shift
    o-base: module:static flex:hAuto--p:middle--s:middle pad:xyEq100
    o-economy: module:balance flex:hAuto--p:start
</vefa>

<style lang="stylus">
</style>
