
import Axios from 'axios';

export default {
  namespaced: true,
  state: {
    review: [],
  },
  mutations: {
    setReview(state, payload) {
      state.review = payload;
    },
  },
  getters: {
    review: state => state.review,
  },
  actions: {
    getReview({ commit }, productId) {
      return Axios.get(`/review/${productId}`).then((res) => {
        commit('setReview', res.data.data);
      });
    },
  },
};
