<template lang="pug">
#app(
    v-bind="$vefa.element"
)
    slot(name="prepend")

    slot(name="masthead")
        site-masthead(
            :append-vefa-style="$vefa.masthead"
        )
            template(#navigation-control)
                extended-navigation-control

    main(
        v-bind="$vefa.main"
    )
        slot(name="main")
            slot(
                name="header"
            )
                page-header(
                    v-if="!$scopedSlots.header"
                )

            slot(name="body")
            slot(name="footer")

    slot(name="navigation")
        site-navigation(
            :append-vefa-style="$vefa.navigation"
            :nav-group="navGroup"
        )

        extended-navigation(
            :nav-group="navGroup"
        )


    slot(name="colophon")
        site-colophon

    slot(name="append")
</template>


<script>
import ExtendedNavigationControl from "@Navigation/ExtendedNavigationControl"
import ExtendedNavigation from "@Navigation/ExtendedNavigation"
import SiteColophon from "@Runners/SiteColophon"
import SiteMasthead from "@Runners/SiteMasthead"
import SiteNavigation from "@Navigation/SiteNavigation"
import PageHeader from "@Blocks/PageHeader"

export detault {
    name: "ALP",
    metaInfo () {
        // @desc    update page's meta tags with appropriate data
        return {
            title: this.$context.title
        }
    },
    props: {
        navGroup: {
            type: String,
            default: "primary"
        }
    },
    provide () {
        return {
            inheritedStyles: {
                blocks: this.$vefa.blocks,
                controls: this.$vefa.controls
            }
        }
    },
    components: {
        ExtendedNavigation,
        ExtendedNavigationControl,
        PageHeader,
        SiteColophon,
        SiteMasthead,
        SiteNavigation
    },
}
</script>


<vefa>
element:
    class: motif:bright
    o-base: module:fill flex:v--p:start--s:start

main:
    o-base: module:balance--index:next flex:v--p:start pad:xEq50 pad:yEq100 rhy:yStart100
    o-economy: pad:xEq100 pad:yEq200 rhy:yStart200
    o-full: aspect:full

masthead:
    element:
        class: motif:bright edge:yEnd--def:tint
        o-economy: optics:a11y

navigation:
    element:
        class: motif:bright edge:yEnd--def:tint
        o-base: optics:a11y
        o-economy: optics:yes


blocks:
    minorNotice:
        element:
            class: motif:bright
            o-base: type:chrome--space:medium
            o-economy: type:min
            o-enhanced: aspect:xEq80--view
            o-full: aspect:xEq60--view

controls:
    standard:
        element:
            class: type:minor--weight:200--case:upper fx:shift
            o-base: module:static flex:hAuto--p:middle--s:middle pad:xEq50 pad:yEq25 rhy:xStart25
            o-economy: pad:xEq100 pad:yEq50
</vefa>


<style lang="stylus">
</style>
