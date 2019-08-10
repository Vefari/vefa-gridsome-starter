<template lang="pug">
transition(
    name="fx:fadeOut"
    @after-enter="$emit('clear', $event)"
)
    aside(
        v-bind="$vefa.element"
        v-if="isActive"
    )
        header(
            v-bind="$vefa.header"
        )
            h4(
                v-bind="$vefa.hed"
            ) ALP

        hr(
            v-bind="$vefa.rule"
        )

        p(
            v-bind="$vefa.content"
        ) {{ message }}

        button(
            type="button"
            v-bind="$vefa.closeControl.element"
            @click="$emit('clear', $event)"
        )
            cancel-action(
                v-bind="$vefa.closeControl.icon"
            )
</template>


<script>
export default {
    name: "SystemNotification",
    inheritAttrs: false,
    props: {
        message: {
            type: String,
            default: null
        },
        isActive: {
            type: Boolean,
            default: false
        }
    }
}
</script>


<vefa>
element:
    class: motif:neutral type:chrome fx:fadeOut--dx:delay5
    o-base: module:fill flex:h--p:start--s:middle pad:xyEq50 fix:xyEnd--z:modal
    o-enhanced: pad:xyEq100

header:
    o-base: module:static flex:hAuto--p:start--s:middle

hed:
    class: type:minor--weight:400--space:medium
    o-base: module:balance

rule:
    class: edge:vr--def:tint
    o-base: module:static--self:yFull iso:xStart50

content:
    o-base: module:static iso:xStart50

closeControl:
    element:
        class: type:caption color:minor fx:shift
        o-base: module:static--self:base flex:vAuto--p:middle--s:middle aspect:xyEq150--rhy iso:xStartAuto

    icon:
        o-base: aspect:xyEq150--text
</vefa>


<style lang="stylus">
</style>
