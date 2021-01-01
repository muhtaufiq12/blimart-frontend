
import Axios from 'axios';

const basePath = 'users';

export default {
  namespaced: true,
  state: {
    users: [],
    pagination: {},
  },
  mutations: {
    setUsers(state, { paging, data }) {
      state.users = data;
      state.pagination = paging;
    },
    addUser(state, payload) {
      state.users.unshift(payload);
    },
    editUser(state, { index, data }) {
      Object.assign(state.users[index], data);
    },
    deleteUser(state, index) {
      state.users.splice(index, 1);
    },
  },
  getters: {
    users: state => state.users,
    paging: state => state.pagination,
  },
  actions: {
    pagination({ commit }, option) {
      return Axios.get(`${basePath}?page=${option.page}&size=${option.itemsPerPage}`).then((res) => {
        commit('setUsers', res.data);
        return res;
      });
    },
    getUsers({ commit }) {
      return Axios.get(basePath)
        .then((res) => {
          commit('setUsers', res.data);
          return res;
        });
    },
    deleteUser({ commit }, { index, data }) {
      return Axios.delete(`${basePath}/${data.id}`)
        .then((res) => {
          commit('editUser', { index, data: res.data.data });
          return res;
        });
    },
    unblockUser({ commit }, { index, data }) {
      return Axios.post(`${basePath}/unblock/${data.id}`)
        .then((res) => {
          commit('editUser', { index, data: res.data.data });
          return res;
        });
    },
    addUser({ commit }, obj) {
      return Axios.post(basePath, obj)
        .then((res) => {
          commit('addUser', res.data.data);
          return res;
        });
    },
  },
};
