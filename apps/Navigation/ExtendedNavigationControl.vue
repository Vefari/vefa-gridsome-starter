<template lang="pug">
nav(
    v-bind="$vefa.element"
)
   button(
        type="button"
        v-bind="$vefa.link"
        @click="$emit('nav-state-change', $event)"
    )
        menu-action(
            v-bind="$vefa.icon"
        )

        span Menu
</template>


<script>
export default {
    name: "ExtendedNavigationControl"
}
</script>


<vefa>
element:
    o-base: module:static flex:hAuto--p:end--s:middle

link:
    class: type:chrome--case:upper control:link--ghost fx:shift
    o-base: flex:hAuto--p:start--s:middle pad:xEq50 pad:yEq10 rhy:xStart50

icon:
    o-base: aspect:xyEq100--text
    o-economy: aspect:xyEq150--text
    style:
        transform: translateY(1px)
</vefa>


<style lang="stylus">
</style>
