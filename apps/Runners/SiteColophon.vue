<template lang="pug">
footer.SiteColophon(
    v-bind="$vefa.element"
)
    g-link.SiteColophon-mediaFrame(
        :to="{ name: 'homepage' }"
    )
        g-image(
            alt="Alliance for Listeriosis Prevention Logo"
            class="module:fill"
            immediate
            :src="require(`!!assets-loader!@res/${ logo }`)"
        )

    contact-info(
        v-bind="org"
        :merge-vefa-style="$vefa.contact"
    )
</template>


<script>
import {
    logo,
    org
} from "@data/site.yaml"

import ContactInfo from "@contacts/ContactInfo"

export default {
    components: {
        ContactInfo
    },
    data () {
        return {
            logo,
            org
        }
    },
}
</script>


<vefa>
element:
    class: motif:bright edge:yStart--def:tint
    o-base: module:static--index:end--z:runners flex:v--p:start--s:middle pad:xEq50 pad:yEq100 rhy:yStart100
    o-condensed: flex:h--p:grid--s:middle grid:h
    o-enhanced: pad:xEq100
    o-full: aspect:full

contact:
    element:
        class: type:caption--lead:base
        o-economy: flex:v--p:start--s:end

    itemNext:
        class: edge:xStart--def:tint
        o-base: module:static pad:xStart25 iso:xStart25
</vefa>


<style lang="stylus">
.SiteColophon
    +o-condensed()
        --col-template: 1fr max-content

    +o-economy()
        --col-template: 1fr 4fr

.SiteColophon-mediaFrame
    max-width: 250px
</style>
