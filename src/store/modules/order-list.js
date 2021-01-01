
import Axios from 'axios';

const basePath = 'transactions/history';

export default {
  namespaced: true,
  state: {
    orderList: [],
  },
  mutations: {
    setOrderList(state, payload) {
      state.orderList = payload;
    },
  },
  getters: {
    orderList: state => state.orderList,
  },
  actions: {
    getOrderList({ commit }) {
      return Axios.get(`${basePath}?page=1&size=100`)
        .then((res) => {
          commit('setOrderList', res.data.data);
          return res;
        });
    },
  },
};
