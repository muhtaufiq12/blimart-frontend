<template>
  <div>

    <div v-if="productsC.length">
        <p class="title mx-2">Hasil Pencarian</p>
        <div  class="d-flex flex-wrap">
        <Product v-for="n in productsC" :key="n.id" :item="n" />
        <div class="wedge" />
        <div class="wedge" />
        <div class="wedge" />
        <div class="wedge" />
        <div class="wedge" />
        <div class="wedge" />
        </div>
    </div>

    <div v-else class="text-center pt-12">
        <h2 class="mt-12 mb-2">
        Produk yang Anda cari tidak ditemukan.
        </h2>
        <v-img class="mx-auto mt-12" src="/404.svg" width="150"></v-img>
        <span class="mt-4 subtitle-2 font-weight-regular">Agar mempermudah Anda</span>
        <div class="mt-4">
        <v-btn color="primary" to="/">Kembali Ke Halaman Utama</v-btn>
        </div>
    </div>
    <p class="title mx-2 mt-12">Produk Lainnya</p>
    <div class="d-flex flex-wrap">
      <Product v-for="a in randomC" :key="a.id" :item="a" />
      <div class="wedge" />
      <div class="wedge" />
      <div class="wedge" />
      <div class="wedge" />
      <div class="wedge" />
      <div class="wedge" />
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import Product from '../components/Product.vue';

export default {
  components: { Product },
  computed: {
    productsC() {
      return this.products();
    },
    randomC() {
      return this.randomProducts();
    },
  },
  watch: {
    $route(to) {
      this.searchCategoryProducts(to.params.id);
    },
  },
  methods: {
    ...mapGetters('products', ['products', 'randomProducts']),
    ...mapActions('products', ['searchCategoryProducts', 'getRandomProducts']),
  },
  created() {
    this.searchCategoryProducts(this.$route.params.id);
    this.getRandomProducts();
  },
};
</script>
