import BoolField from "@fields/BoolField"

export const FORM_ERRORS = {
    INVALID_FORM: "We are currently experiencing an issue. Please try again."
}

//  see about making this its own component to simplify things
export const addHoneypot = () => ({
    "csrf-honeypot": {
        component: BoolField,
        label: "Please leave this alone",
        value: false,
        type: "honeypot"
    }
})


export const checkHoneypot = ({ fields }) => {
    let honeypot = fields.find(
        ({ name }) => name == "csrf-honeypot"
    )
    return (honeypot && honeypot.value)
}


export const packFormData = ({ fields }) => {
    let formData = new FormData()

    fields.forEach(
        ({ name, value }) => formData.append(name, value)
    )

    formData.append("host", location.host)

    return { formData }
}


export const packFieldData = ({ fields }) => ({
    fieldData: fields.map( ({ name, value }) => ({ name, value }) )
})


export default {
    props: {
        fields: {
            type: Object,
            default: null
        },

        name: {
            type: String,
            default: "form"
        },

        // @desc    passed true/false for show submission messages if desired
        processed: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            appliedFields: [],

            // @desc    true/false whether form is valid
            isValid: false,

            error: {
                message: "",
                current: false
            }
        }
    },
    computed: {
        generatedProps () {
            return {
                // checkValidity: this.checkValidity,
                error: this.error,
                fields: this.appliedFields,
                handleFieldValueUpdates: this.handleFieldValueUpdates,
                handleSubmit: this.handleSubmit,
                setErrorState: this.setErrorState
            }
        }
    },
    watch: {
        fields: {
            handler (fields) {
                this.handleInitialization({ fields })
            },
            immediate: true
        }
    },
    methods: {
        //  checks if the form is valid for further processing
        checkValidity () {
            this.isValid = this.$el.checkValidity()
            return this.isValid
        },

        convertFields ({ fields }) {
            return Object.entries(fields).reduce(
                (appliedFields, [ name, field ]) => {
                    appliedFields.push({
                        name,
                        id: `${ this.name}_${ name }`,
                        formName: this.name,
                        // ...this.getFromModel({ name, field })
                        ...field,
                        initialValue: field.value,
                        value: field.value,
                    })

                    return appliedFields
                },
                []
            )
        },

        handleFieldValueUpdates ({ name, value }) {
            this.setErrorState({ current: false })

            let field = this.appliedFields.find(
                (field) => field.name == name
            )
            field.value = value

            this.$emit(
                "fields-updated",
                { fields: this.appliedFields }
            )
        },

        handleInitialization ({ fields }) {
            this.appliedFields = this.convertFields({ fields })

            this.$emit(
                "fields-initialized",
                { fields: this.appliedFields }
            )
        },

        handleSubmit ({ target }) {
            const fields = this.appliedFields
            const { formData } = packFormData({ fields })
            const { fieldData } = packFieldData({ fields })
            const isValid = this.checkValidity({ $el: target })
            const isSpam = checkHoneypot({ fields })

            let payload = {
                fields,
                fieldData,
                formData,
                isSpam,
                isValid,
                setErrorState: this.setErrorState
            }


            const emit = () => this.$emit( "submit", payload )

            try {
                if (!isValid) throw { message: FORM_ERRORS.INVALID_FORM }
                return emit()
            }
            catch ({ message }) {
                return this.setErrorState({ message })
            }
        },

        setErrorState ({ message = "", current = !this.error.current }) {
            this.error = {
                message,
                current
            }
        }
    },
    render () {
        return this.$scopedSlots.default
            ? this.$scopedSlots.default(this.generatedProps)
            : {}

    }
}
