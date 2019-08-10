<script>
import TextField from "@fields/TextField"

export default {
    name: "TelField",
    inheritAttrs: false,
    extends: TextField,
    props: {
        type: {
            type: String,
            default: "tel"
        },
        pattern: {
            type: String,
            default: "[0-9]{3}-[0-9]{3}-[0-9]{4}"
        }
    },
}
</script>
