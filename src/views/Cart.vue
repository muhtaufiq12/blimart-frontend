<template>
  <div>
    <v-card
      v-if="$mq==='xs'"
      elevation="0"
      class="pa-3 subtitle-2"
      style="position:fixed; width:100%; top:0;left:0; height:56px; line-height:32px;z-index: 200;"
      tile
    >
      <div>
        <v-row class="px-4" align="center"  v-if="cartC.length">
          Keranjang
          <v-spacer></v-spacer>
          <span class="text--secondary caption"
            @click="deleteAllDialog = true">Hapus Semua</span>
        </v-row>
      </div>
    </v-card>
    <v-card
      v-if="$mq==='xs'"
      flat
      style="position:fixed; width:100%; top:56px;left:0; height:52px; line-height:32px;
        z-index: 200;"
      tile
    >
      <v-divider></v-divider>
      <v-checkbox
        dense hide-details class="mt-0 pa-3" v-model="isCheckAll" @change="checkAll"
       v-if="cartC.length">
        <template v-slot:label>
          <span class="caption">Pilih Semua</span>
        </template>
      </v-checkbox>
    </v-card>
    <h3 v-else>
      Keranjang
      <v-btn
        id="deleteAllBtn"
        color="error"
        class="ml-4"
        :disabled="cartC.length == 0"
        small
        depressed
        @click="deleteAllDialog = true"
        v-if="cartC.length"
      >
        <v-icon  x-small left>fas fa-trash</v-icon>Hapus Semua
      </v-btn>
      <v-scale-transition origin="center center">
        <v-btn
          id="deleteAnyBtn"
          color="secondary"
          class="ml-4"
          small
          depressed
          v-show="nSelected"
          @click="deleteAnyDialog = true"
          v-if="cartC.length"
        >
          <v-icon x-small left>fas fa-trash</v-icon>Hapus Terpilih({{nSelected}})
        </v-btn>
      </v-scale-transition>
    </h3>
    <div v-if="cartC.length == 0" class="text-center mt-12">
      <v-icon x-large>fa-folder-open</v-icon>
      <div class="mt-2 subtitle-2 text--secondary">Data kosong</div>
    </div>
    <v-row no-gutters class="mx-n3 mx-md-0 mt-12">
      <v-col  class="pa-4 mr-md-3 surface" v-if="cartC.length">
        <div
          v-if="$mq!=='xs'">

          <v-checkbox
            id="checkAll"
            dense hide-details class="mt-0" v-model="isCheckAll" @change="checkAll"
           v-if="cartC.length">
            <template v-slot:label>
              <span class="caption">Pilih Semua</span>
            </template>
          </v-checkbox>
        </div>
        <div v-for="cart in cartC" :key="cart.id">
          <ProductCard :product="cart.productResponse" :nItem="cart.totalItem">
            <template v-slot:append>
              <v-checkbox
                :id="'check-'+cart.id"
                v-model="cart.selected"
                class="mt-0" dense hide-details @change="checked(cart)"></v-checkbox>
            </template>
            <template v-slot:prepend>
              <v-btn icon @click="deleteItemPrompt(cart)">
                <v-icon :id="'delete-'+cart.id" small>fas fa-trash</v-icon>
              </v-btn>
            </template>
          </ProductCard>
          <v-divider></v-divider>
        </div>
      </v-col>
      <v-col cols="12" sm="auto" v-if="cartC.length">
        <v-card
          style="position: fixed; bottom: 56px; left:0px;width:100%;"
          v-if="$mq === 'xs'"
          elevation="4"
          height="auto"
        >
          <v-row>
            <v-col cols="8 pl-8" >
              <div class="text--secondary caption">Total Harga</div>
              <div class="primary--text font-weight-bold">{{total | price}}</div>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="auto" class="py-0  pr-8" align-self="center">
              <v-btn
                style="color:#ffffff;"
                small
                :disabled="!nSelected"
                @click="checkoutAction"
                :loading="isLoading"
                color="primary" >Beli({{ nSelected }})</v-btn>
            </v-col>
          </v-row>
        </v-card>
        <v-card width="400" v-else outlined height="auto">
          <v-container>
            <v-row>
                <v-col cols="12" class="font-weight-bold">Ringkasan Transaksi</v-col>
              <v-col cols="auto" class="text--secondary caption">Total Harga</v-col>
              <v-spacer></v-spacer>
              <v-col cols="auto" class="primary--text font-weight-bold">
                {{total | price}}
                </v-col>
              <v-col sm="12">
                <v-btn
                  id="checkOutBtn"
                  block style="color:#ffffff;"
                  :disabled="!nSelected"
                  color="primary" height="36"
                  @click="checkoutAction"
                  :loading="isLoading"
                  >Beli({{ nSelected }})</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="deleteAllDialog" max-width="290" persistent>
      <v-card>
        <v-card-title class="headline">Apakah Anda yakin?</v-card-title>

        <v-card-text>Apakah Anda yakin ingin menghapus semua item dari keranjang?</v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            id="deleteAllConfirmBtn"
            color="error" text @click="deleteAll" :loading="isLoading">Yakin</v-btn>

          <v-btn
            color="primary" text @click="deleteAllDialog = false"
            :loading="isLoading">Batal</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="deleteAnyDialog" max-width="290" persistent>
      <v-card>
        <v-card-title class="headline">Apakah Anda yakin?</v-card-title>

        <v-card-text>Apakah Anda yakin ingin menghapus
          <b>{{nSelected}}</b>
          item dari keranjang?
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            id="deleteAnyConfirmBtn"
            color="error"
            text
            @click="deleteAny" :loading="isLoading">Yakin</v-btn>

          <v-btn
            color="primary" text @click="deleteAnyDialog = false"
            :loading="isLoading">Batal</v-btn>
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

          <v-btn
            id="deleteConfirmBtn"
            color="error" text @click="deleteItem" :loading="isLoading">Yakin</v-btn>

          <v-btn color="primary"
            text
            @click="deleteDialog = false" :loading="isLoading">Batal</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import ProductCard from '../components/ProductPaymentCart.vue';

export default {
  name: 'Payment',
  components: { ProductCard },
  data() {
    return {
      isLoading: false,
      deleteAllDialog: false,
      deleteDialog: false,
      deleteAnyDialog: false,
      total: 0,
      obj: {},
      selected: {},
      nSelected: 0,
      isCheckAll: true,
      index: 0,
    };
  },
  computed: {
    cartC() {
      return this.cart();
    },
  },
  methods: {
    ...mapActions('cart', ['getCart', 'deleteAllCart', 'deleteCart', 'deleteAnyCart']),
    ...mapActions('transaction', ['checkout']),
    ...mapGetters('cart', ['cart']),
    deleteAll() {
      this.isLoading = true;
      const arr = [];
      this.cartC.forEach((v) => {
        arr.push(v.id);
      });
      this.deleteAllCart(arr)
        .then(() => {
          this.deleteAllDialog = false;
          this.$notify({
            group: 'notif',
            type: 'success',
            title: 'Hapus Keranjang',
            text: 'Berhasil menghapus semua item dari keranjang',
          });
        })
        .catch(() => {
          this.$notify({
            group: 'notif',
            type: 'success',
            title: 'Hapus Keranjang',
            text: 'Gagal menghapus semua item dari keranjang',
          });
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    deleteAny() {
      this.isLoading = true;
      const arr = [];
      Object.keys(this.selected).forEach((key) => {
        arr.push(key);
      });
      this.deleteAnyCart(arr)
        .then(() => {
          this.deleteAnyDialog = false;
          this.$notify({
            group: 'notif',
            type: 'success',
            title: 'Hapus Keranjang',
            text: 'Berhasil menghapus item-item dari keranjang',
          });
          this.doGetCart();
          this.checkAll(true);
        }).catch(() => {
          this.$notify({
            group: 'notif',
            type: 'success',
            title: 'Hapus Keranjang',
            text: 'Gagal menghapus item-item dari keranjang',
          });
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    checkAll(v) {
      for (let index = 0; index < this.cartC.length; index += 1) {
        const buf = this.cartC[index].id;
        this.cartC[index].id = '';
        this.cartC[index].selected = v;
        this.cartC[index].id = buf;

        if (v) {
          this.selected[this.cartC[index].id.toString()] = this.cartC[index];
          this.nSelected = this.cartC.length;
        } else {
          delete this.selected[this.cartC[index].id.toString()];
          this.nSelected = 0;
        }
      }
      this.calcTotal();
    },
    checkoutAction() {
      this.isLoading = true;
      this.checkout(this.selected)
        .then((res) => {
          this.$router.push(`/payment/${res.data.data.id}`);
        })
        .catch(() => {
          this.$notify({
            group: 'notif',
            type: 'error',
            title: 'Order',
            text: 'Gagal menambahkan order',
          });
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    checked(item) {
      if (this.selected[item.id.toString()]) {
        delete this.selected[item.id.toString()];
        this.isCheckAll = false;
        this.nSelected -= 1;
      } else {
        this.selected[item.id.toString()] = item;
        this.nSelected += 1;
        if (this.nSelected === this.cartC.length) {
          this.isCheckAll = true;
        }
      }
      this.calcTotal();
    },
    deleteItemPrompt(item) {
      this.obj = item;
      this.index = this.cartC.indexOf(item);
      this.deleteDialog = true;
    },
    deleteItem() {
      this.isLoading = true;
      const idx = this.obj.id;
      this.deleteCart({ id: idx, index: this.index })
        .then(() => {
          this.deleteDialog = false;
          this.$notify({
            group: 'notif',
            type: 'success',
            title: 'Hapus Keranjang',
            text: 'Berhasil menghapus item dari keranjang',
          });
          this.checkAll(true);
        }).catch(() => {
          this.$notify({
            group: 'notif',
            type: 'success',
            title: 'Hapus Keranjang',
            text: 'Gagal menghapus item dari keranjang',
          });
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    calcTotal() {
      let a = 0;
      Object.keys(this.selected).forEach((key) => {
        a += this.selected[key].totalItem * this.selected[key].productResponse.price;
      });

      this.total = a;
    },
    doGetCart() {
      this
        .getCart()
        .then(() => {
          this.checkAll(true);
        });
    },
  },
  watch: {
  },
  created() {
    this.doGetCart();
  },
};
</script>
