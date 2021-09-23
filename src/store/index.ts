import { CartItem, CommonStoreState, ProductItem } from "@/interfaces";
import productService from "@/services/products.service";
import { findIndex } from "@/utils/utils";
import Vue from "vue";
import Vuex from "vuex";
import { MUTATION_TYPES } from "./types";
import snackbar from "./modules/snackbar";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    product: <CommonStoreState<ProductItem>>{
      list: <Array<ProductItem>>[],
      value: <ProductItem>{},
    },
    cart: <CommonStoreState<CartItem>>{
      list: <Array<CartItem>>[],
      value: <CartItem>{},
    },
  },
  mutations: {
    [MUTATION_TYPES.ADD_PRODUCT](state, payload: ProductItem) {
      state.product.list.push(payload);
    },
    [MUTATION_TYPES.SET_PRODUCTS_LIST](state, payload: Array<ProductItem>) {
      state.product.list = payload;
    },
    [MUTATION_TYPES.SET_PRODUCTS_VALUE](state, payload: ProductItem) {
      state.product.value = payload;
    },
    [MUTATION_TYPES.UPDATE_PRODUCT_QUANTITY](state, payload: number) {
      state.cart.list[payload] = {
        ...state.cart.list[payload],
        quantity: state.cart.list[payload].quantity + 1,
      };
    },
    [MUTATION_TYPES.ADD_TO_CART](state, payload: ProductItem) {
      state.cart.list.push({
        quantity: 1,
        product: payload,
      });
    },
    [MUTATION_TYPES.DELETE_FROM_CART](state, payload: number) {
      state.cart.list.splice(payload, 1);
    },
  },
  getters: {
    productsList: (state) => state.product.list,
    productValue: (state) => state.product.value,
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
    async getProductById({ commit }, id: string) {
      try {
        const response = await productService.getById(id);
        commit(MUTATION_TYPES.SET_PRODUCTS_VALUE, response);
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
    async addToCart({ commit, dispatch, state }, data: ProductItem) {
      const index = findIndex(state.cart.list, data);
      if (index !== -1) {
        commit(MUTATION_TYPES.UPDATE_PRODUCT_QUANTITY, index);
      } else {
        dispatch(
          "snackbar/showSnack",
          {
            text: "Item added to cart!",
            color: "primary",
            timeout: 2000,
          },
          { root: true }
        );
        commit(MUTATION_TYPES.ADD_TO_CART, data);
      }
    },
    async deleteFromCart({ commit, dispatch, state }, data: ProductItem) {
      const index = findIndex(state.cart.list, data);
      commit(MUTATION_TYPES.DELETE_FROM_CART, index);
      dispatch(
        "snackbar/showSnack",
        {
          text: "Item deleted from cart!",
          color: "primary",
          timeout: 2000,
        },
        { root: true }
      );
    },
  },
  modules: {
    snackbar: snackbar,
  },
});
