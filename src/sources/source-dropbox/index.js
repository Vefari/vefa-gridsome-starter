require('isomorphic-fetch')
const DropboxApp = require("dropbox").Dropbox

class DropboxSource {
    static defaultOptions () {
        return {
            typeName: 'Dropbox',
            accessToken: process.env.DROPBOX_TOKEN,
            dbx: process.env.DROPBOX_STORE,
            baseSection: "general"
        }
    }

    constructor (api, options) {
        this.client = {}
        this.fileMeta = []
        this.options = options
        api.loadSource(args => this.fetchContent(args))
    }

    async getFileMetadata ( res ) {
        // if (!res.result || !res.result.id) return false
        let metadata = await this.client.filesGetMetadata({ path: res.result.path_lower })

        let pathArr = res.file.split("/")
        pathArr.shift()
        if (pathArr[0] === this.options.dbx) pathArr.shift()
        pathArr.pop()
        const section = (pathArr.length >= 1)
            ? pathArr[0]
            : this.options.baseSection
        const sectionSlug = section.replace(" ", "-")

        return {
            id: res.result.id.split(":")[1],
            clientModified: metadata.client_modified,
            file: res.file,
            name: res.result.name,
            section,
            sectionSlug,
            serverModified: metadata.server_modified,
            url: res.result.preview_url.split("?")[0],
        }
    }

    async getRecursiveDropboxListing ({ path }) {
        let { entries } = await this.client.filesListFolder({ path })
        for (const entry of entries) {
            if (entry[".tag"] == "folder") {
                let subEntries = await this.getRecursiveDropboxListing({ path: entry.path_lower })
                entries = entries.concat(subEntries)
            }
        }

        return entries.filter( entry => entry[".tag"] !== "folder" )
        // await this.client.sharingGetFileMetadataBatch({ files })
    }

    async fetchContent (store) {
        const { addContentType } = store
        const {
            typeName,
            route,
            defs,
            refs,
            accessToken,
            dbx
        } = this.options

        this.client = accessToken
            ? new DropboxApp({ accessToken, fetch })
            : false

        const cache = {}

        if (!this.client) return

        const contentType = addContentType({
            typeName,
            route
        })


        if (refs) {
            Object.entries(refs).forEach(
                ([ localKey, referenceType ])=> contentType.addReference(localKey, referenceType)
            )
        }


        this.fileMeta = await this.getRecursiveDropboxListing({ path: `/${ dbx }` })
        const filePaths = this.fileMeta.map(entry => entry.path_lower )
        const metadata = await this.client.sharingGetFileMetadataBatch({ files: filePaths })

        // console.log(metadata, metadata2)
        for (const item of metadata) {
            let contentItem = await this.getFileMetadata( item )
            if (contentItem && defs) {
                const mappedContent = Object.entries(defs).reduce(
                    (item, [ mappedKey, dataKey ]) => {
                        if (mappedKey.includes("fields__")) {
                            item.fields[mappedKey.replace("fields__", "")] = contentItem[dataKey]
                        }
                        else {
                            item[mappedKey] = contentItem[dataKey]
                        }
                        return item
                    },
                    {
                        fields: {}
                    }
                )
                contentType.addNode(mappedContent)
            }
        }
    }
}

module.exports = DropboxSource
