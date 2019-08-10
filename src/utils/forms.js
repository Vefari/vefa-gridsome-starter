// dynamic label filter for certain Vue Components
// current set up for file input components
export const dynamicLabel = {
    inserted (el, bindings) {
        const fileInput = document.getElementById( el.getAttribute('for') )
        const initLabel = el.innerHTML;

        if (!fileInput) return false

        // helps to display a nice version of what files you are sending to the server/API
        fileInput.addEventListener(
            'change',
            function (e) {
                let fileName = ''
                const hasFiles = (this.files && this.files.length > 1)

                fileName = hasFiles
                    ? (this.getAttribute( 'data-multiple-caption' ) || '').replace('{count}', this.files.length)
                    : e.target.value.split( '\\' ).pop()

                el.innerHTML = (fileName) ? fileName : initLabel
            }
        )
    }
}
