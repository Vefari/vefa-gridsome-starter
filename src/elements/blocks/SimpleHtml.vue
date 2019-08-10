<template lang="pug">
component.copy(
    v-bind="$vefa.element"
    v-html="content"
    :is="tag"
)
</template>


<script>
export default {
    props: {
        content: {
            type: String,
            default: null
        },
        tag: {
            type: String,
            default: "div"
        }
    }
}
</script>


<vefa>
element: {}
</vefa>

<style lang="stylus">
</style>
