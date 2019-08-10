<template lang="pug">
form-field(v-bind="$props")
    template(#field-header)

    template(#field="{ id, useStyle }")
        label.field-label(
            v-bind="useStyle.boolField.label"
            :for="id"
        )
            input(
                type="checkbox"
                v-bind="useStyle.boolField.field"
                v-model="localValue"
                :id="id"
                :name="name"
                :required="required"
            )

            span {{ label }}

            span.field-required(
                v-bind="useStyle.required"
                v-if="required"
            ) [required]

        slot(name="extra")
</template>


<script>
import FormField from "@fields/FormField"

export default {
    name: "BoolField",
    inheritAttrs: false,
    components: {
        FormField,
    },
    props: {
        ...FormField.props,
        type: {
            type: String,
            default: "bool"
        },
    },
    data () {
        return {
            stagedValue: this.value,
        }
    },
    computed: {
        // @prop    isDirty
        // @desc    has field's value has changed from its original
        isDirty () { return this.stagedValue !== this.initialValue },

        // @desc    interface to the field value
        localValue: {
            get () { return this.stagedValue },
            set (value) {
                this.stagedValue = value
                this.$emit(
                    "input",
                    {
                        name: this.name,
                        isDirty: this.isDirty,
                        value
                    }
                )
            }
        }
    }
}
</script>

<vefa></vefa>

<style lang="stylus">
</style>
