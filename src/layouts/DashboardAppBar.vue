<template>
  <div>
    <v-app-bar
      :color="$mq==='xs'?($vuetify.theme.dark ? '':'white'):'primary'"
      app
      :bottom="$mq==='xs'" >
      <v-spacer v-if="$mq==='xs'"></v-spacer>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title v-if="$mq!=='xs'">Dashboard Blimart</v-toolbar-title>

    </v-app-bar>
    <v-navigation-drawer app v-model="drawer" bottom>
      <v-list-item style="height:64px">
        <v-list-item-avatar>
          <v-img :src="`${userC.photoUrl}` | serverImg"></v-img>
        </v-list-item-avatar>

        <v-list-item-title>
          <div class="subtitle-2 font-weight-bold">{{ userC.name || userC.username }}</div>
          <div class="caption text--secondary">{{ userC.email }}</div>
        </v-list-item-title>
      </v-list-item>
      <v-divider></v-divider>
      <v-list nav dense>
        <v-list-item-group active-class="primary">

          <v-list-item to="/admin/product">
            <v-list-item-icon><v-icon>fa-box</v-icon></v-list-item-icon>
            <v-list-item-title>Produk</v-list-item-title>
          </v-list-item>

          <v-list-item to="/admin/user">
            <v-list-item-icon><v-icon>fa-user</v-icon></v-list-item-icon>
            <v-list-item-title>Pengguna</v-list-item-title>
          </v-list-item>
          <v-list-item to="/admin/retail">
            <v-list-item-icon><v-icon>fa-shopping-bag</v-icon></v-list-item-icon>
            <v-list-item-title>Retail</v-list-item-title>
          </v-list-item>

          <v-list-item to="/admin/supplier">
            <v-list-item-icon><v-icon>fa-parachute-box</v-icon></v-list-item-icon>
            <v-list-item-title>Supplier</v-list-item-title>
          </v-list-item>

          <v-list-item to="/admin/category">
            <v-list-item-icon><v-icon>fa-list</v-icon></v-list-item-icon>
            <v-list-item-title>Kategori</v-list-item-title>
          </v-list-item>
          <v-list-item to="/admin/mark">
            <v-list-item-icon><v-icon>fa-qrcode</v-icon></v-list-item-icon>
            <v-list-item-title>Mark AR</v-list-item-title>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item to="/admin/procurement" class="mt-1">
            <v-list-item-icon><v-icon>fa-boxes</v-icon></v-list-item-icon>
            <v-list-item-title>Pengadaan Produk</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <v-spacer></v-spacer>
      <template v-slot:append>
      <v-divider></v-divider>
      <v-row class="px-2">
        <v-col>
          <v-dialog
            v-model="logoutDialog"
            width="300">
          <template v-slot:activator="{on}">
            <v-btn id="logoutBtn" v-on="on" block class="grey--text" text>
              <v-icon left>fas fa-sign-out-alt fa-flip-horizontal</v-icon>Log out
            </v-btn>
          </template>
          <v-card>
            <v-card-title>Keluar</v-card-title>
            <v-card-text>Apakah Anda yakin ingin keluar?</v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn id="logoutConfirmBtn" outlined color="error" @click="logoutAction">
                YAKIN
              </v-btn>
              <v-btn outlined color="secondary" @click="logoutDialog = false">TIDAK</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        </v-col>
        <v-col cols="auto">

        <v-btn v-on:click="TOGLE_THEME" icon>
          <v-icon>fas fa-sun</v-icon>
        </v-btn>
        </v-col>
      </v-row>
    </template>
    </v-navigation-drawer>
  </div>
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
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      drawer: false,
      logoutDialog: false,
    };
  },
  methods: {
    ...mapActions('layout', ['TOGLE_THEME']),
    ...mapGetters('auth', ['isLoggedIn', 'user']),
    ...mapActions('auth', ['logout']),
    logoutAction() {
      this.logout()
        .then(() => {
          this.logoutDialog = false;
          this.$router.push('/login');
        });
    },
  },
  computed: {
    userC() {
      return this.user();
    },
  },
};
</script>
