
import Axios from 'axios';

const basePath = 'suppliers';

export default {
  namespaced: true,
  state: {
    suppliers: [],
    pagination: {},
  },
  mutations: {
    setSuppliers(state, { data, paging }) {
      state.suppliers = data;
      state.pagination = paging;
    },
    addSupplier(state, payload) {
      state.suppliers.unshift(payload);
    },
    editSupplier(state, { index, data }) {
      Object.assign(state.suppliers[index], data);
    },
    deleteSupplier(state, index) {
      state.suppliers.splice(index, 1);
    },
  },
  getters: {
    suppliers: state => state.suppliers,
    paging: state => state.pagination,
  },
  actions: {
    pagination({ commit }, option) {
      return Axios.get(`${basePath}?page=${option.page}&size=${option.itemsPerPage}`).then((res) => {
        commit('setSuppliers', res.data);
        return res;
      });
    },
    getSuppliers({ commit }) {
      return Axios.get(`${basePath}?page=1&size=100`)
        .then((res) => {
          commit('setSuppliers', res.data);
          return res;
        });
    },
    deleteSupplier({ commit }, { index, data }) {
      return Axios.delete(`${basePath}/${data.id}`)
        .then((res) => {
          commit('deleteSupplier', index);
          return res;
        });
    },
    addSupplier({ commit }, obj) {
      return Axios.post(basePath, obj)
        .then((res) => {
          commit('addSupplier', res.data.data);
          return res;
        });
    },
    editSupplier({ commit }, { index, data }) {
      return Axios.put(basePath, data)
        .then((res) => {
          commit('editSupplier', { index, data: res.data.data });
          return res;
        });
    },
  },
};
