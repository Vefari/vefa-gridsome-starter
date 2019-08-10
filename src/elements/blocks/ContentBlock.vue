<template lang="pug">
component.block--content(
    v-bind="$vefa.element"
    :is="tag"
)
    slot(
        name="prepend"
        v-bind="{ $vefa }"
    )

    header.block-header(
        v-bind="$vefa.header"
        v-if="hasHeader"
    )
        slot(
            name="hed"
            v-bind="{ $vefa, test: 'resds' }"
        )
            h2.block-hed(
                v-bind="$vefa.hed"
            ) {{ hed }}

        slot(
            name="lede"
            v-bind="{ $vefa }"
        )
            p.block-lede(
                v-bind="$vefa.lede"
                v-if="lede"
            ) {{ lede }}

        slot(
            name="extendHeader"
        )

    .block-body(
        v-bind="$vefa.body"
    )
        slot(
            name="body"
            v-bind="{ $vefa }"
        )

    slot(
        name="append"
        v-bind="{ $vefa }"
    )
</template>


<script>
export default {
    name: "ContentBlock",
    inheritAttrs: false,
    props: {
        hed: {
            type: String,
            default: null
        },
        lede: {
            type: String,
            default: null
        },
        tag: {
            type: String,
            default: "aside"
        }
    },
    computed: {
        hasHeader () {
            return this.hed
                || this.lede
                || this.$scopedSlots["hed"]
                || this.$scopedSlots["lede"]
        }
    }
}
</script>


<vefa>
element:
    o-base: module:static flex:v grid:vContent optics:xyEq--hide

header:
    class: optics--hide:empty
    o-base: module:static--z:above

body:
    o-base: module:static--z:above
</vefa>


<style lang="stylus">
.block--
    +class-partial()
        grid-template-areas: unquote('
            ". . ."
            ". header ."
            ". body ."
            ". . ."
        ')

.block-body
    grid-area: body

.block-header
    grid-area: header
</style>
