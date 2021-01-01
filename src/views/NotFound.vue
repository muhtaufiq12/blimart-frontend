<template>
  <div class="text-center pt-12">
    <h2 class="mt-12 mb-2">
      Halaman yang Anda cari tidak ditemukan.
    </h2>
    <span class="mt-4 subtitle-2 font-weight-regular">Agar mempermudah Anda</span>
    <div class="mt-4">
      <v-btn color="primary" to="/">Kembali Ke Halaman Utama</v-btn>
    </div>
    <v-img class="mx-auto mt-12" src="/404.svg" width="150"></v-img>
  </div>
</template>
<script>

export default {
  name: 'NotFound',
};
</script>
