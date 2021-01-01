<template>
  <v-app>
    <v-content>
      <div style="margin : 0px; overflow: hidden;height:100vh;" >
    <v-dialog v-model="dialog" max-width="400" persistent>
      <v-card>
        <v-card-title class="headline">Produk Ditemukan
          <v-spacer></v-spacer>
          <v-btn icon @click="dialog = false"><v-icon>fa-times</v-icon></v-btn>
        </v-card-title>

        <v-card-text>
          Produk berhasil ditemukan:
          <br>
          <v-card outlined>
            <v-row>
              <v-col cols="auto" >
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
            </v-row>
          </v-card>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>

        <v-col>
          <v-btn
            :loading="loading"
            color="error" text @click="addWishlistAction" block outlined>
            <v-icon left>fa-heart</v-icon>
            Wishlist
          </v-btn>
        </v-col>
        <v-col>
          <v-btn
            :loading="loading" color="secondary" text block outlined
            @click="addToCartPrompt">
            <v-icon left>fa-shopping-cart</v-icon>
            Keranjang
          </v-btn>
        </v-col>


        </v-card-actions>
      </v-card>
    </v-dialog>
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
            color="error" text @click="addToCart" :loading="loading">Simpan</v-btn>

            <v-btn
              color="primary"
              text
              @click="addToCartDialog = false"
              :loading="loading"
            >Batal</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
    <a-scene arjs>
      <a-assets>
        <a-asset-item id="logo-obj" src="/ar/logo.obj"></a-asset-item>
        <a-asset-item id="logo-mtl" src="/ar/logo.mtl"></a-asset-item>
        <audio id="victory" src="/sounds/victory.mp3" preload="auto"></audio>
      </a-assets>
      <a-marker
        v-for="mark in marksC"
        :key="mark.name"
        :id="mark.name"
        :url="mark.path + '.patt'"
        type="pattern"
      >
      <!-- <a-box  position='0 -1 0' material='color: blue;'>
      </a-box> -->
      </a-marker>
      <a-entity id="rig" position="0 0.6 0">
        <a-entity id="camera" camera look-controls rotation-reader>
          <a-text :value="a"
          position="-0.5 0.2 -1" scale="0.2 0.2 0.2" color="red">
        </a-text>


        <a-image
          id="arrow"
          scale="0.3 0.3 0.3"
          geometry
          src="/arrow.png"
          position="0 -.2 -1"
          :rotation="'35 0 '+arrowRotationC"
        >
        </a-image>
        <a-text v-if="next" value="Cari" position="0.9 0.95 -3" scale="0.4 0.4 0.4" color="green">

        </a-text>
        <a-image
          v-if="next"
          scale=".7 1 1"
          geometry
          :src="'/patterns/pattern-'+next+'.png'"
          position="1 0.4 -3"
        ></a-image>
        </a-entity>
      </a-entity>
      <a-obj-model
        v-if="done"
        id="logoObj"
        :animation="`property:
          rotation;
          to: 0 360 0;
          loop: true;
          easing: linear;`"
        position="-1 1 -2"
        scale=".2 .2 .2"
        src="#logo-obj"
        mtl="#logo-mtl">

      </a-obj-model>
      <a-entity id="victorySound" volume="3" sound="src: #victory" ></a-entity>
    </a-scene>

  </div>
    </v-content>
  </v-app>
</template>
<style lang="css">
</style>
<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'AR',
  data() {
    return {
      a: 'Scan a mark in a corner',
      next: '',
      height: 720,
      width: 1280,
      arId: null,
      dialog: false,
      addToCartDialog: false,
      rawRotation: 0,
      rotation: 0,
      cameraRotation: { x: 0, y: 0, z: 0 },
      cameraRotationWorld: { x: 0, y: 0, z: 0 },
      cameraRotationInit: 0.0,
      arrowRotationC: 0,
      loading: false,
      rotationOffset: 0,
      valid: false,
      nItem: 0,
      validation: {
        nItem: [
          v => !!v || 'Jumlah item tidak boleh kosong',
          v => (v && parseInt(v, 10) > 0 && parseInt(v, 10) <= this.productC.stock)
            || 'Jumlah item tidak kurang dari 0 atau lebih dari stock',
        ],
      },
      done: false,
      // eslint-disable-next-line no-undef
      logoPos: new THREE.Vector3(0, 1, 3),
      // eslint-disable-next-line no-undef
      axisRotation: new THREE.Vector3(0, 1, 0),
    };
  },
  components: {},
  computed: {
    marksC() {
      return this.marks();
    },
    productC() {
      return this.product();
    },
  },
  methods: {
    ...mapGetters('ar', ['marks']),
    ...mapActions('ar', ['getMarks', 'initAR', 'foundMark']),
    ...mapActions('products', ['getProduct']),
    ...mapGetters('products', ['product']),
    ...mapActions('wishlist', ['addWishlist']),
    ...mapActions('cart', ['addCart']),
    ...mapGetters('auth', ['isLoggedIn']),
    arrowAnimation() {
      const treshold = 3;
      const inc = 4;
      const delta = this.rawRotation - this.rotation;
      if (delta < treshold * -1) {
        this.rotation -= inc;
      }
      if (delta > treshold) {
        this.rotation += inc;
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
    addWishlistAction() {
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
    },
    validate() {
      return this.$refs.form.validate();
    },
    addToCart() {
      if (this.valid) {
        this.loading = true;
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
            this.loading = false;
          });
      }
    },
  },
  mounted() {
    const a = this;
    // eslint-disable-next-line no-undef
    AFRAME.registerComponent('rotation-reader', {
      tick() {
        a.cameraRotation = this.el.getAttribute('rotation');
        const v = a.cameraRotation.y;
        const delta = a.cameraRotationInit - v;

        a.arrowAnimation();
        // a.a = `${a.rotationOffset} ${delta} ${a.rotation}`;
        a.arrowRotationC = delta + a.rotation + a.rotationOffset;
      },
    });
  },
  created() {
    const a = this;
    this.getProduct(this.$route.params.id).then((res) => {
      if (!res.data) {
        this.$router.push('/404');
      }
    });
    this.getMarks().then(() => {
      document.querySelectorAll('a-marker').forEach((el) => {
        el.addEventListener('markerFound', () => {
          if (this.done) return;
          if (this.arId == null) {
            this.initAR({ productId: this.$route.params.id, startingMark: el.id }).then((res) => {
              if (!res.data) {
                // eslint-disable-next-line no-alert
                alert('Mohon Maaf! Terjadi kesalahan saat menyiapkan rute.');
                return;
              }
              this.arId = res.data.data.id;
              this.cameraRotationInit = this.cameraRotation.y;
              switch (el.id.charAt(1)) {
                case 'n':
                  a.rotationOffset = 0;

                  break;
                case 's':
                  a.rotationOffset = 180;
                  break;

                case 'e':
                  a.rotationOffset = 90;

                  break;

                case 'w':
                  a.rotationOffset = -90;

                  break;
                default:
                  break;
              }
              this.rawRotation = res.data.data.rotation;
              this.next = res.data.data.next;
              this.a = a.rotationOffset;
            });
          } else {
            this.foundMark({ id: this.arId, markId: el.id }).then((res) => {
              this.rawRotation = res.data.data.rotation;
              this.next = res.data.data.next;
              if (this.rawRotation - this.rotation > 180) {
                this.rotation += 360;
              } else if ((this.rawRotation - this.rotation < -180)) {
                this.rotation -= 360;
              }
            }).catch(async (err) => {
              if (err.response.status === 406) {
                this.next = null;
                this.dialog = true;
                a.logoPos.x = 0;
                a.logoPos.y = 0;
                a.logoPos.z = -2;
                a.logoPos.applyAxisAngle(a.axisRotation, Math.PI * a.cameraRotation.y / 180);
                a.done = true;
                await this.$nextTick();
                document.querySelector('#logoObj').setAttribute('position', `${a.logoPos.x} ${a.logoPos.y} ${a.logoPos.z}`);
                document.querySelector('#victorySound').components.sound.playSound();
              }
            });
          }
        });
      });
    });
  },
};
</script>
