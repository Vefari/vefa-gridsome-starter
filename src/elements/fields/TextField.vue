<template lang="pug">
form-field(v-bind="$props")
    template(#field="{ id, useStyle }")
        input(
            v-bind="[useStyle.field, fieldMeta]"
            v-model="localValue"
            :id="id"
            :name="name"
            :pattern="fieldMeta.pattern || pattern"
            :required="required"
            :type="type"
        )
</template>


<script>
import FormField from "@fields/FormField"

export default {
    name: "TextField",
    inheritAttrs: false,
    components: {
        FormField,
    },
    props: {
        ...FormField.props,
        type: {
            type: String,
            default: "text"
        }
    },
    data () {
        return {
            stagedValue: this.value,
        }
    },
    computed: {
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


<style lang="stylus"></style>
