const firebase = require('firebase/app')
require('firebase/auth')
require('firebase/firestore')


class FirebaseSource {
    static get defaultOptions () {
        return {
            collections: [],
            connection: {
                username: process.env.FIREBASE_USERNAME,
                password: process.env.FIREBASE_PW,
            },
            firebase: {
                apiKey: process.env.GRIDSOME_FIREBASE_APIKEY || process.env.FIREBASE_APIKEY,
                authDomain: process.env.GRIDSOME_FIREBASE_AUTH_DOMAIN || process.env.FIREBASE_AUTH_DOMAIN,
                databaseURL: process.env.GRIDSOME_FIREBASE_DATABASE_URL || process.env.FIREBASE_DATABASE_URL,
                projectId: process.env.GRIDSOME_FIREBASE_PROJECT_ID || process.env.FIREBASE_PROJECT_ID,
                storageBucket: process.env.GRIDSOME_FIREBASE_STORAGE_BUCKET || process.env.FIREBASE_STORAGE_BUCKET,
                messagingSenderId: process.env.GRIDSOME_FIREBASE_MESSAGING_SENDER_ID || process.env.FIREBASE_MESSAGING_SENDER_ID,
            }
        }
    }

    constructor (api, options) {
        this.options = options
        if (!firebase.apps.length) {
            firebase.initializeApp(this.options.firebase)
        }

        this.collections = this.options.collections.map(
            ([ typeName, collection ]) => ({
                typeName,
                collection,
                data: null
            })
        )
    }

    async connect () {
        const {
            connection: {
                username,
                password
            }
        } = this.options

        try {
            await firebase.auth().signInWithEmailAndPassword(username, password)
        }
        catch (err) {
            console.log(err)
        }
    }

    async disconnect () {
        try {
            await firebase.auth().signOut()
            return
        }
        catch (err) {
            return console.log(err)
        }
    }

    async fetchCollection ({ collection, data}) {
        const db = firebase.firestore().collection(collection)
        return await db.get()
    }

    async generateCollections () {
        if (firebase.auth().currentUser) {
            for (const collection of this.collections) {
                collection.data = await this.fetchCollection(collection)
            }
        }
        return
    }

    stageSources (store) {
        const { addContentType } = store

        this.collections.forEach(
            ({ typeName, data }) => {
                const contentType = addContentType({ typeName })
                // if (data.length > 0) {
                for (const doc of data.docs) {
                    contentType.addNode({
                        id: doc.id,
                        fields: {
                            ...doc.data()
                        }
                    })
                }
                // }
            }
        )
    }

    static init (api, options) {
        options = {
            ...FirebaseSource.defaultOptions,
            ...options
        }

        if (!options.connection.username || !options.connection.password) {
            console.log("No Firebase Connection Data (username, password)")
            return
        }
        else {
            const FSource = new FirebaseSource(api, options)

            api.loadSource(async store => {
                await FSource.connect()
                await FSource.generateCollections()
                FSource.stageSources(store)
                await FSource.disconnect()
            })
        }
    }

}


module.exports = function (api, options) {
    FirebaseSource.init(api, options)
}
