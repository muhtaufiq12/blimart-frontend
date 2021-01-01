/* eslint-disable no-unused-vars */

import Axios from 'axios';

const basePath = 'carts';

export default {
  namespaced: true,
  state: {
    cart: { details: [] },
  },
  mutations: {
    setCart(state, payload) {
      state.cart = payload;
    },
    deleteCart(state, index) {
      state.cart.splice(index, 1);
    },
  },
  getters: {
    cart: state => state.cart,
  },
  actions: {
    getCart({ commit }) {
      return Axios.get(`${basePath}/me`)
        .then((res) => {
          commit('setCart', res.data.data);
        });
    },
    deleteCart({ commit }, { id, index }) {
      return Axios.delete(`${basePath}`, { data: { ids: [id] } })
        .then((res) => {
          commit('deleteCart', index);
          return res;
        });
    },
    deleteAllCart({ commit }, arr) {
      return Axios.delete(`${basePath}`, { data: { ids: arr } })
        .then((res) => {
          commit('setCart', []);
        });
    },
    deleteAnyCart({ commit }, arr) {
      return Axios.delete(`${basePath}`, { data: { ids: arr } });
      // .then((res) => {
      //   commit('setCart', res.data.data);
      // });
    },
    // eslint-disable-next-line no-unused-vars
    order({ commit }, { idProduct, ids }) {
      return Axios.post('$order', { ids });
    },
    addCart({ commit }, { idProduct, nItem }) {
      return Axios.post(`${basePath}?id=${idProduct}&total=${nItem}`, { productId: idProduct, totalItem: nItem })
        .then((res) => {
          commit('setCart', res.data.data);
        });
    },
  },
};
