import Vue from 'vue'
import Vuex from 'vuex'
import {normURLS} from "@/utilities/globals";
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    mainData: null
  },
  mutations: {
    getMainData(state) {
      axios.get(normURLS(process.env.VUE_APP_API_ROOT_URL) + '/' + process.env.VUE_APP_INSTANCE_ID).then(res => {
        state.mainData = res.data;
      });
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
    mainData: state => state.mainData
  }
})
