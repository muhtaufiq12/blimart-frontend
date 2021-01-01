import axios from 'axios';


export default {
  namespaced: true,
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user: { },
    loading: false,
  },
  mutations: {
    auth_request(state) {
      state.status = 'loading';
    },
    auth_success(state, payload) {
      state.status = 'success';
      state.token = payload.jwtToken;
      const birthDate = (new Date(payload.user.birthDate)).toISOString().substring(0, 10);
      const buf = { ...payload.user };
      buf.birthDate = birthDate;
      state.user = buf;
    },
    updatePicture(state) {
      state.user.photoUrl = `/users/photo/${state.user.userId}?t=${Math.random() * 200}`;
    },
    set_user(state, payload) {
      state.status = 'success';
      console.log(payload);
      const birthDate = (new Date(payload.birthDate)).toISOString().substring(0, 10);
      const buf = { ...payload };
      buf.birthDate = birthDate;
      Object.assign(state.user, buf);
    },
    auth_error(state) {
      state.status = 'error';
    },
    logout(state) {
      state.status = '';
      state.token = '';
    },
    set_loading(state) {
      state.loading = true;
    },
    clear_loading(state) {
      state.loading = false;
    },
  },
  actions: {
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request');
        axios
          .post('login', user)
          .then((resp) => {
            if (resp.data.code === 200) {
              const { jwtToken, userResponse } = resp.data.data;
              // const messagingToken = localStorage.getItem('');
              localStorage.setItem('token', jwtToken);
              axios.defaults.headers.common.Authorization = `Bearer ${jwtToken}`;

              axios.get('/users/profile/me').then((res) => {
                const profile = res.data.data;
                Object.assign(userResponse, profile);
                commit('auth_success', { jwtToken, user: userResponse });
                resolve(resp);
              });
            } else {
              commit('auth_error');
              localStorage.removeItem('token');
              resolve(resp);
            }
          })
          .catch((err) => {
            commit('auth_error');
            localStorage.removeItem('token');
            reject(err);
          });
      });
    },
    logout({ commit }) {
      // eslint-disable-next-line no-unused-vars
      return axios.post('logout').then((res) => {
        commit('logout');
        localStorage.removeItem('token');
        delete axios.defaults.headers.common.Authorization;
        return res;
      }).catch((err) => {
        commit('logout');
        localStorage.removeItem('token');
        delete axios.defaults.headers.common.Authorization;
        return err;
      });
    },
    register({ commit }, user) {
      return new Promise((resolve, reject) => {
        axios({ url: 'register', data: user, method: 'POST' })
          .then((resp) => {
            resolve(resp);
          })
          .catch((err) => {
            commit('auth_error', err);
            localStorage.removeItem('token');
            reject(err);
          })
          .finally(() => {
          });
      });
    },
    // eslint-disable-next-line no-unused-vars
    verify({ commit }, token) {
      return axios.post(`api/email/${token}`);
    },
    refresh({ commit, state }) {
      if (state.token) {
        commit('auth_request');
        return axios
          .post('refresh')
          .then((resp) => {
            if (resp.data.code === 200) {
              const { jwtToken, userResponse } = resp.data.data;
              // const messagingToken = localStorage.getItem('');
              localStorage.setItem('token', jwtToken);
              axios.defaults.headers.common.Authorization = `Bearer ${jwtToken}`;

              axios.get('/users/profile/me').then((res) => {
                const profile = res.data.data;
                Object.assign(userResponse, profile);
                commit('auth_success', { jwtToken, user: userResponse });
              });
            } else {
              commit('auth_success', { token: '23232323', user: resp.data.data });
            }
            return resp;
          })
          .catch((err) => {
            localStorage.removeItem('token');
            return err;
          });
      }
      return null;
    },
    // eslint-disable-next-line no-unused-vars
    uploadPicture({ commit }, img) {
      const formData = new FormData();
      formData.append('photo', img);

      return axios.post('/users/photo', formData).then((res) => {
        commit('updatePicture');
        return res;
      });
    },
    getUser(id) {
      return axios
        .get(`users/profile/${id}`);
    },
    editUser({ commit }, data) {
      return axios.put('users/profile', data)
        .then((res) => {
          commit('set_user', res.data.data);
          return res;
        });
    },
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    user: state => state.user,
    isAuthorized: state => (roleAccess) => {
      if (state.token) {
        const { user } = state;
        if (state.status === 'success' && user) {
          const userRole = user.role;
          for (let i = 0; i < roleAccess.length; i += 1) {
            const element = roleAccess[i];
            console.log(element);
            switch (element) {
              case 'customer':
                if (userRole.customer) { return true; }
                break;
              case 'cashier':
                if (userRole.cashier) { return true; }
                break;
              case 'owner':
                if (userRole.owner) { return true; }
                break;
              case 'cs':
                if (userRole.customerService) { return true; }
                break;
              default:
                return false;
            }
          }
        } else {
          return false;
        }
      }
      return false;
    },
    isLoading: state => state.loading,
  },
};
