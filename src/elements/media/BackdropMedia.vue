<template lang="pug">
//- can we scale this down to just g-image/img?

.media--backdrop(
    v-bind="$vefa.element"
)
    g-image(
        v-if="backdrop"
        v-bind="$vefa.media"
        :alt="alt"
        :src="require(`!!assets-loader!@res/${ backdrop }`)"
    )
</template>


<script>
export default {
    name: "BackdropMedia",
    inheritAttrs: false,
    props: {
        alt: {
            type: String,
            default: ""
        },
        backdrop: {
            type: String,
            default: null
        }
    }
}
</script>


<vefa>
element:
    o-base: module:static

media:
    class: module:fill abs:xyEq fx:shift
</vefa>


<style lang="stylus">
.media--backdrop
    grid-column: 1 / -1
    grid-row: 1 / -1

    img
        object-fit: cover
</style>
