export default {
    computed: {
        generatedProps () {
            return {}
        }
    },
    render () {
        return this.$scopedSlots.default
            ? this.$scopedSlots.default(this.generatedProps)
            : {}
    }
}
