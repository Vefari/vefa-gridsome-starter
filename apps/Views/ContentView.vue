<script>
import PageHeader from "@Blocks/PageHeader"

export default {
    name: "ContentView",
    components: {
        PageHeader,
    },
    computed: {
        form () {
            if (!this.$context.form) return null

            return () => import(`@forms/${ this.$context.form }`)
        }
    }
};
</script>

<template lang="pug">
site-view
    template(#header)
        page-header
            template(#hed) {{ $context.title }}
            template(#lede) {{ $context.lede }}

    template(#body)
        slot(name="body")
            .page-body(
                class="copy"
                v-html="$context.content"
                v-if="$context.content.trim()"
            )

            template(v-if="form")
                component(
                    :is="form"
                )
</template>
