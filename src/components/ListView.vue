<template>
  <v-skeleton-loader :loading="loading" type="table">
    <v-data-table
      :headers="headers"
      :items="productsList"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Products</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                New Item
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.title"
                        label="Title"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.category"
                        label="Category"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.price"
                        label="Price"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.rating.rate"
                        label="Rating"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="navigate(item.id)"> mdi-eye </v-icon>
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
      <template v-slot:item.image="{ item }">
        <v-avatar size="36px">
          <img :src="item.image" alt="Product Image" />
        </v-avatar>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="fetchList"> Reset </v-btn>
      </template>
    </v-data-table>
  </v-skeleton-loader>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: "Image", value: "image" },
      {
        text: "Title",
        align: "start",
        value: "title",
      },
      { text: "Price", value: "price" },
      { text: "Category", value: "category" },
      { text: "Rating", value: "rating.rate" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    loading: true,
    editedIndex: -1,
    editedItem: {
      title: "",
      price: 0,
      category: "",
      rating: {
        rate: 0,
      },
    },
    defaultItem: {
      title: "",
      price: 0,
      category: "",
      rating: {
        rate: 0,
      },
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    ...mapGetters(["productsList"]),
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.fetchList();
  },

  methods: {
    ...mapActions(["fetchProducts", "addProduct"]),
    navigate(id) {
      this.$router.push(`product/${id}`);
    },
    async fetchList() {
      this.loading = true;
      await this.fetchProducts();
      this.loading = false;
    },

    editItem(item) {
      this.editedIndex = this.productsList.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.productsList.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.productsList.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.productsList[this.editedIndex], this.editedItem);
      } else {
        this.addProduct({
          ...this.editedItem,
          image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
        });
        // this.productsList.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>
