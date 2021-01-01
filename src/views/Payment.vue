<template>
  <div>
    <v-card v-if="$mq==='xs'" elevation="3" class="pa-3 subtitle-2" tile>Pembayaran</v-card>
    <v-row no-gutters class="pa-md-5">
      <v-col  class="pa-3 mr-md-3 surface mt-4">
        <div v-if="$mq!=='xs'" class="subtitle-2">Daftar Transaksi</div>
        <div v-for="payment in paymentC.detailResponses" :key="payment.id">
          <ProductCard :product="payment.productResponse" :nItem="payment.totalItem">
          </ProductCard>
          <v-divider></v-divider>
        </div>
      </v-col>
      <v-col cols="12" sm="auto">
        <v-card
          style="position: fixed; bottom: 0px; width:100%;"
          v-if="$mq === 'xs'"
          elevation="4"
          class="mx-xs-n5"
          height="auto"
        >
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" class="pt-0">
                <v-row>
                  <v-col cols="auto" class="text--secondary caption">Total Harga</v-col>
                  <v-spacer></v-spacer>
                  <v-col
                    cols="auto"
                    class="primary--text font-weight-bold">{{ calcTotal|price }}</v-col>
                </v-row>
                <v-divider v-if="$mq === 'xs'"></v-divider>
              </v-col>
              <v-col cols="12" sm="6" class="py-0">
                <v-btn
                  block style="color:#ffffff;"
                  @click="payAction"
                  color="primary" height="36">Bayar Sekarang</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
        <v-card width="400" class="mt-4" v-else outlined height="auto">
          <v-container>
            <v-row>
                <v-col cols="12" class="font-weight-bold">Ringkasan Transaksi</v-col>
              <v-col cols="auto" class="text--secondary caption">Total Harga</v-col>
              <v-spacer></v-spacer>
              <v-col
                cols="auto"
                class="primary--text font-weight-bold">{{ calcTotal|price }}</v-col>
              <v-col sm="12">
                <v-btn
                  id="payAction"
                  block style="color:#ffffff;"
                    color="primary" height="36" @click="payAction">Bayar Sekarang</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
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

    };
  },
  computed: {
    paymentC() {
      return this.payment();
    },
    calcTotal() {
      return this.paymentC.total;
    },
  },
  methods: {
    ...mapActions('transaction', ['getPayment', 'pay']),
    ...mapGetters('transaction', ['payment']),
    payAction() {
      this.pay(this.$route.params.id).then((res) => {
        if (res.data.code === 200) {
          this.$router.push('success');
        }
      });
    },
  },
  created() {
    this.getPayment(this.$route.params.id).then((res) => {
      if (res.data.data.status === 'done') {
        this.$router.push('/404');
      }
    });
  },
};
</script>
