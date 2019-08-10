<template lang="pug">
address(
    v-bind="$vefa.element"
)
    header.contact-header(
        v-bind="$vefa.header"
    )
        component.contact-hed(
            v-bind="$vefa.hed"
            :is="headingTag"
            :to="{ name: this.route }"
        ) {{ name }}

    dl.contact-info(
        v-bind="$vefa.content"
    )
        .contact-group--address(
            v-bind="$vefa.group"
            v-if="street || locality"
        )
            dt.contact-group-title(
               v-bind="$vefa.groupLabel"
            ) Address

            dd.contact-address-street(
                v-bind="$vefa.item"
                v-if="street"
            ) {{ street }}

            dd.contact-address-locality(
                v-bind="$vefa.item"
                v-if="locality"
            ) {{ locality }}


        .contact-group--extra(
            v-bind="$vefa.group"
        )
            dt.contact-group-title(
               v-bind="$vefa.groupLabel"
            ) Contact us

            dd.contact-extra-tel(
                v-bind="$vefa.item"
                v-if="parsedPhone"
            )
                a(
                    :href="`tel:${ parsedPhone.join('') }`"
                )
                    span(
                        v-bind="$vefa.itemLabel"
                    ) Tel:&nbsp;

                    span ({{ parsedPhone[0] }}) {{ parsedPhone[1] }}-{{ parsedPhone[2] }}

            dd.contact-extra-email(
                v-bind="[$vefa.item, $vefa.itemNext]"
                v-if="email"
            )
                a(
                    :href="`mailto:${ email }`"
                )
                    span(
                        v-bind="$vefa.itemLabel"
                    ) Email:&nbsp;

                    span {{ email }}
</template>


<script>
export default {
    name: "ContactInfo",
    inheritAttrs: false,
    props: {
        city: {
            type: String,
            default: null
        },
        email: {
            type: String,
            default: null
        },
        name: {
            type: String,
            default: null
        },
        phone: {
            type: [String, Number],
            default: null
        },
        route: {
            type: String,
            default: null
        },
        state: {
            type: String,
            default: null
        },
        street: {
            type: String,
            default: null
        },
        zipcode: {
            type: [String, Number],
            default: null
        },
    },
    computed: {
        headingTag () {
            return this.route ? "g-link" : "h5"
        },
        locality () {
            let locality = false
            locality = this.city || locality
            locality = this.state ? `${ locality }, ${ this.state }` : locality
            locality = this.zipcode ? `${ locality } ${ this.zipcode }` : locality
            return locality
        },
        parsedPhone () {
            if (!this.phone) return null
            let phone = this.phone.toString()

            return [
                phone.substring(0, 3),
                phone.substring(3, 6),
                phone.substring(6, 10)
            ]
        }
    }
}
</script>


<vefa>
element:
    o-base: module:static


header:
    o-base: flex:vAuto--p:start
    o-condensed: flex:hAuto--p:start

group:
    o-base: flex:h--p:start

groupLabel:
    class: optics:a11y
</vefa>


<style lang="stylus">
</style>
