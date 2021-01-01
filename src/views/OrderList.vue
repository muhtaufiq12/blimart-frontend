<template>
  <div class="pa-0 pa-md-4 pt-8 mt-0 mt-md-4">
    <v-card
      v-if="$mq==='xs'"
      elevation="3"
      class="pa-3 subtitle-2"
      style="position:fixed; width:100%; top:0;left:0; height:56px; line-height:32px;"
      tile
    >
      <div>
        <v-row class="px-4" align="center">
          Daftar Belanja
          <v-spacer></v-spacer>
        </v-row>
      </div>
    </v-card>

    <h3 v-else class="mb-3">
      Daftar Belanja
    </h3>
    <div v-if="orderListC.length == 0" class="text-center mt-12">
      <v-icon x-large>fa-folder-open</v-icon>
      <div class="mt-2 subtitle-2 text--secondary">Data kosong</div>
    </div>
    <v-row
      no-gutters
      class="mb-6 surface mx-n3 mx-md-0 py-3 px-4"
      v-for="order in orderListC"
      :key="order.id"

    >
      <v-col>
        <span
          class="text--secondary caption text-uppercase"
        >Tanggal Transaksi {{ order.createdDate | date }}</span>
        <v-divider class="mt-2 mb-0"></v-divider>
        <ProductCard :product="order.productResponse" :nItem="order.totalItem">
          <template v-slot:prepend>

            <v-btn :id="'addToCart-'+order.id" icon @click="addToCartPrompt(order)" v-on="on">
              <v-icon small>fas fa-cart-plus</v-icon>
            </v-btn>

          </template>
        </ProductCard>
      </v-col>
    </v-row>
    <v-dialog v-model="addToCartDialog" max-width="350" persistent>
      <v-card>
        <v-form v-model="valid" ref="form" @submit.prevent="validate">
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

            <v-btn
              :disabled="!valid"
              color="primary"
              type="submit"
              text
              id="save"
              @click="addToCart" :loading="isAddCartLoading">Simpan</v-btn>

            <v-btn
              color="error"
              text
              @click="addToCartDialog = false"
              :loading="isAddCartLoading"
            >Batal</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>

    <!-- <v-dialog v-model="addCommentDialog" max-width="350" persistent>
      <v-card>
        <v-form v-model="valid_comment" ref="form_comment" @submit.prevent="validate_comment">
          <v-card-title class="headline">Ulasan</v-card-title>

          <v-card-text>
            Rating:
            <v-btn v-for="i in 5" :key="i" icon @click="rating=i+1">
              <v-icon :color="rating>i?'warning':''">fa-star</v-icon>
            </v-btn>

            <v-textarea
              outlined
              :rules="validation.comment"
              v-model="comment"
              label="Komentar"
              class="mt-4"
              auto-grow
            ></v-textarea>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              :disabled="!(valid_comment && this.rating > 0)"
              color="error"
              type="submit"
              text
              @click="addComment" :loading="isAddCartLoading">Simpan</v-btn>

            <v-btn
              color="primary"
              text
              @click="addCommentDialog = false"
              :loading="isAddCartLoading"
            >Batal</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog> -->
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import ProductCard from '../components/ProductPaymentCart.vue';


export default {
  name: 'OrderList',
  components: { ProductCard },
  data() {
    return {
      addToCartDialog: false,
      addCommentDialog: false,
      rating: 0,
      nItem: 0,
      valid: false,
      valid_comment: false,
      isAddCartLoading: false,
      obj: { productResponse: { stock: 0 } },
      comment: '',
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
    ...mapActions('orderList', [
      'getOrderList',
    ]),
    ...mapActions('cart', [
      'addCart',
    ]),
    ...mapGetters('orderList', ['orderList']),
    validate() {
      return this.$refs.form.validate();
    },
    // validate_comment() {
    //   return this.$refs.form_comment.validate();
    // },
    addToCart() {
      if (this.obj) {
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
          .finally(() => {
            this.isAddCartLoading = false;
          });
      }
    },
    // addComment() {
    //   this.isAddCartLoading = true;
    //   this.addCart({ idProduct: this.obj.productResponse.id, nItem: this.nItem })
    //     .then(() => {
    //       this.addCommentDialog = false;
    //       this.$notify({
    //         group: 'notif',
    //         type: 'success',
    //         title: 'Ulasan',
    //         text: 'Berhasil menambah ulasan',
    //       });
    //     })
    //     .finally(() => {
    //       this.isAddCartLoading = false;
    //     });
    // },
    // addCommentPrompt(item) {
    //   this.rating = 0;
    //   this.comment = '';
    //   this.obj = item;
    //   this.addCommentDialog = true;
    // },
    addToCartPrompt(item) {
      this.nItem = 1;
      this.obj = item;
      this.addToCartDialog = true;
    },
  },
  computed: {
    orderListC() {
      return this.orderList();
    },
  },
  created() {
    this.getOrderList();
  },
};
</script>
