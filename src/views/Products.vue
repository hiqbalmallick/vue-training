<template>
  <v-container fluid class="products">
    <v-row dense>
      <v-col v-for="product in productsList" :key="product.id" cols="3">
        <v-card>
          <v-img
            :src="product.image"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="200px"
          >
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-card-title
                  class="text-truncate"
                  v-bind="attrs"
                  v-on="on"
                  v-text="product.title"
                />
              </template>
              <span>{{ product.title | capitalize }}</span>
            </v-tooltip>
          </v-img>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn icon>
              <v-icon
                @click="
                  isInCart(product)
                    ? deleteFromCart(product)
                    : addToCart(product)
                "
                :color="isInCart(product) ? '#1976d2' : ''"
              >
                mdi-cart
              </v-icon>
            </v-btn>

            <v-btn icon>
              <v-icon @click="navigate(product.id)"> mdi-eye </v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { findIndex } from "@/utils/utils";
import Vue from "vue";
import { mapActions, mapGetters, mapState } from "vuex";

export default Vue.extend({
  name: "Products",
  data: () => ({
    loading: true,
  }),
  computed: {
    ...mapState(["cart"]),
    ...mapGetters(["productsList"]),
  },
  created() {
    this.fetchList();
  },
  methods: {
    ...mapActions(["fetchProducts", "addToCart", "deleteFromCart"]),

    isInCart(item) {
      return findIndex(this.cart.list, item) !== -1;
    },

    navigate(id) {
      this.$router.push(`product/${id}`);
    },

    async fetchList() {
      this.loading = true;
      await this.fetchProducts();
      this.loading = false;
    },
  },
});
</script>

<style lang="scss">
.products {
  .v-card__title {
    display: block;
  }
}
</style>
