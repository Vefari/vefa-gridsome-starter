<template lang="pug">
header.SiteMasthead(
    v-bind="$vefa.element"
)
    g-link.SiteMasthead-mediaFrame(
        v-bind="$vefa.mediaFrame"
        :to="{ name: 'homepage' }"
    )
        h2.SiteMasthead-hed(
            class="optics:a11y"
        ) {{ orgName }}

        g-image.SiteMasthead-media(
            alt=""
            class="module:fill"
            immediate
            :src="require(`!!assets-loader!@res/${ logo }`)"
        )

    slot(name="navigation-control")
</template>


<script>
import {
    logo,
    org
} from "@data/site.yaml"

export default {
    name: "SiteMasthead",
    inheritAttrs: false,
    data () {
        return {
            logo,
            orgName: org.name
        }
    }
}

export default SiteMasthead
</script>


<vefa>
element:
    o-base: module:static--index:start flex:h--p:middle--s:middle pad:xEq50 pad:yEq100

mediaFrame:
    o-base: module:static flex:h--p:middle--s:middle aspect:xEq60--view iso:xEndAuto
    o-condensed: aspect:xEq40--view
    o-enhanced: flex:h--p:start
</vefa>


<style lang="stylus">
.SiteMasthead-mediaFrame
    +o-economy()
        max-width: 250px
</style>
