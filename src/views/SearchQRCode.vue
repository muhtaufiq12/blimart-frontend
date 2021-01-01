<template>
    <div>
        <qrcode-stream @decode="onDecode">
            <b class="white--text pa-2">Scan QR Code..</b>
        </qrcode-stream>


    <v-dialog v-model="dialog" max-width="400" persistent>
      <v-card>
        <v-card-title class="headline">Membuka Produk</v-card-title>

        <v-card-text>
          Produk berhasil ditemukan:
          <br>
          <v-card outlined>
            <v-row>
              <v-col cols="auto" class="pl-0">
                <v-img width="86" height="86" :src="'/products/photo/'+productC.id | serverImg">
              </v-img>
              </v-col>

              <v-col cols="6" md="6" class="pa-0" align-self="center">
                <v-row class="ml-0">
                  <v-col cols="12" md="8" style="font-size:14px" class="font-weight-bold pa-0">
                    <div >
                      <router-link
                        :to="'/product/'+productC.id"
                        class="onSurface--text"
                        style="text-decoration:none">{{ productC.name }}</router-link>
                    </div>

                    <div
                      style="font-size:12px"
                      class="primary--text font-weight-bold"
                    >{{ product.variant }}</div>
                    <div style="font-size:12px" class="text--secondary">{{ productC.category }}

                    </div>
                  </v-col>
                  <v-col
                    cols="12"
                    md="4"
                    style="font-size:10px"
                    class="text--secondary py-0"
                  >
                    <v-row>
                      <v-col
                        cols="auto"
                        md="12"
                        class="pa-0"
                        align-self="center">{{productC.price | price}}</v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-col>
              <v-spacer></v-spacer>
            </v-row>
          </v-card>
          <br>
          Apakah Anda ingin membuka laman produk?
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="error" text @click="$router.push('/product/'+productC.id)">Yakin</v-btn>

          <v-btn color="secondary" text @click="dialog = false">Batal</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
        width="100"
        persistent
        v-model="loading">

        <v-card height="100">
            <v-row align="center"
                class="ma-0"
                style="height:100%"
                >
                <v-progress-circular

                    indeterminate
                    color="primary"
                    class="mx-auto my-auto"
                    ></v-progress-circular>
            </v-row>
        </v-card>
    </v-dialog>
    </div>
</template>
<script>
import { QrcodeStream } from 'vue-qrcode-reader';
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      t: '',
      dialog: false,
      dialogError: false,
      loading: false,
    };
  },
  components: {
    QrcodeStream,
  },
  computed: {
    productC() {
      return this.product();
    },
  },
  methods: {
    onDecode(decodedString) {
      this.t = decodedString;
      this.loading = true;
      this.getProduct(decodedString).then((res) => {
        if (res.data.data) {
          this.dialog = true;
        }
      })
        .finally(() => {
          this.loading = false;
        });
    },
    ...mapActions('products', ['getProduct']),
    ...mapGetters('products', ['product']),
  },
};
</script>
