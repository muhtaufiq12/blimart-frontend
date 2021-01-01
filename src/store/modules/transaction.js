/* eslint-disable no-unused-vars */

import Axios from 'axios';

export default {
  namespaced: true,
  state: {
    payment: [],
    payments: [],
  },
  mutations: {
    setPayment(state, data) {
      state.payment = data;
    },
    setPayments(state, data) {
      state.payments = data;
    },
  },
  getters: {
    payment: state => state.payment,
    payments: state => state.payments,
  },
  actions: {
    getPayment({ commit }, id) {
      return Axios.get(`transactions/${id}`).then((res) => {
        commit('setPayment', res.data.data);
        return res;
      });
    },
    getPayments({ commit }, id) {
      return Axios.get('transactions/me').then((res) => {
        commit('setPayments', res.data.data);
        return res;
      });
    },
    checkout({ commit }, payload) {
      const arr = [];
      Object.keys(payload).forEach((key) => {
        arr.push({
          productId: payload[key].productResponse.id,
          totalItem: payload[key].totalItem || 1,
        });
      });

      return Axios.post('/checkout', { products: arr });
    },
    pay({ commit }, id) {
      return Axios.post(`transactions/payment/${id}`);
    },
  },
};
