
import Axios from 'axios';

const basePath = 'wishlists';

export default {
  namespaced: true,
  state: {
    wishlist: [],
  },
  mutations: {
    setWishlist(state, payload) {
      state.wishlist = payload;
    },
    deleteWishlist(state, index) {
      state.wishlist.splice(index, 1);
    },
  },
  getters: {
    wishlist: state => state.wishlist,
  },
  actions: {
    getWishlist({ commit }) {
      return Axios.get(`${basePath}/me?page=1&size=10000`)
        .then((res) => {
          commit('setWishlist', res.data.data);
          return res;
        });
    },
    deleteAllWishlist({ commit }, data) {
      return Axios.delete(`${basePath}?id=*`, { data })
        .then((res) => {
          commit('setWishlist', []);
          return res;
        });
    },
    deleteWishlist({ commit }, { id, index }) {
      return Axios.delete(`${basePath}/${id}`, { data: { productId: '-', id, totalItem: 1 } })
        .then((res) => {
          commit('deleteWishlist', index);
          return res;
        });
    },
    addWishlist({ commit }, idProduct) {
      return Axios.post(`${basePath}?id=${idProduct}`, { productId: idProduct, totalItem: 1 })
        .then((res) => {
          commit('setWishlist', res.data.data);
          return res;
        });
    },
  },
};
