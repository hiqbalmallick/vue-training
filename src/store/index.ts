import { CartItem, ProductItem } from "@/interfaces";
import productService from "@/services/products.service";
import { findIndex } from "@/utils/utils";
import Vue from "vue";
import Vuex from "vuex";
import { MUTATION_TYPES } from "./types";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: <Array<ProductItem>>[],
    cart: <Array<CartItem>>[],
  },
  mutations: {
    [MUTATION_TYPES.ADD_PRODUCT](state, payload: ProductItem) {
      state.products.push(payload);
    },
    [MUTATION_TYPES.SET_PRODUCTS_LIST](state, payload: Array<ProductItem>) {
      state.products = payload;
    },
    [MUTATION_TYPES.UPDATE_PRODUCT_QUANTITY](state, payload: number) {
      state.cart[payload] = {
        ...state.cart[payload],
        quantity: state.cart[payload].quantity + 1,
      };
    },
    [MUTATION_TYPES.ADD_TO_CART](state, payload: ProductItem) {
      state.cart.push({
        quantity: 1,
        product: payload,
      });
    },
    [MUTATION_TYPES.DELETE_FROM_CART](state, payload: number) {
      state.cart.splice(payload, 1);
    },
  },
  actions: {
    async fetchProducts({ commit }) {
      try {
        const response = await productService.get();
        commit(MUTATION_TYPES.SET_PRODUCTS_LIST, response);
      } catch (ex) {
        console.log(`ex`, ex);
      }
    },
    async addProduct({ commit }, data: ProductItem) {
      try {
        const response = await productService.add(data);
        commit(MUTATION_TYPES.ADD_PRODUCT, data);
      } catch (ex) {
        console.log(`ex`, ex);
      }
    },
    async addToCart({ commit, state }, data: ProductItem) {
      const index = findIndex(state.cart, data);
      if (index !== -1) {
        commit(MUTATION_TYPES.UPDATE_PRODUCT_QUANTITY, index);
      } else {
        commit(MUTATION_TYPES.ADD_TO_CART, data);
      }
    },
    async deleteFromCart({ commit, state }, data: ProductItem) {
      const index = findIndex(state.cart, data);
      commit(MUTATION_TYPES.DELETE_FROM_CART, index);
    },
  },
  modules: {},
});
