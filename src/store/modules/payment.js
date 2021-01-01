
import Axios from 'axios';

const basePath = 'transactions';
export default {
  namespaced: true,
  state: {
    payment: { detailResponses: [] },
  },
  mutations: {
    setPayment(state, payload) {
      state.payment = payload;
    },
  },
  getters: {
    payment: state => state.payment,
  },
  actions: {
    getPayment({ commit }) {
      return Axios.get(`${basePath}/me`).then((res) => {
        commit('setPayment', res.data.data);
      });
    },
  },
};
