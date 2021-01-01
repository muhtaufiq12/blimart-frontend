
import Axios from 'axios';

const basePath = 'blimarts';

export default {
  namespaced: true,
  state: {
    retails: [],
    pagination: {},
  },
  mutations: {
    setRetails(state, { data, paging }) {
      state.retails = data;
      state.pagination = paging;
    },
    addRetail(state, payload) {
      state.retails.unshift(payload);
    },
    editRetail(state, { index, data }) {
      Object.assign(state.retails[index], data);
    },
    deleteRetail(state, index) {
      state.retails.splice(index, 1);
    },
  },
  getters: {
    retails: state => state.retails,
    paging: state => state.pagination,
  },
  actions: {
    pagination({ commit }, option) {
      return Axios.get(`${basePath}?page=${option.page}&size=${option.itemsPerPage}`).then((res) => {
        commit('setRetails', res.data);
        return res;
      });
    },
    getRetails({ commit }) {
      return Axios.get(`${basePath}?page=1&size=1000`)
        .then((res) => {
          commit('setRetails', res.data);
          return res;
        });
    },
    deleteRetail({ commit }, { index, data }) {
      return Axios.delete(`${basePath}/${data.id}`)
        .then((res) => {
          commit('deleteRetail', index);
          return res;
        });
    },
    addRetail({ commit }, obj) {
      return Axios.post(basePath, obj)
        .then((res) => {
          commit('addRetail', res.data.data);
          return res;
        });
    },
    editRetail({ commit }, { index, data }) {
      return Axios.put(basePath, data)
        .then((res) => {
          commit('editRetail', { index, data: res.data.data });
          return res;
        });
    },
  },
};
