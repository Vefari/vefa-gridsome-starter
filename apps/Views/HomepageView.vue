<template lang="pug">
site-view
    template(#header)
        page-header
            template(#hed) {{ $context.lede }}

    template(#body)
</template>


<script>
import PageHeader from "@Blocks/PageHeader"
import SimpleHtml from "@Blocks/SimpleHtml"

export default {
    name: "HomepageView",
    components: {
        PageHeader,
        SimpleHtml,
    }
};
</script>


<vefa></vefa>


<style lang="stylus">
</style>
