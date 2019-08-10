<template lang="pug">
header.header--page(
    v-bind="$vefa.element"
)
    .header-group--page(
        v-bind="$vefa.group"
    )
        h1.header-hed--page(
            v-bind="$vefa.hed"
            v-if="$scopedSlots.hed"
        )
            slot(name="hed")

        p.header-lede--page(
            v-bind="$vefa.lede"
            v-if="$scopedSlots.lede"
        )
            slot(name="lede")


    hr.header-rule--page(
        v-bind="$vefa.rule"
    )
</template>


<script>
export default {

}
</script>


<vefa>
element: {}
</vefa>


<style lang="stylus">
</style>
