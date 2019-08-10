<script>
// based in part on https://github.com/lorisleiva/vue-lab/tree/master/components/resizable-textarea

export default {
    name: "AutosizeTextarea",
    data () {
        return {
            existingStyles: {},
            initialHeight: "0px",
        }
    },
    mounted () {
        this.existingStyles = this.$el.getAttribute('style') || ""
        this.initialHeight = window.getComputedStyle(this.$el).getPropertyValue("height")
        this.$nextTick(() => this.amendStyle() )
        this.$el.addEventListener("input", this.resizeTextarea)
    },
    updated () {
        // used when async pasting in text from db
        this.$nextTick(() => this.amendStyle() )
    },
    beforeDestroy () {
        this.$el.removeEventListener("input", this.resizeTextarea)
    },
    methods: {
        amendStyle () {
            let autosizer = `${ this.existingStyles }height: ${ this.scrollHeight() };overflow-y:hidden;`
            this.$el.setAttribute("style", autosizer)
        },
        resizeTextarea (event) {
            event.target.style.height = "auto"
            event.target.style.height = this.scrollHeight()
        },
        scrollHeight () {
            // only start changing height if we need to start scrolling
            return (parseInt(this.initialHeight) >= this.$el.scrollHeight)
                ? this.initialHeight
                : `${ this.$el.scrollHeight }px`
        },

    },
    render () {
        return this.$slots.default[0]
    },
}
</script>
