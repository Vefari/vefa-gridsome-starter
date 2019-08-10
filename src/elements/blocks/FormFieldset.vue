<template lang="pug">
fieldset.form-fieldset(
    :o-base="flex"
)
    ol.form-fieldList(
        v-bind="$vefa.fieldList"
    )
        slot
            component(
                v-bind="field"
                v-for="field in fields"
                v-on="$listeners"
                :apply-vefa-style="$vefa"
                :is="field.component"
                :key="field.id"
            )

</template>


<script>
export default {
    name: "FormFieldset",
    props: {
        flex: {
            type: String,
            default: "module:static"
        },
        fields: {
            type: Array,
            default: () => ([])
        }
    },
    inheritAttrs: false,
}
</script>


<vefa>
</vefa>


<style lang="stylus">
</style>
