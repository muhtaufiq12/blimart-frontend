<template>
  <div class="home mx-auto" style="max-width:1200px">
    <carousel />
    <v-img src="https://www.static-src.com/siva/asset//05_2020/LONG-BANNER-TRADE-IN.jpg"></v-img>
    <p class="title mt-4 mx-2">Sedang Promo</p>
    <ProductCarousel v-model="promotionC" />
    <p class="title mx-2">Produk Populer</p>
    <ProductCarousel v-model="popularC" />
    <p class="title mx-2">Produk Tersedia</p>
    <div class="d-flex flex-wrap">
      <Product v-for="n in productsC" :key="n.id" :item="n" />
      <div class="wedge" />
      <div class="wedge" />
      <div class="wedge" />
      <div class="wedge" />
      <div class="wedge" />
      <div class="wedge" />
    </div>

    <v-badge
      style="
        position: fixed;
        bottom:0px;
        right:0px;
        margin-bottom: 64px;
        margin-right: 16px"
      color="error"
      :content="wishlistC.length"
      :value="wishlistC.length"
      overlap
      bordered
      offset-x="24"
      offset-y="16"
    >
      <v-btn fab large bottom color="error" to="/wishlist">
        <v-icon>fa-heart</v-icon>
      </v-btn>
    </v-badge>
  </div>
</template>
<script>
// @ is an alias to /src
import { mapActions, mapGetters } from 'vuex';
import carousel from '../components/Carousel.vue';
import ProductCarousel from '../components/ProductCarousel.vue';
import Product from '../components/Product.vue';

export default {
  name: 'Home',
  components: {
    carousel,
    ProductCarousel,
    Product,
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions('products', ['getProducts', 'getPromotion', 'getPopular']),
    ...mapGetters('products', ['products', 'promotion', 'popular']),
    ...mapActions('wishlist', ['getWishlist']),
    ...mapGetters('wishlist', ['wishlist']),
  },
  computed: {
    productsC() {
      return this.products();
    },
    promotionC() {
      return this.promotion();
    },
    popularC() {
      return this.popular();
    },
    wishlistC() {
      return this.wishlist();
    },
  },
  created() {
    this.getProducts();
    this.getPromotion();
    this.getPopular();
    this.getWishlist();
  },
};
</script>
