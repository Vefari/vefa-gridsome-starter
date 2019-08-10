<script>
// import routes from "@data/navigation.yaml"
export default {
    props: {
        group: {
            type: String,
            default: null
        },
    },
    computed: {
        currentGroup () {
            let group = this.$static[this.group] || false
            return group && group.navigation
        },
        currentRoutes () {
            return this.currentGroup.map(
                ({ id, navLabel }) => ({
                    id,
                    navLabel,
                    href: this.$router.resolve({ name: id }).href || false
                })
            )
        },
        generatedProps () {
            return {
                group: this.group,
                routes: this.currentRoutes,
            }
        }
    },
    render () {
        return this.$scopedSlots.default
            ? this.$scopedSlots.default(this.generatedProps)
            : {}
    }
}
</script>

<static-query>
query {
    primary: contentPages(id: "homepage"){
        navigation {
          id
          navLabel
        }
    }
    # localNavigation: contentPages(id: "<page-id>"){
    #     navigation: localNavigation {
    #         id
    #         navLabel
    #     }
    # }
}
</static-query>
