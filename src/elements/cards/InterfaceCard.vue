<template lang="pug">
component(
    v-bind="$vefa.element"
    :href="applyRouteToElement"
    :is="tag"
)
    slot(name="prepend")

    .card-content(
        v-bind="$vefa.content"
    )
        header.card-header(
            v-bind="$vefa.header"
        )
            slot(name="hed")
                h3.card-hed(
                    v-bind="$vefa.hed"
                ) {{ hed }}

        .card-body(
            v-bind="$vefa.body"
        )
            slot(
                name="body"
            )
                p {{ lede }}

        footer.card-footer(
            v-bind="$vefa.footer"
        )
            slot(
                name="footer"
                v-bind="{ $vefa, ActionControl, RouteControl }"
            )

    slot(name="append")
</template>


<script>
import ActionControl from "@controls/ActionControl"
import RouteControl from "@controls/RouteControl"

export default {
    inheritAttrs: false,
    components: {
        ActionControl
    },
    props: {
        actionLabel: {
            type: String,
            default: null
        },
        hed: {
            type: String,
            default: null
        },
        lede: {
            type: String,
            default: null
        },
        media: {
            type: String,
            default: null
        },
        route: {
            type: String,
            default: null
        },
        tag: {
            type: String,
            default: "div"
        },
    },
    data () {
        return {
            ActionControl,
            RouteControl
        }
    },
    computed: {
        applyRouteToElement () {
            return this.tag == "a"
                ? this.route
                : false
        }
    }
}
</script>


<vefa>
element:
    o-base: module:balance flex:h--p:full--s:full optics--hide:xyEq

content:
    o-base: flex:v grid:vContent--gaps:xyEq50
    o-condensed: grid:vContent--gaps:xyEq100

header:
    o-base: flex:v--p:start--s:middle

body:
    o-base: module:balance

footer:
    o-base: flex:v--p:middle--s:middle
</vefa>


<style lang="stylus">
.card-body
    grid-area: body

.card-content
    grid-area: content

.card-content
    --grid-iso-xyEq: 0
    --row-template: auto 1fr auto
    grid-template-areas: unquote('
        ". . ."
        ". header ."
        ". body ."
        ". footer ."
        ". . ."
    ')

.card-footer
    grid-area: footer

.card-header
    grid-area: header
</style>
