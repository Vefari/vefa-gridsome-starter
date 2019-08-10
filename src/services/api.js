// Axios declaration
import Axios from 'axios'

// set up CSRF for use with Django.Python server
// Axios.defaults.xsrfCookieName = "csrftoken"
// Axios.defaults.xsrfHeaderName = "X-CSRFToken"


// API class
// a wrapper using Axios and simplifies Vuex-Orm actions
class API {
    constructor () {
        this.routes = {}
        this.mediaHeader = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
    }

    addRoutes ({ routes }) {
        this.routes = {
            ...this.routes,
            ...routes
        }
    }

    // get data from server database
    async fetch ({ route }) {
        return await Axios.get(route)
    }

    // send new data to an endpoint
    async send ({ route, data, headers = {}}) {
        return await Axios.post( route, data, headers )
    }

    // send new data to server database
    async insert ({ route, data }) {
        return await Axios.post(route, data)
    }

    // update a record on the server database
    async update ({ route, data }) {
        return await Axios.put(route, data)
    }

    // delete a record on the server database
    async delete ({ route, data }) {
        return await Axios.delete(route, data)
    }

    // create a new media file and corresponding database record
    // similar to insert, but we need a different header for the media file
    async insertMedia ({ route, data, headers = this.mediaHeader }) {
        return await Axios.post(route, data, headers)
    }

    async updateMedia ({ route, data, headers = this.mediaHeader }) {
        return await Axios.put(route, data, headers)
    }
}

export default new API()
