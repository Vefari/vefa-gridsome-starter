import Vue from "vue"
import Vuex from "vuex"
import VuexORM from "@vuex-orm/core"

import { org: { shortName } } from "@data/site.yaml"

Vue.use(Vuex)

export const EventBus = new Vue()

// import { Events } from "@Events/models"

const database = new VuexORM.Database()
// database.register(Events)


export default new Vuex.Store({
    plugins: [VuexORM.install(database, { namespace: shortName })],
})
