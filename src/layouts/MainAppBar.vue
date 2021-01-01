<template>
  <div>
    <div v-if="$mq !== 'xs'">
      <div class="toolbar primary">
        <v-app-bar max-width="1200" flat class="toolbar_content" height="86" fixed app>
          <v-toolbar-title>
            <router-link to="/">
              <v-img width="150" alt="logo" src="../assets/logo.png"></v-img>
            </router-link>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-text-field
              v-model="searchKeyword"
              label="Cari.."
              single-line
              hide-details
              solo
              light
              append-icon="fa fa-search"
              v-on:keyup.enter="searchAction"
            >
          </v-text-field>
          <v-spacer></v-spacer>

          <div v-if="!isLoggedInC">
            <v-btn outlined color="white" depressed to="/login">Masuk</v-btn>
            <v-btn class="ml-2 primary--text" color="white" to="/register" depressed>Daftar</v-btn>
          </div>
          <v-menu open-on-hover bottom offset-y v-else>
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" class="px-2 mr-6 white--text" text to="/account">
                <v-list-item-avatar>
                  <!-- <v-img :src="userC.photoUrl | serverImg"></v-img> -->
                  <v-img :src="userC.photoUrl"></v-img>
                </v-list-item-avatar>

                <v-list-item-title>{{ userC.name || userC.email }}</v-list-item-title>
                <!-- <v-list-item-title>TES</v-list-item-title> -->
                <v-icon right dark>fa fa-caret-down</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item v-if="userC.isAdmin" to="/admin">
                <v-list-item-title>
                  <v-icon small class="mx-2">fa fa-chalkboard-teacher</v-icon>Admin
                </v-list-item-title>
              </v-list-item>
              <v-list-item to="/category">
                <v-list-item-title>
                  <v-icon small class="mx-2">fa fa-bars</v-icon>Kategori
                </v-list-item-title>
              </v-list-item>
              <v-list-item to="/cart">
                <v-list-item-title>
                  <v-icon small class="mx-1 mr-2">fa fa-shopping-cart</v-icon>Keranjang
                </v-list-item-title>
              </v-list-item>
              <v-list-item to="/wishlist">
                <v-list-item-title>
                  <v-icon small class="ml-2 mr-2">fa fa-heart</v-icon>Wishlist
                </v-list-item-title>
              </v-list-item>
              <v-list-item to="/map">
                <v-list-item-title>
                  <v-icon small class="ml-2 mr-2">fa fa-map</v-icon>Temukan Kami
                </v-list-item-title>
              </v-list-item>
              <v-list-item id="logoutBtn" @click="logoutDialog = true">
                <v-list-item-title>
                  <v-icon small class="ml-2 mr-2">fa fa-sign-out-alt</v-icon>Keluar
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-app-bar>
      </div>
    </div>
      <v-card elevation="4" v-if="$mq === 'xs' && isMobile" outlined tile>
        <v-app-bar elevation="3" class="" fixed app color="surface">
          <v-text-field
            v-model="searchKeyword"
            class="super-dense"
            placeholder="Cari..."
            filled
            rounded
            hide-details
            dense
            v-on:keyup.enter="searchAction"
          >
          <template v-slot:prepend-inner>
            <v-icon x-small>fa-search</v-icon>
          </template>
        </v-text-field>
        <v-btn icon class="ml-2">
          <v-icon>far fa-bell</v-icon>
        </v-btn>
      </v-app-bar>
    </v-card>
    <v-dialog v-model="logoutDialog" width="300">
      <v-card>
        <v-card-title>Keluar</v-card-title>
        <v-card-text>Apakah Anda yakin ingin keluar?</v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn id="logoutConfirmBtn" outlined color="error" @click="logoutAction">YAKIN</v-btn>
          <v-btn outlined color="secondary" @click="logoutDialog = false">TIDAK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<style scoped lang="css">
.toolbar_content {
  margin: 0 auto;
  background: transparent !important;
}
.toolbar {
  z-index: 2;
  background-image: url("https://www.static-src.com/siva/coreasset/04_2020//1587547277188//skin-top-1200-x-86-final.png");
  background-position: center bottom;
  background-repeat: repeat;
  height: 86px;
  position: fixed;
  width: 100%;
}
</style>
<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  props: {
    mobile: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      logoutDialog: false,
      searchKeyword: '',
    };
  },
  computed: {
    isMobile() {
      return this.mobile;
    },
    isLoggedInC() {
      return this.isLoggedIn();
    },
    userC() {
      return this.user();
    },
  },
  methods: {
    logoutAction() {
      this.logout().then(() => {
        this.logoutDialog = false;
        this.$router.push('/login');
      });
    },
    searchAction() {
      if (this.searchKeyword) {
        this.$router.push(`/search/${this.searchKeyword}`);
      }
    },
    ...mapGetters('auth', ['isLoggedIn', 'user']),
    ...mapActions('auth', ['logout']),
  },
};
</script>
