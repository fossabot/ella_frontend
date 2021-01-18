import Vue from 'vue'
import Vuex from 'vuex'
import {normURLS} from "@/utilities/globals.mjs";
import {API_ROOT_URL, INSTANCE_ID} from "../../config";
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        mainData: null
    },
    mutations: {
        getMainData(state) {
            axios.get(normURLS(API_ROOT_URL) + '/' + INSTANCE_ID).then(res => {
                state.mainData = res.data;
            }).catch(error => state.mainData = {error});
        }
    },
    actions: {},
    modules: {},
    getters: {
        mainData: state => state.mainData
    }
})
