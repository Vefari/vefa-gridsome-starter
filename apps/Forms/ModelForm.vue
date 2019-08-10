<template lang="pug">
form-manager(
    v-bind="$props"
    v-slot="{ error, fields, handleFieldValueUpdates, handleSubmit }"
    @fields-updated="$emit('fields-updated', $event)"
    @submit="$emit('submit', $event)"
)
    form(
        v-bind="$vefa.element"
        @submit.prevent="handleSubmit"
    )
        slot(
            name="onIncomplete"
            v-if="!processed"
        )
            .form-body(
                v-bind="$vefa.body"
            )
                slot(
                    name="message"
                )
                    div(
                        v-bind="$vefa.error.element"
                        v-if="error.current"
                    )
                        p(
                            v-bind="$vefa.error.body"
                        ) {{ error.message }}


                slot(
                    name="content"
                )

                slot(
                    name="fields"
                )
                    form-fieldset(
                        :apply-vefa-style="$vefa"
                        :fields="fields"
                        @input="handleFieldValueUpdates"
                    )

            slot(
                name="actionMenu"
            )
                footer.form-footer(
                    v-bind="$vefa.footer"
                )
                    slot(
                        name="actions"
                        v-bind="{ ActionControl, handleSubmit }"
                    )
                        component(
                            class="control:primary fx:shift"
                            inherit-style="controls.standard"
                            :is="ActionControl"
                        )
                            template(#label) Action
        slot(
            name="onComplete"
            v-if="processed"
        )
</template>


<script>
import { inheritStyle } from "@ststyleinjectyle"
import FormManager, { addHoneypot } from "@Forms/manager"

import ActionControl from "@controls/ActionControl"
import FormFieldset from "@blocks/FormFieldset"

export default {
    props: {
        ...FormManager.props
    },
    inject: [ inheritStyle.injectedFrom ],
    provide () {
        return {
            inheritedStyles: {
                ...this.inheritedStyles,
                form: this.$vefa
            }
        }
    },
    components: {
        FormFieldset,
        FormManager
    },
    data () {
        return {
            ActionControl
        }
    },
    methods: {
        addHoneypot
    }
}
</script>


<vefa>
element:
    o-base: grid:h--gap:xEq150--gap:yEq100

footer:
    o-base: flex:h--p:end--s:middle iso:yStart50 rhy:xStart50
    o-extended: rhy:xStart100

error:
    element:
        class: type:minor--weight:700 motif:bright--shift:shade color:negative edge:xyEq--def:tint
        o-base: pad:xyEq50

    hed:
        class: type:minor--face:chrome--weight:700

    body:
        class: type:minor--face:chrome--weight:400

body:
    o-base: module:balance rhy:yStart100

primaryAction:
    class: type:base control:primary fx:shift
    o-base: module:static flex:hAuto--p:middle--s:middle pad:xEq100 pad:yEq50 rhy:xStart50

fieldList:
    o-base: grid:h--gap:xyEq100

field:
    element:
        o-base: flex:v--p:start--s:full rhy:yStart10

    label:
        class: type:minor--weight:700 color:secondary
        o-base: module:static flex:h--p:grid--s:base

    required:
        class: type:caption--weight:400 color:notice
        o-base: iso:xStartAuto

    helpText:
        class: type:caption--case:upper color:minor

    body:
        class: motif:bright--shift:shade fx:shift
        o-base: module:static flex:h--p:start--s:start pad:xyEq25

    field:
        class: type:base motif:bright color:secondary edge:xyEq--def:tint fx:shift
        o-base: flex:h--p:start--s:base pad:xEq50 pad:yEq10

    boolField:
        label:
            class: type:minor--weight:400 color:secondary
            o-base: module:static flex:h--p:start--s:middle pad:xStart50 rhy:xStart50

        field:
            class: type:caption
</vefa>


<style lang="stylus">
textarea
    height: ratio(9)
</style>
