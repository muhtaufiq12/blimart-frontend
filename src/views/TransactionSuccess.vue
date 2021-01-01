<template>
  <div class="text-center pt-12">
    <v-img class="mx-auto mt-12" src="/favicon.ico" width="150"></v-img>
    <h2 class="mt-12 mb-2">
      Transaksi Berhasil dilakukan.
    </h2>
    <span class="mt-4 subtitle-2 font-weight-regular">
      Terima kasih telah berbelanja di Bliblimart.</span>
      <br>
    <!-- <span class="mt-6 subtitle-2 font-weight-regular">
      Transaksi Sebesar : {{paymentC.total}} Telah berhasil dilakukan.

    </span> -->
    <div class="mt-4">
      <v-btn color="primary" to="/">Belanja Lagi</v-btn>
    </div>
  </div>
</template>
<script>

export default {
  name: 'TransactionSuccess',
};
</script>
