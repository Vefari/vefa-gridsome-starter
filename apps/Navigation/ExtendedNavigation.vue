<template lang="pug">
nav.ExtendedNavigation-wrapper(
    v-bind="$vefa.wrapper"
)
    .ExtendedNavigation(
        v-bind="$vefa.element"
    )
        site-masthead(
            :append-vefa-style="$vefa.masthead"
        )

        .ExtendedNavigation-list
            q-navigation(
                v-slot="{ routes }"
                :group="navGroup"
            )
                component(
                    tag="ul"
                    :apply-vefa-style="$vefa.routeList"
                    :is="RouteList"
                    :routes="routes"
                )
</template>


<script>
import RouteList from "@lists/RouteList"
import QNavigation from "@Navigation/QNavigation"
import SiteMasthead from "@Runners/SiteMasthead"

export default {
    name: "ExtendedNavigation",
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
    data () {
        return {
            RouteList
        }
    }
}
</script>


<vefa>
masthead:
    element:
        class: motif:bright
        # edge:yEnd--def:tint

wrapper:
    o-base: fix:xyEq--z:modal flex:vAuto

element:
    class: motif:bright
    o-base: module:balance--z:modal grid:h
    o-economy: edge:xStart--def:tint

routeList:
    element:
        o-base: module:balance

    hed:
        class: motif:birght type:minor--weight:400
        o-base: module:static pad:xEq50 pad:yEq25

    list:
        o-base: module:static
        o-economy: flex:vAuto

    item:
        o-base: flex:v edge:yStart--def:tint

    # control:ghost--shade
    link:
        active-class: is-active
        class: ExtendedNavigation-link control:muted type:major--def:noWrap fx:shift
        o-base: module:static pad:xyEq50
        o-condensed: pad:xyEq100
        o-enhanced: type:subhed
</vefa>


<style lang="stylus">
.ExtendedNavigation-wrapper
    // pointer-events: none
    transform: translateZ(999)
    overflow-y: scroll
    will-change: transform

    &.is-active
        pointer-events: auto

    +over("economy")
        left: auto

.ExtendedNavigation
    --left-edge: 0%
    clip-path: polygon(var(--left-edge) 0%, var(--left-edge) 100%, 100% 100%, 100% 0%)
    grid-template-areas: unquote('
        "masthead"
        "list"
    ')
    grid-template-rows: auto 1fr
    grid-template-columns: 1fr

    +over("economy")
        --edge-width: 2px
        grid-template-rows: ratio(8.5) 1fr

    +over("enhanced")
        grid-template-rows: ratio(9) 1fr

    +over("extended")
        grid-template-rows: ratio(9.5) 1fr

.HomePage .ExtendedNavigation
    +over("economy")
        grid-template-rows: ratio(7) 1fr

    +over("enhanced")
        grid-template-rows: ratio(9) 1fr

    +over("extended")
        grid-template-rows: ratio(9.5) 1fr

.ExtendedNavigation .SiteMasthead
    grid-area: masthead

    +over("economy")
        --grid-iso-xStart: auto

        .SiteMasthead-actions
            padding-bottom: 30px

    +over("extended")
        .SiteMasthead-actions
            padding-bottom: 32px

.ExtendedNavigation .SiteMasthead-hed
    +over("economy")
        display: none

.ExtendedNavigation-link
    &::before
        left: -1px
        top: -1px
        bottom: -1px

.ExtendedNavigation-list
    --edge-width: 1px
    grid-area: list



[class~="fx:navSlide-enter"],
[class~="fx:navSlide-leave-to"]
    --left-edge: 100%

[class~="fx:navSlide-enter-to"],
[class~="fx:navSlide-leave"]
    --left-edge: 0%

[class~="fx:navSlide-enter-active"],
[class~="fx:navSlide-leave-active"]
    transition-delay: .25s
    transition-duration: .5s
    transition-timing-function: ease-in-out
    transition-property: clip-path
    will-change: clip-path
</style>
