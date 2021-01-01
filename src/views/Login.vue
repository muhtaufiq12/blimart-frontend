<template>
  <div class="mx-auto">
    <v-card max-width="450" outlined class="mx-auto mt-12 pa-6">
      <p class="title text-center mt-12 mb-12">LOGIN</p>
      <v-form v-model="valid" ref="form" @submit.prevent="validate">
        <v-alert v-if="msg != ''" :type="msgType">
          {{ msg }}
        </v-alert>
        <v-text-field
            id="username"
            v-model="username"
            prepend-inner-icon="fa-user"
            label="Username"
            :rules="rules.username"
            single-line
            outlined
          ></v-text-field>
          <v-text-field
            id="password"
            v-model="password"
            :append-icon="show ? 'fa-eye' : 'fa-eye-slash'"
            prepend-inner-icon="fa-lock"
            :type="show ? 'text' : 'password'"
            :rules="rules.password"
            single-line
            outlined
            label="Password"
            @click:append="show = !show"
          ></v-text-field>
          <v-btn
          id="submitBtn"
          block color="primary" class="mt-6" :loading="loading" @click="loginAction"
          type="submit">Masuk</v-btn>
          <v-btn block color="error" to="register"
          class="mt-4 mb-6" :loading="loading">Daftar</v-btn>
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
      products: [],
      valid: false,
      rules: {
        username: [v => !!v || 'Username tidak boleh kosong'],
        password: [v => !!v || 'Password tidak boleh kosong'],
      },
      show: false,
      loading: false,
      msgType: 'error',
      msg: '',
    };
  },
  created() {
  },
  methods: {
    ...mapActions('auth', ['login']),
    loginAction() {
      if (!this.valid) return;
      this.loading = true;
      this.login({ username: this.username, password: this.password })
        .then((res) => {
          if (res.data.code === 200) {
            this.$router.push({ path: '/' });
          } else {
            this.msg = 'Login gagal, username atau password salah.';
          }
        })
        .catch((err) => {
          if (err.response) {
            // eslint-disable-next-line prefer-destructuring
            this.msg = err.response.data.errors.message[0];
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
