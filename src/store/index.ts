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
    [MUTATION_TYPES.INCREMENT_PRODUCT_QUANTITY](state, payload: number) {
      const cart = { ...state.cart };
      cart.list[payload] = {
        ...cart.list[payload],
        quantity: cart.list[payload].quantity + 1,
      };
      state.cart = cart;
    },
    [MUTATION_TYPES.DECREMENT_PRODUCT_QUANTITY](state, payload: number) {
      const cart = { ...state.cart };
      cart.list[payload] = {
        ...cart.list[payload],
        quantity: cart.list[payload].quantity - 1,
      };
      state.cart = cart;
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
    productCartValue: (state) => (item: ProductItem) =>
      state.cart.list.find((c: CartItem) => c.product.id === item.id),
    productValue: (state) => ({
      id: state.product.value.id,
      title: state.product.value.title,
      image: state.product.value.image,
      details: {
        description: state.product.value.description,
        price: state.product.value.price,
        category: state.product.value.category,
        rating: state.product.value.rating?.rate,
      },
    }),
    cartItemQuantity: (state) =>
      state.cart.list.reduce((pre: number, cur: CartItem): number => {
        return (pre += cur.quantity);
      }, 0),
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
    async addToCart({ commit, dispatch }, data: ProductItem) {
      await commit(MUTATION_TYPES.ADD_TO_CART, data);
      dispatch(
        "snackbar/showSnack",
        {
          text: "Item added to cart!",
          color: "primary",
          timeout: 2000,
        },
        { root: true }
      );
    },
    icrementProductQuantity({ commit, state }, data: ProductItem) {
      const index = findIndex(state.cart.list, data);
      commit(MUTATION_TYPES.INCREMENT_PRODUCT_QUANTITY, index);
    },
    decrementProductQuantity({ commit, dispatch, state }, data: ProductItem) {
      const index = findIndex(state.cart.list, data);
      if (state.cart.list[index].quantity <= 1) {
        dispatch("deleteFromCart", data);
      } else {
        commit(MUTATION_TYPES.DECREMENT_PRODUCT_QUANTITY, index);
      }
    },
    async deleteFromCart({ commit, dispatch, state }, data: ProductItem) {
      const index = findIndex(state.cart.list, data);
      await commit(MUTATION_TYPES.DELETE_FROM_CART, index);
      dispatch(
        "snackbar/showSnack",
        {
          text: "Item deleted from cart!",
          color: "error",
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
