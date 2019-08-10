<script>
import TextField from "@fields/TextField"

export default {
    name: "PasswordField",
    inheritAttrs: false,
    extends: TextField,
    props: {
        type: {
            type: String,
            default: "password"
        }
    },
}
</script>
