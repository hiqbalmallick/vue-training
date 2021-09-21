import { Module } from "vuex";
import { MUTATION_TYPES } from "./types";

const authModule: Module<any, any> = {
  namespaced: true,
  state: {
    text: "",
    color: "",
    timeout: "",
  },
  mutations: {
    [MUTATION_TYPES.SHOW_MESSAGE](state, payload) {
      state.text = payload.text;
      state.color = payload.color;
      state.timeout = payload.timeout;
    },
  },
  actions: {
    showSnack({ commit }, payload) {
      commit(MUTATION_TYPES.SHOW_MESSAGE, payload);
    },
  },
};

export default authModule;
