<template lang="pug">
q-navigation(
    v-slot="{ routes }"
    :group="navGroup"
)
    nav.SiteNavigation(
        v-bind="$vefa.element"
    )
        site-masthead(
            :append-vefa-style="$vefa.masthead"
        )

        g-link(
            v-bind="$vefa.link"
            v-for="route in routes"
            :key="route.id"
            :to="{ name: route.id }"
        )
            span(
                o-base="module:balance"
            ).
                {{ route.navLabel }}
</template>


<script>
import SiteMasthead from "@Runners/SiteMasthead"
import QNavigation from "@Navigtion/QNavigation"

export default {
    name: "SiteNavigation",
    props: {
        navGroup: {
            type: String,
            default: "primary"
        }
    },
    components: {
        QNavigation,
        SiteMasthead
    },
}

</script>


<vefa>
element:
    o-economy: module:static--index:init flex:h--p:end--s:middle pad:xyEq50 rhy:xStart25
    o-enhanced: pad:xEq100
    o-full: aspect:full

masthead:
    element:
        o-base: optics:a11y
        o-economy: optics:yes aspect:xEq30--view pad:xyEq0 iso:xEndAuto

link:
    active-class: is-active
    class: type:chrome--case:upper control:link--ghost fx:shift
    o-base: module:static flex:hAuto--p:middle--s:middle pad:xEq50 pad:yEq10 rhy:xStart25
</vefa>


<style lang="stylus">
</style>
