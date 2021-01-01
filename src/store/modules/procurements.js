
import Axios from 'axios';

const basePath = 'supplies';

export default {
  namespaced: true,
  state: {
    supplies: [],
    pagination: {},
  },
  mutations: {
    setSupplies(state, { data, paging }) {
      state.supplies = data;
      state.pagination = paging;
    },
    addSupply(state, payload) {
      state.supplies.unshift(payload);
    },
    editSupply(state, { index, data }) {
      Object.assign(state.supplies[index], data);
    },
    deleteSupply(state, index) {
      state.supplies.splice(index, 1);
    },
  },
  getters: {
    supplies: state => state.supplies,
    paging: state => state.pagination,
  },
  actions: {
    pagination({ commit }, option) {
      return Axios.get(`${basePath}?page=${option.page}&size=${option.itemsPerPage}`).then((res) => {
        commit('setSupplies', res.data);
      });
    },
    getSupplies({ commit }) {
      return Axios.get(basePath)
        .then((res) => {
          commit('setSupplies', res.data);
        });
    },
    deleteSupply({ commit }, { index, data }) {
      return Axios.delete(`${basePath}/${data.id}`)
        .then(() => {
          commit('deleteSupply', index);
        });
    },
    addSupply({ commit }, obj) {
      return Axios.post(basePath, obj)
        .then((res) => {
          commit('addSupply', res.data.data);
        });
    },
    editSupply({ commit }, { index, data }) {
      return Axios.put(basePath, data)
        .then((res) => {
          commit('editSupply', { index, data: res.data.data });
        });
    },
  },
};
