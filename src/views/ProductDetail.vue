<template>
  <v-container class="product-detail">
    <v-row>
      <v-col cols="12" sm="6" md="4">
        <v-skeleton-loader
          :loading="loading"
          type="image"
          max-width="250"
          max-height="250"
        >
          <v-img
            :lazy-src="productValue.image"
            max-height="250"
            max-width="250"
            :src="productValue.image"
          />
        </v-skeleton-loader>
      </v-col>
      <v-col cols="12" sm="6" md="8">
        <v-skeleton-loader
          :loading="loading"
          type="card-heading ,paragraph, sentences, paragraph, sentences, button"
        >
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <div class="text-h5 text-truncate mb-5" v-bind="attrs" v-on="on">
                {{ productValue.title }}
              </div>
            </template>
            <span>{{ productValue.title | capitalize }}</span>
          </v-tooltip>
          <v-row v-for="(value, name) in productValue.details" :key="name">
            <v-col cols="3">{{ name | capitalize }}</v-col>
            <v-col cols="9">{{ value | capitalize }}</v-col>
          </v-row>
          <template>
            <v-btn
              v-if="!isInCart(productValue)"
              color="primary"
              class="mt-5"
              @click="addToCart(productValue)"
            >
              Add to Cart
              <v-icon right> mdi-cart </v-icon>
            </v-btn>
            <v-btn
              v-else
              color="error"
              class="mt-5"
              @click="deleteFromCart(productValue)"
            >
              Remove from cart
              <v-icon right> mdi-cart </v-icon>
            </v-btn>
            <v-expand-transition>
              <v-responsive v-if="isInCart(productValue)" max-width="350">
                <v-row class="mt-2">
                  <v-col cols="3" class="text-center">
                    <v-btn
                      fab
                      light
                      x-small
                      elevation="2"
                      @click="decrementProductQuantity(productValue)"
                    >
                      <v-icon>mdi-minus</v-icon>
                    </v-btn>
                  </v-col>
                  <v-col cols="6" class="text-center">
                    {{ productCartValue(productValue).quantity }}
                  </v-col>
                  <v-col cols="3" class="text-center">
                    <v-btn
                      fab
                      light
                      x-small
                      elevation="2"
                      @click="icrementProductQuantity(productValue)"
                    >
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-responsive>
            </v-expand-transition>
          </template>
        </v-skeleton-loader>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { findIndex } from "@/utils/utils";
import Vue from "vue";
import { mapActions, mapGetters, mapState } from "vuex";

export default Vue.extend({
  name: "ProductDetail",
  data: () => ({
    loading: true,
  }),
  computed: {
    ...mapState(["cart"]),
    ...mapGetters(["productValue", "productCartValue"]),
  },
  created() {
    this.getRecord();
  },
  methods: {
    ...mapActions([
      "getProductById",
      "addToCart",
      "deleteFromCart",
      "icrementProductQuantity",
      "decrementProductQuantity",
    ]),
    async getRecord() {
      this.loading = true;
      await this.getProductById(this.$router.currentRoute.params.id);
      this.loading = false;
    },
    isInCart(item) {
      return findIndex(this.cart.list, item) !== -1;
    },
  },
});
</script>

<style lang="scss">
.product-detail {
  .v-skeleton-loader__button {
    width: 142px;
  }
  .v-skeleton-loader__card-heading {
    height: 50px;
    margin-bottom: 15px;
    .v-skeleton-loader__heading {
      height: 18px;
    }
  }
}
</style>
