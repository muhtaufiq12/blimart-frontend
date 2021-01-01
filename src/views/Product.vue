<template>
  <v-container fluid class="mx-auto mb-6">
    <v-divider></v-divider>
    <!-- <v-row>
      <v-col cols="auto" v-if="$mq === 'xs'">
        <v-img
          height="64"
          max-width="64"
          src="https://media.suara.com/pictures/970x544/2019/09/05/97980-acer-exclusive-store.jpg"
        ></v-img>
      </v-col>
      <v-col cols="auto" align-self="center" class="ml-3">
        <v-row>
          <div class="caption font-weight-bold">{{ productC.supplier.name }}</div>
        </v-row>
        <v-row>
          <div class="caption text--secondary">
            <span class="font-weight-bold">{{productC.supplier.totalProduct}}</span> Produk
          </div>
        </v-row>
      </v-col>
    </v-row>
    <v-divider></v-divider>-->
    <v-row class="mb-4">
      <v-col cols="12" sm="5" md="5">
        <v-img v-if="productC.id"
          max-height="500"
          :src="'/products/photo/'+productC.id|serverImg"></v-img>
      </v-col>
      <v-col cols="12" sm="7" md="7" class="pl-8">
        <v-row>
          <v-col cols="2" align-self="center" class="caption font-weight-bold">Produk</v-col>
          <v-col cols="10">
            <div class="caption text--secondary font-weight-medium">{{productC.category}}</div>
            <div class="title font-weight-medium">{{productC.name}}</div>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col cols="2" align-self="center" class="caption font-weight-bold">Harga</v-col>
          <v-col cols="10">
            <span
              class="title font-weight-bold error--text"
            >{{productC.price * (100-productC.discount)/100 | price}}</span>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col cols="2" align-self="center" class="caption font-weight-bold">Varian</v-col>
          <v-col cols="10">
            <span class="subtitle-1">{{productC.variant}}</span>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col cols="2" align-self="center" class="caption font-weight-bold">INFO PRODUK</v-col>
          <v-col cols="10">
            <div class="caption font-weight-bold text--secondary">Stock</div>
            <span class="body-2 font-weight-bold">{{productC.stock}} Pcs</span>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <!-- <v-row v-if="$mq !== 'xs'">
          <v-col cols="2" align-self="center" class="caption font-weight-bold">TOKO</v-col>
          <v-col cols="10">
            <v-row>
              <v-col cols="2">
                <v-img height="64" max-width="64" :src="productC.supplier.photoUrl"></v-img>
              </v-col>
              <v-col align-self="center">
                <v-row>
                  <div class="caption font-weight-bold">{{productC.supplier.name}}</div>
                </v-row>
                <v-row>
                  <div class="caption text--secondary">
                    <span class="font-weight-bold">{{productC.supplier.totalProduct}}</span> Produk
                  </div>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
        </v-row>-->
        <!-- <v-divider></v-divider> -->
        <v-btn
          id="addWishlistBtn"
          :loading="loading"
          @click="addWishlistAction"
          class="mt-8"
          outlined
          rounded
          color="error"
        >
          <v-icon
            class="error"
            color="white"
            left
            style=" width:36px;height:36px;
              border-radius:50%;margin-left:-16px;"
          >fas fa-heart</v-icon>Tambahkan ke harapan
        </v-btn>
        <v-btn
          v-if="$mq==='xs'"
          :loading="loading"
          class="mt-8"
          outlined
          rounded
          color="primary"
          :to="'/ar/'+productC.id"
        >
          <v-icon
            class="primary"
            color="white"
            left
            style=" width:36px;height:36px;
              border-radius:50%;margin-left:-16px;"
          >fas fa-vr-cardboard</v-icon>Cari (Augmented Reality)
        </v-btn>
      </v-col>
    </v-row>
    <div class="title my-2">Produk Lainnya</div>
    <div class="d-flex flex-wrap">
      <ProductCard v-for="a in randomC" :key="a.id" :item="a" />
      <div class="wedge" />
      <div class="wedge" />
      <div class="wedge" />
      <div class="wedge" />
      <div class="wedge" />
      <div class="wedge" />
    </div>
    <!-- <v-row>
      <v-col cols="auto" class="pr-0">
        <div class="border-up pa-2 body-2">
          Review
          <span class="ml-2 font-weight-bold">
            <v-icon small color="yellow darken-3" style="margin-top:-3px">fas fa-star</v-icon>
            {{ reviewC.mean }}
          </span>
        </div>
      </v-col>
      <v-col class="pl-0" align-self="end">
        <v-divider></v-divider>
      </v-col>
    </v-row>
    <v-row class="px-5" v-if="!reviewC.reviews.length" :key="comment.id">
      Belum ada komentar
    </v-row>
    <v-row class="px-5" v-for="comment in reviewC.reviews" :key="comment.id">
      <v-col cols="auto">
        <v-avatar width="64" height="64">
          <v-img :src="comment.user.photoUrl" alt="img" />
        </v-avatar>
      </v-col>
      <v-col cols="auto" align-self="center">
        <div class="font-weight-bold">{{ comment.user.name }}</div>
        <div class="body-2 text--secondary">{{ comment.created | date }}</div>
      </v-col>
      <v-col cols="auto" class="pa-8">
        <v-icon
          v-for="i in 5"
          :key="i"
          small
          :color="i > comment.stars?'':'yellow darken-3'"
        >fas fa-star</v-icon>
      </v-col>
      <v-col cols="12">
        <div class="body-2 text--secondary">{{ comment.comment}}</div>
        <v-divider class="mt-5"></v-divider>
      </v-col>
    </v-row>-->
    <v-card
      style="position: fixed; bottom: 0px; width:100%; left:0px;z-index:5;"
      elevation="4"
      height="auto"
    >
      <v-container style="max-width:1200px" >
        <v-row align="center">
          <v-col v-if="$mq !== 'xs'" cols="8" sm="6" class="py-0">
            <v-row align="center">
              <v-col sm="8">
                <span class="title primary--text">{{productC.name}}</span>
                <span class="subtitle-2 text--secondary ml-2">{{productC.variant}}</span>
              </v-col>
              <v-col sm="4">
                <div class="text--secondary font-weight-bold caption">Total</div>
                <div
                  class="subtitle-2 font-weight-bold error--text"
                >{{productC.price * (100-productC.discount)/100 | price}}</div>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="6" sm="3" class="py-0">
            <v-btn block
              id="buyNowBtn"
              style="color:#ffffff;"
              outlined
              color="primary"
              height="36"
              @click="buyNowPrompt"
              small
              >Beli Sekarang</v-btn>
          </v-col>
          <v-col cols="6" sm="3" class="py-0">
            <v-btn
              id="addToCartBtn"
              block style="color:#ffffff;" color="primary" height="36"
              small
              @click="addToCartPrompt">Tambah Keranjang</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <v-dialog v-model="addToCartDialog" max-width="350" persistent>
      <v-form v-model="valid" ref="form" @submit.prevent="validate">
        <v-card>
          <v-card-title class="headline">Tambah Keranjang</v-card-title>

          <v-card-text>
            Masukan jumlah item Maksimal:
            <b>{{ productC.stock }} Pcs</b>
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
            id="save"
            color="error" text @click="addToCart" :loading="isAddCartLoading">Simpan</v-btn>

            <v-btn
              color="primary"
              text
              @click="addToCartDialog = false"
              :loading="isAddCartLoading"
            >Batal</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </v-container>
</template>
<style lang="css">
.border-up {
  border-width: 1px 1px 0px 1px;
  border-radius: 8px 8px 0px 0px;
  border-style: solid;
  border-color: rgba(0, 0, 0, 0.12);
}
</style>

<script>
import { mapActions, mapGetters } from 'vuex';
import ProductCard from '../components/Product.vue';

export default {
  name: 'Product',
  data() {
    return {
      loading: false,
      addToCartDialog: false,
      isAddCartLoading: false,
      nItem: 0,
      valid: true,
      validation: {
        nItem: [
          v => !!v || 'Jumlah item tidak boleh kosong',
          v => (v && parseInt(v, 10) > 0 && parseInt(v, 10) <= this.productC.stock)
            || 'Jumlah item tidak kurang dari 0 atau lebih dari stock',
        ],
      },
      addState: 0,
    };
  },
  components: { ProductCard },
  watch: {
    $route(to) {
      this.getProduct(to.params.id);
    },
  },
  methods: {
    ...mapActions('products', ['getProduct', 'getRandomRelatedProducts']),
    ...mapActions('wishlist', ['addWishlist']),
    ...mapActions('cart', ['addCart']),
    ...mapGetters('products', ['product', 'randomProducts']),
    ...mapActions('reviews', ['getReview']),
    ...mapGetters('reviews', ['review']),
    ...mapGetters('auth', ['isLoggedIn']),
    addWishlistAction() {
      if (this.valid) {
        if (!this.isLoggedIn()) {
          this.$router.push('/login');
          return;
        }
        this.loading = true;
        this.addWishlist(this.$route.params.id)
          .then(() => {
            this.$notify({
              group: 'notif',
              type: 'success',
              title: 'Tambah Wishlist',
              text: 'Berhasil menambah item ke wishlist',
            });
          })
          .catch(() => {
            this.$notify({
              group: 'notif',
              type: 'error',
              title: 'Tambah Wishlist',
              text: 'Gagal menambah item ke wishlist',
            });
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
    addToCartPrompt() {
      if (!this.isLoggedIn()) {
        this.$router.push('/login');
        return;
      }
      this.nItem = 1;
      this.addState = 0;
      this.addToCartDialog = true;
    },
    buyNowPrompt() {
      if (!this.isLoggedIn()) {
        this.$router.push('/login');
        return;
      }
      this.nItem = 1;
      this.addState = 1;
      this.addToCartDialog = true;
    },
    validate() {
      return this.$refs.form.validate();
    },
    addToCart() {
      if (this.valid) {
        this.isAddCartLoading = true;
        this.addCart({ idProduct: this.productC.id, nItem: this.nItem })
          .then(() => {
            this.addToCartDialog = false;
            this.$notify({
              group: 'notif',
              type: 'success',
              title: 'Tambah Keranjang',
              text: 'Berhasil menambah item ke keranjang',
            });
            if (this.addState) {
              this.$router.push('/cart');
            }
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
      }
    },
  },
  created() {
    this.getProduct(this.$route.params.id).then((res) => {
      if (!res.data) {
        this.$router.push('/404');
      }
    });
    this.getRandomRelatedProducts(this.$route.params.id);
    // this.getReview(this.$route.params.id);
  },
  computed: {
    productC() {
      return this.product();
    },
    // reviewC() {
    //   return this.review();
    // },
    randomC() {
      return this.randomProducts();
    },
  },
};
</script>
