<template>
  <div class="mx-auto">
    <v-card max-width="450" outlined class="mx-auto mt-12 pa-6">
      <p class="title text-center mt-12 mb-12">DAFTAR</p>
      <v-form v-model="valid" ref="form" @submit.prevent="validate">

        <v-alert v-if="msg != ''" :type="msgType">
          {{ msg }}
        </v-alert>
        <v-text-field
            id="email"
            v-model="email"
            prepend-inner-icon="fa-at"
            label="Email"
            :rules="rules.email"
            single-line
            outlined
        ></v-text-field>
        <v-text-field
            id="username"
            v-model="username"
            prepend-inner-icon="fa-user"
            label="Username"
            single-line
            :rules="rules.username"
            outlined
        ></v-text-field>
        <v-text-field
            id="password"
          v-model="password"
          :append-icon="show ? 'fa-eye' : 'fa-eye-slash'"
          prepend-inner-icon="fa-lock"
          :type="show ? 'text' : 'password'"
          single-line
          :rules="rules.password"
          outlined
          label="Password"
          @click:append="show = !show"
        ></v-text-field>
        <v-text-field
            id="rePassword"
          v-model="rePassword"
          :append-icon="show ? 'fa-eye' : 'fa-eye-slash'"
          prepend-inner-icon="fa-lock"
          :type="show ? 'text' : 'password'"
          single-line
          :rules="rules.password"
          outlined
          label="Konfirmasi Password"
          @click:append="show = !show"
        ></v-text-field>
        <v-btn id="submitBtn" block color="primary" type="submit" class="mt-6"
          @click="registerAction"
          :loading="loading">Daftar</v-btn>
        <v-btn block color="error" to="login" class="mt-4 mb-6"
        :loading="loading">Masuk</v-btn>
      </v-form>
    </v-card>
  </div>
</template>
<style lang="css" scoped>
  .wedge{
    flex: 1 175px;
    -webkit-box-flex: 1;
  }
</style>
<script>
import { mapActions } from 'vuex';
// @ is an alias to /src
export default {
  name: 'Home',
  components: {
  },
  data() {
    return {
      username: '',
      password: '',
      rePassword: '',
      email: '',
      products: [],
      loading: false,
      msg: '',
      msgType: '',
      valid: false,
      show: false,
      rules: {
        username: [
          v => !!v || 'Username tidak boleh kosong',
          v => v.length >= 6 || 'Username setidaknya harus 6 karakter',
        ],
        email: [
          v => !!v || 'Email tidak boleh kosong',
          v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Email tidak benar',
        ],
        password: [
          v => !!v || 'Password tidak boleh kosong',
          v => v.length >= 6 || 'Password setidaknya harus 6 karakter',
        ],
      },
    };
  },
  created() {
  },
  methods: {
    ...mapActions('auth', ['register']),
    registerAction() {
      if (!this.valid) return;
      this.loading = true;
      this.register({ email: this.email, username: this.username, password: this.password })
        .then(() => {
          this.msgType = 'success';
          this.msg = 'Berhasil membuat akun, selanjutnya silahkan login';
        })
        .catch((err) => {
          if (err.response.status === 406) {
            this.msgType = 'error';
            this.msg = 'Username telah digunakan';
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    validate() {
      return this.$refs.form.validate();
    },
  },
};
</script>
