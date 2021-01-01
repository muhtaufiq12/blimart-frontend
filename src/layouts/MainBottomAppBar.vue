<template>
    <v-bottom-navigation
      v-if="$mq === 'xs'"
      color="primary"
      shift
      fixed
      app
    >
    <v-btn to="/category">
      <span>Kategori</span>
      <v-icon>fa fa-bars</v-icon>
    </v-btn>

    <v-btn to="/">
      <span>Home</span>
      <v-icon>fa fa-home</v-icon>
    </v-btn>

    <v-btn to="/search-qr">
      <span>Pencarian</span>
      <v-icon>fa fa-camera</v-icon>
    </v-btn>

    <v-btn to="/cart">
      <span>Keranjang</span>
      <v-icon>fa fa-shopping-cart</v-icon>
    </v-btn>

    <v-btn to="/account">
      <span>Profil</span>
      <v-icon>fa fa-user</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>
<style scoped lang="css">
.toolbar_content {
  margin: 0 auto;
  background: transparent !important;
}
.toolbar {
  background-image: url("https://www.static-src.com/siva/coreasset/04_2020//1587547277188//skin-top-1200-x-86-final.png");
  background-position: center bottom;
  background-repeat: repeat;

}
</style>
<script>
export default {
  data() {
    return {
      bottomNav: 0,
    };
  },
};
</script>
