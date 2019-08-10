<script>
import { mountStyles, inheritStyle } from "@styleinject"

export default {
    name: "FormField",
    inheritAttrs: false,
    props: {
        inheritStyle: {
            type: String,
            default: "form.field"
        },
        error: {
            type: Object,
            default: () => ({})
        },
        fieldMeta: {
            type: Object,
            default: () => ({})
        },
        formName: {
            type: String,
            default: null
        },
        helpText: {
            type: String,
            default: null
        },
        id: {
            type: String,
            default: null
        },
        initialValue: {
            type: [Boolean, String, Number],
            default: null
        },
        label: {
            type: String,
            default: null
        },
        name: {
            type: String,
            default: null
        },
        pattern: {
            type: String,
            default: null
        },
        required: {
            type: Boolean,
            default: false
        },
        tag: {
            type: String,
            default: "li"
        },
        type: {
            type: String,
            default: null
        },
        value: {
            type: [Boolean, String, Number],
            default: null
        }
    },
    inject: [ inheritStyle.injectedFrom ],
    data () {
        return {
            useStyle: mountStyles(this)
        }
    },
    computed: {
        fieldClass () {
            let name = this.name.charAt(0).toUpperCase() + this.name.slice(1)
            return [
                `field--${ this.type }`,
                `field--${ this.formName }${ name }`,
                // if there is a honeypot, hide it from the visual ui
                this.type == 'honeypot' && 'optics:a11y'
            ].join(" ")
        },
    }
}
</script>

<template lang="pug">
compoennt(
    v-bind="useStyle.field.element"
    :class="fieldClass"
    :is="tag"
)
    slot(name="field-header")
        label.field-label(
            v-bind="useStyle.label"
            v-if="!$scopedSlots['field-header'] && label"
            :for="id"
        )
            span {{ label }}

            span.field-required(
                v-bind="useStyle.required"
                v-if="required"
            ) [required]

    slot(name="field-error")
        aside.field-error(
            v-bind="useStyle.error.element"
            v-if="error && error.current"
        )
            label(
                v-bind="useStyle.error.hed"
                :for="id"
            ).
                {{ label }}

            p(
                v-bind="useStyle.error.body"
            )
                label(
                    :for="id"
                ).
                    {{ error.errorText || "There is an error with this field" }}


    slot(name="field-body")
        .field-body(
            v-bind="useStyle.body"
        )
            slot(
                name="field"
                v-bind="{ id, useStyle }"
            )


    slot(name="field-help")
        label.field-help(
            v-bind="useStyle.helpText"
            v-if="helpText"
            :for="id"
        ) {{ helpText }}


    slot(name="field-footer")
</template>

<vefa></vefa>
