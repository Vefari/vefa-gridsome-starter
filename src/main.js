import "typeface-montserrat"
import meta from "@data/meta.yaml"
import vefa from "@themes/vefa/vefa.styl"
import app from "@themes/v1/app.styl"

import store from "@store"

import SiteView from "@views/SiteView"
import attachIcons from "@icons/icons"

export default function (Vue, { router, head, isClient }) {
    //  Set default layout as a global component
    Vue.component("SiteView", SiteView)

    attachIcons(Vue)


    head.titleTemplate = title =>
        (title && title !== meta["application-name"])
            ? `${ title } — ${ meta["application-name"] }`
            : meta["application-name"]


    //  assign global metadata
    Object.entries(meta).forEach(
        ([ key, value ]) => head.meta.push({ name: key, content: value })
    )
}
