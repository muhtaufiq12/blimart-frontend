<template>
  <v-container class="pa-0">
    <v-row id="editProfileBtn" align="center" class="surface pa-1" @click="editDialog = true">
      <v-col cols="auto">
        <v-avatar width="64" height="64">
          <v-img :src="userC.photoUrl | serverImg"></v-img>
        </v-avatar>
      </v-col>
      <v-col>
        <div class="font-weight-bold">{{ userC.name || userC.username}}</div>
        <div class="text--secondary">{{ userC.email }}</div>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="auto">
        <v-icon>fa-chevron-right</v-icon>
      </v-col>
    </v-row>
    <v-row class="primary--text font-weight-bold my-3 surface">
      <v-col class="text-center">
        <span>
          <v-icon color="primary" class="mr-4">fa-wallet</v-icon>Rp. 999.999
        </span>
      </v-col>
      <v-divider vertical></v-divider>
      <v-col class="text-center">
        <v-icon color="primary" class="mr-4">fa-coins</v-icon>999.999
      </v-col>
    </v-row>
    <div class="surface pa-4 mx-n3">
      <div class="font-weight-bold subtitle-2 mb-4">Akun saya</div>
      <router-link v-if="userC.isAdmin" to="/admin">
        <v-row>
          <v-col class="fong-weight-thin text--secondary subtitle-2">Dashboard Admin</v-col>
          <v-spacer></v-spacer>
          <v-col cols="auto">
            <v-icon>fa-chevron-right</v-icon>
          </v-col>
        </v-row>
      </router-link>
      <router-link to="/order-list">
        <v-row>
          <v-col class="fong-weight-thin text--secondary subtitle-2">Riwayat Transaksi</v-col>
          <v-spacer></v-spacer>
          <v-col cols="auto">
            <v-icon>fa-chevron-right</v-icon>
          </v-col>
        </v-row>
      </router-link>
      <router-link to="/cart">
        <v-row>
          <v-col class="fong-weight-thin text--secondary subtitle-2">Keranjang</v-col>
          <v-spacer></v-spacer>
          <v-col cols="auto">
            <v-icon>fa-chevron-right</v-icon>
          </v-col>
        </v-row>
      </router-link>
      <router-link to="/wishlist">
        <v-row>
          <v-col class="fong-weight-thin text--secondary subtitle-2">Daftar Keinginan</v-col>
          <v-spacer></v-spacer>
          <v-col cols="auto">
            <v-icon>fa-chevron-right</v-icon>
          </v-col>
        </v-row>
      </router-link>
      <router-link to="/map">
        <v-row>
          <v-col class="fong-weight-thin text--secondary subtitle-2">Temukan Kami</v-col>
          <v-spacer></v-spacer>
          <v-col cols="auto">
            <v-icon>fa-chevron-right</v-icon>
          </v-col>
        </v-row>
      </router-link>
      <v-row id="logoutBtn" @click="logoutDialog = true">
        <v-col class="fong-weight-thin text--secondary subtitle-2">Keluar</v-col>
        <v-spacer></v-spacer>
        <v-col cols="auto">
          <v-icon>fa-chevron-right</v-icon>
        </v-col>
      </v-row>
    </div>
    <div class="surface pa-4 mx-n3 mt-3">
      <div class="font-weight-bold subtitle-2 mb-4">Pengaturan</div>
      <v-row @click="TOGLE_THEME()" class="pointer">
        <v-col class="fong-weight-thin text--secondary subtitle-2">Mode</v-col>
        <v-spacer></v-spacer>
        <v-col cols="auto">
          <span class="caption text--secondary">{{ $vuetify.theme.dark ? 'NIGHT' : 'LIGHT' }}</span>
        </v-col>
      </v-row>
      <v-row @click="clearRetail()" class="pointer">
        <v-col class="fong-weight-thin text--secondary subtitle-2">Reset Retail</v-col>
        <v-spacer></v-spacer>
        <v-col cols="auto">
          <v-icon>fa-redo-alt</v-icon>
        </v-col>
      </v-row>
    </div>
    <v-bottom-sheet v-model="editDialog" max-width="1200">
      <v-card>
        <v-card-title>
          <v-row>
            <b class="ml-2 title">Ubah Profil</b>
            <v-spacer></v-spacer>
            <v-btn icon @click="editDialog = !editDialog">
              <v-icon>fa-times</v-icon>
            </v-btn>
          </v-row>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pt-5">
          <v-form v-model="valid" ref="form" @submit.prevent="validate">
            <v-alert
              dense
              outlined
              v-for="(item, key, index) in errors"
              type="error"
              dismissible
              :key="index"
            >
              <strong>{{ key }}</strong>
              <span v-for="(i, idx) in item" :key="idx">{{i}},</span>
            </v-alert>
            <v-file-input
              v-model="selectedImage"
              accept="image/png, image/jpeg"
              placeholder="Upload gambar"
              prepend-icon="fa-camera"
              :rules="rules.photo"
              label="Gambar"
              dense
              class="mt-4"
            >
              <template v-slot:append-outer>
                <v-avatar tile size="84" class="mt-n6">
                  <v-img :src="photoUrlComputed" alt="Gambar Produk" />
                </v-avatar>
              </template>
            </v-file-input>
            <v-text-field
              v-model="object.name"
              outlined
              :rules="rules.name"
              dense
              label="Nama"
              class
              style
            ></v-text-field>
            <v-text-field
              v-model="object.phone"
              outlined
              :rules="rules.phone"
              dense
              label="Nomor Hp"
              class="mt-2"
              style
            ></v-text-field>
            <v-menu
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                outlined
                :rules="rules.birthDate"
                dense
                label="Tanggal Lahir"
                append-icon="far fa-calendar-alt"
                readonly
                :value="object.birthDate"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              locale="id"
              v-model="object.birthDate"
              :max="maxDate"
              @input="showDateMenu = false"
            ></v-date-picker>
          </v-menu>
          <v-autocomplete
            v-model="object.gender"
            :items="genders"
            :rules="rules.gender"
            validate-on-blur
            item-text="name"
            item-value="value"
            label="Jenis Kelamin"
            dense
            outlined
          ></v-autocomplete>

            <v-btn
              id="saveBtn"
              color="secondary"
              :disabled="!valid"
              @click="save"
              block
              :loading="isLoading"
              type="submit"
            >Simpan</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-bottom-sheet>
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
  </v-container>
</template>
<style lang="css" scoped>
a {
  text-decoration: none;
}
</style>
<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      valid: false,
      editDialog: false,
      isLoading: false,
      genders: [{ value: true, name: 'Laki - Laki' }, { value: false, name: 'Perempuan' }],
      selectedImage: null,
      logoutDialog: false,
      errors: [],
      rules: {
        name: [v => !!v || 'Nama tidak boleh kosong'],
        phone: [v => !!v || 'Telepon tidak boleh kosong'],
        birthDate: [v => !!v || 'Tanggal lahir tidak boleh kosong'],
        gender: [v => (v !== undefined && v != null) || 'Jenis kelamin tidak boleh kosong'],
        photo: [
          () => {
            if (!(this.object.photoUrl || this.selectedImage)) {
              return 'Gambar tidak boleh kosong';
            }
            return true;
          },
        ],
      },
      object: {},
      maxDate: new Date().toISOString().substring(0, 10),
    };
  },
  methods: {
    ...mapActions('layout', ['TOGLE_THEME']),
    ...mapActions('auth', ['getUser']),
    ...mapActions('auth', ['editUser', 'uploadPicture', 'logout']),
    ...mapGetters('auth', ['user']),
    ...mapActions('products', ['clearRetail']),
    validate() {
      return this.$refs.form.validate();
    },
    logoutAction() {
      this.logout().then(() => {
        this.logoutDialog = false;
        this.$router.push('/login');
      });
    },
    save() {
      this.isLoading = true;
      this.editUser({ userId: this.object.id, ...this.object }).then(() => {
        if (this.selectedImage != null) {
          this.uploadPicture(this.selectedImage)
            .then((r) => {
              if (r.data.code === 200) {
                this.$notify({
                  group: 'notif',
                  type: 'success',
                  title: 'Ubah Item',
                  text: 'Berhasil mengubah item',
                });
                this.isLoading = false;
                this.editDialog = false;
              }
            }).catch(() => {
              this.errors = { foto: ['Gagal mengupload gambar.'] };
            }).finally(() => {
              this.isLoading = false;
            });
        } else {
          this.isLoading = false;
          this.editDialog = false;
          this.$notify({
            group: 'notif',
            type: 'success',
            title: 'Ubah Item',
            text: 'Berhasil mengubah item',
          });
        }
      }).catch((err) => {
        this.isLoading = false;
        const { data } = err.response;
        if (data.code === 400) {
          this.errors = data.errors;
        }
        this.$notify({
          group: 'notif',
          type: 'error',
          title: 'Ubah Item',
          text: 'Gagal mengubah item',
        });
      });
    },
  },
  computed: {
    photoUrlComputed() {
      if (this.selectedImage) {
        return URL.createObjectURL(this.selectedImage);
      }
      if (typeof this.object.photoUrl === 'string') {
        return this.$options.filters.serverImg(`/products/photo/${this.object.id}`);
      }
      // eslint-disable-next-line global-require
      return require('../assets/img-placeholder.png');
    },
    userC() {
      return this.user();
    },
  },
  watch: {
    userC(v) {
      this.object = { ...v };
    },
  },
  created() {
    this.object = { ...this.user() };
  },
};
</script>
