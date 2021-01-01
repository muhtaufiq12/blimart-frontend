<template>
  <div class="pa-4 pt-8 mt-4">
    <v-card
      v-if="$mq==='xs'"
      elevation="3"
      class="pa-3 subtitle-2"
      style="position:fixed; width:100%; top:0;left:0; height:56px; line-height:32px;z-index:3"
      tile
    >
      <div>
        <v-row class="px-4" align="center">
          Daftar Keinginan
          <v-spacer></v-spacer>
          <span
            @click="deleteAllPrompt"
            class="text--secondary caption">Hapus Semua</span>
        </v-row>
      </div>
    </v-card>

    <h3 v-else>
      Wishlist
      <v-btn
        id="deleteAllBtn"
        color="error"
        class="ml-4"
        :disabled="wishlistC.length == 0"
        small
        depressed
        @click="deleteAllPrompt"
      >
        <v-icon x-small left>fas fa-trash</v-icon>Hapus Semua
      </v-btn>
    </h3>
    <div v-if="wishlistC.length == 0" class="text-center mt-12">
      <v-icon x-large>fa-folder-open</v-icon>
      <div class="mt-2 subtitle-2 text--secondary">Data kosong</div>
    </div>
    <v-row
      no-gutters
      class="mt-6 surface mx-n4 mx-md-0 py-3 px-4"
      v-for="wishlist in wishlistC"
      :key="wishlist.id"
    >
      <v-col>
        <span
          class="text--secondary caption text-uppercase"
        >Ditambahkan pada {{ wishlist.createdDate | date }}</span>
        <v-divider class="mt-2 mb-0"></v-divider>
        <ProductCard :product="wishlist.productResponse" hidePrice>
          <template v-slot:prepend>
            <v-btn :id="'addToCart-'+wishlist.id"  icon @click="addToCartPrompt(wishlist)">
              <v-icon small>fas fa-cart-plus</v-icon>
            </v-btn>
            <v-btn :id="'delete-'+wishlist.id" class="awewe"
            icon @click="deleteItemPrompt(wishlist)">
              <v-icon small>fas fa-trash</v-icon>
            </v-btn>
          </template>
        </ProductCard>
      </v-col>
    </v-row>
    <v-dialog v-model="deleteAllDialog" max-width="290" persistent>
      <v-card>
        <v-card-title class="headline">Apakah Anda yakin?</v-card-title>

        <v-card-text>Apakah Anda yakin ingin menghapus semua item dari wishlist?</v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn id="deleteAllBtnConfirmed"
           color="error" text @click="deleteAll" :loading="isAddCartLoading">Yakin</v-btn>

          <v-btn
            color="primary"
            text
            @click="deleteAllDialog = false"
            :loading="isAddCartLoading"
          >Batal</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="deleteDialog" max-width="290" persistent>

        <v-card>
          <v-card-title class="headline">Apakah Anda yakin?</v-card-title>

          <v-card-text>Apakah Anda yakin ingin menghapus item tersebut?</v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn id="deleteItem" color="error" text @click="deleteItem"
              :loading="isAddCartLoading">
              Yakin</v-btn>

            <v-btn
              color="primary"
              text
              @click="deleteDialog = false"
              :loading="isAddCartLoading"
            >Batal</v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog>
    <v-dialog v-model="addToCartDialog" max-width="350" persistent>
       <v-form v-model="valid" ref="form" @submit.prevent="validate">
      <v-card>
        <v-card-title class="headline">Tambah Keranjang</v-card-title>

        <v-card-text>
          Masukan jumlah item Maksimal:
          <b>{{ obj.productResponse.stock }} Pcs</b>
          <v-text-field
            v-model="nItem"
            label="Total Item"
            single-line
            class="mt-4"
            outlined
            :rules="validation.nItem"
            dense
          ></v-text-field>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn id="save"
            color="error"
            text @click="addToCart" :loading="isAddCartLoading">Simpan

          </v-btn>

          <v-btn
            color="primary"
            text
            @click="addToCartDialog = false"
            :loading="isAddCartLoading"
          >Batal</v-btn>
        </v-card-actions>
      </v-card></v-form>
    </v-dialog>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import ProductCard from '../components/ProductPaymentCart.vue';

export default {
  name: 'Wishlist',
  components: { ProductCard },
  data() {
    return {
      deleteDialog: false,
      addToCartDialog: false,
      isAddCartLoading: false,
      deleteAllDialog: false,
      valid: false,
      nItem: 0,
      index: 0,
      obj: { productResponse: { stock: 0 } },
      validation: {
        nItem: [
          v => !!v || 'Jumlah item tidak boleh kosong',
          v => (v && parseInt(v, 10) <= this.obj.productResponse.stock)
            || 'Jumlah item tidak kurang dari 0 atau lebih dari stock',
        ],
      },
    };
  },
  methods: {
    ...mapActions('wishlist', [
      'getWishlist',
      'deleteWishlist',
      'deleteAllWishlist',
    ]),
    ...mapActions('cart', ['addCart']),
    ...mapGetters('wishlist', ['wishlist']),
    deleteItem() {
      this.isAddCartLoading = true;
      this.deleteWishlist({ index: this.index, id: this.obj.id })
        .then(() => {
          this.deleteDialog = false;
          this.$notify({
            group: 'notif',
            type: 'success',
            title: 'Hapus Wishlist',
            text: 'Berhasil menghapus item dari wishlist',
          });
        })
        .catch(() => {
          this.$notify({
            group: 'notif',
            type: 'error',
            title: 'Hapus Wishlist',
            text: 'Gagal menghapus item dari wishlist',
          });
        })
        .finally(() => {
          this.isAddCartLoading = false;
        });
    },
    deleteAll() {
      this.isAddCartLoading = true;
      this.wishlistC.forEach((element, index) => {
        this.deleteWishlist({ index, id: element.id })
          .then(() => {
            if (index === this.wishlistC.length) {
              this.deleteAllDialog = false;
              this.$notify({
                group: 'notif',
                type: 'success',
                title: 'Hapus Wishlist',
                text: 'Berhasil menghapus semua item dari wishlist',
              });
            }
          })
          .catch(() => {
            this.$notify({
              group: 'notif',
              type: 'success',
              title: 'Hapus Wishlist',
              text: 'Gagal menghapus semua item dari wishlist',
            });
          })
          .finally(() => {
            if (index === this.wishlistC.length) {
              this.isAddCartLoading = false;
            }
          });
      });

      // this.deleteAllWishlist()
      //   .then(() => {
      //     this.deleteAllDialog = false;
      //     this.$notify({
      //       group: 'notif',
      //       type: 'success',
      //       title: 'Hapus Wishlist',
      //       text: 'Berhasil menghapus semua item dari wishlist',
      //     });
      //   })
      //   .finally(() => {
      //     this.isAddCartLoading = false;
      //   });
    },
    addToCart() {
      this.isAddCartLoading = true;
      this.addCart({ idProduct: this.obj.productResponse.id, nItem: this.nItem })
        .then(() => {
          this.addToCartDialog = false;
          this.$notify({
            group: 'notif',
            type: 'success',
            title: 'Tambah Keranjang',
            text: 'Berhasil menambah item ke keranjang',
          });
        })
        .catch(() => {
          this.$notify({
            group: 'notif',
            type: 'error',
            title: 'Tambah Keranjang',
            text: 'Gagal menambah item ke keranjang',
          });
        })
        .finally(() => {
          this.isAddCartLoading = false;
        });
    },
    deleteItemPrompt(item) {
      this.index = this.wishlistC.indexOf(item);
      this.obj = item;
      this.deleteDialog = true;
    },
    addToCartPrompt(item) {
      this.nItem = 1;
      this.obj = item;
      this.addToCartDialog = true;
    },
    deleteAllPrompt() {
      this.deleteAllDialog = true;
    },
    validate() {
      return this.$refs.form.validate();
    },
  },
  computed: {
    wishlistC() {
      return this.wishlist();
    },
  },
  created() {
    this.getWishlist();
  },
};
</script>
