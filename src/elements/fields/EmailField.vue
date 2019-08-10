<script>
import TextField from "@fields/TextField"

export default {
    name: "EmailField",
    inheritAttrs: false,
    extends: TextField,
    props: {
        type: {
            type: String,
            default: "email"
        }
    },
}
</script>
