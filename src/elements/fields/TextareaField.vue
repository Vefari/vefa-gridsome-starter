<template lang="pug">
form-field(v-bind="$props")
    template(#field="{ id, useStyle }")
        autosize-textarea
            textarea(
                v-bind="[useStyle.field, fieldMeta]"
                v-model="localValue"
                :id="id"
                :name="name"
                :required="required"
            )
</template>


<script>
import AutosizeTextarea from "@fields/AutosizeTextarea"
import FormField from "@fields/FormField"

export default {
    name: "TextareaField",
    inheritAttrs: false,
    components: {
        AutosizeTextarea,
        FormField,
    },
    props: {
        ...FormField.props,
        type: {
            type: String,
            default: "textarea"
        }
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
    },
}
</script>

<vefa></vefa>

<style lang="stylus">
</style>
