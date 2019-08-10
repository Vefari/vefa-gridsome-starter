<script>
import { NOTIFICATIONS } from "@data/constants.yaml"

import { EventBus } from "@store"

export default {
    data () {
        return {
            isActive: false,
            message: ""
        }
    },
    computed: {
        generatedProps () {
            return {
                message: this.message,
                isActive: this.isActive,
                setActiveState: this.setActiveState,
                setMessage: this.setMessage
            }
        },
    },
    methods: {
        relayInitialize () {
            this.$emit(
                "initialized",
                this.generatedProps
            )
        },

        setMessage ({ message }) {
            this.message = message
            this.setActiveState({ state: true })
        },

        setActiveState ({ state = !this.isActive }) {
            this.isActive = state
        },
    },
    mounted () {
        EventBus.$on(
            NOTIFICATIONS.DASHBOARD,
            ({ message }) =>
                this.setMessage({ message })
        )
        this.relayInitialize()
    },
    render () {
        return this.$scopedSlots.default
            ? this.$scopedSlots.default(this.generatedProps)
            : {}
    }
}

</script>
