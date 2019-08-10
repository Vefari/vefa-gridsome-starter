<script>
//  for illustrative purposes for now, should be moved into appropriate app
import ModelForm from "@Forms/ModelForm"

import EmailField from "@fields/EmailField"
import TelField from "@fields/TelField"
import TextareaField from "@fields/TextareaField"
import TextField from "@fields/TextField"

export default {
    components: {
        ModelForm
    },
    data () {
        return {
            formSubmit: null,
            formSuccess: null
        }
    },
    computed: {
        // @desc    data model for form fields
        fields () {
            return {
                firstName: {
                    component: TextField,
                    label: "First Name",
                    required: true,
                },
                lastName: {
                    component: TextField,
                    label: "Last Name",
                    required: true,
                },
                email: {
                    component: EmailField,
                    label: "Email Address",
                    required: true,
                },
                phone: {
                    component: TelField,
                    label: "Phone Number",
                    helpText: "xxx-xxx-xxxx",
                },
                message: {
                    component: TextareaField,
                    label: "Message",
                    required: true,
                },
                ...ModelForm.methods.addHoneypot()
            }
        }
    },
    watch: {
        $context: {
            deep: true,
            handler ({ formSubmit, formSuccess }) {
                this.formSubmit = formSubmit
                this.formSuccess = formSuccess
            },
            immediate: true
        }
    },
    methods: {
        async handleSubmit ({ formData, isSpam, setErrorState }) {
            const redirectSuccess = () =>
                this.$router.replace({ name: this.formSuccess })

            try {
                if (isSpam) return redirectSuccess()

                const {
                    data: { status }
                } = await api.send({
                    route: this.formSubmit,
                    data: formData
                })

                if (status == "success") return redirectSuccess()
                else throw { message: FORM_ERRORS.INVALID_FORM }
            }
            catch ({ message }) {
                return setErrorState({ message })
            }
        }
    }
}
</script>

<template lang="pug">
model-form.ContactForm(
    :append-vefa-style="{ element: $vefa.element }"
    :fields="fields"
    @submit="handleSubmit"
)
    template(#actions="{ ActionControl }")
        component(
            class="control:action fx:shift"
            type="submit"
            inherit-style="controls.standard"
            :is="ActionControl"
        )
            template(#label) Contact Us
</template>

<vefa>
element:
    o-economy: aspect:xEq80--view
    o-full: aspect:xEq50--view
</vefa>


<style lang="stylus">
.ContactForm
    .form-fieldList
        +o-condensed()
            --col-template: repeat(2, 1fr)

    .field--textarea
        grid-column: span 2
</style>
