/* eslint-disable no-unused-vars */

import Axios from 'axios';

export default {
  namespaced: true,
  state: {
    products: [],
    promotion: [],
    popular: [],
    blimartId: localStorage.getItem('blimartId'),
    randomProducts: [],
    product: { supplier: {}, category: {} },
    pagination: {},
  },
  mutations: {
    setProducts(state, { paging, data }) {
      state.products = data;
      state.pagination = paging;
    },
    setRandomProducts(state, data) {
      state.randomProducts = data;
    },
    setProduct(state, payload) {
      state.product = payload;
    },
    addProduct(state, payload) {
      state.products.unshift(payload);
    },
    setPromotion(state, payload) {
      state.promotion = payload;
    },
    setPopular(state, payload) {
      state.popular = payload;
    },
    setRetail(state, id) {
      localStorage.setItem('blimartId', id);
      window.location.reload();
    },
    updatePicture(state, index) {
      state.products[index].photoUrl = `/products/photo/${state.products[index].id}?t=${Math.random() * 200}`;
    },
    editProduct(state, { index, data }) {
      Object.assign(state.products[index], data);
      state.products[index].id = '3';
      state.products[index].id = data.id;
    },
    deleteProduct(state, index) {
      state.products.splice(index, 1);
    },
  },
  getters: {
    products: state => state.products,
    promotion: state => state.promotion,
    randomProducts: state => state.randomProducts,
    popular: state => state.popular,
    product: state => state.product,
    paging: state => state.pagination,
    blimartId: state => state.blimartId,
  },
  actions: {
    pagination({ commit }, option) {
      return Axios.get(`/products?page=${option.page}&size=${option.itemsPerPage}`).then((res) => {
        commit('setProducts', res.data);
        return res;
      });
    },
    searchProducts({ commit, state }, q) {
      return Axios.get(`/products/search?page=1&size=100&keyword=${q}&blimartId=${state.blimartId}`).then((res) => {
        commit('setProducts', res.data);
        return res;
      });
    },
    searchCategoryProducts({ commit, state }, id) {
      return Axios.get(`/products/category/${id}?page=1&size=100&blimartId=${state.blimartId}`).then((res) => {
        commit('setProducts', res.data);
        return res;
      });
    },
    getProducts({ commit, state }) {
      return Axios.get(`/products/blimart/${state.blimartId}?page=1&size=100`).then((res) => {
        commit('setProducts', res.data);
        return res;
      });
    },
    getProduct({ commit }, id) {
      return Axios.get(`/products/${id}`).then((res) => {
        if (!res.data) {
          return res;
        }
        commit('setProduct', res.data.data);
        return res;
      });
    },
    getRandomProducts({ commit, state }) {
      return Axios.get(`/products/random?page=1&size=30&blimartId=${state.blimartId}`).then((res) => {
        commit('setRandomProducts', res.data.data);
        return res;
      });
    },
    getRandomRelatedProducts({ commit, state }, id) {
      return Axios.get(`/products/random/${id}?page=1&size=30&blimartId=${state.blimartId}`).then((res) => {
        commit('setRandomProducts', res.data.data);
        return res;
      });
    },
    getPromotion({ commit, state }) {
      return Axios.get(`products/promo?page=1&size=10&blimartId=${state.blimartId}`).then((res) => {
        commit('setPromotion', res.data.data);
        return res;
      });
    },
    getPopular({ commit, state }) {
      return Axios.get(`products/top-sold?page=1&size=10&blimartId=${state.blimartId}`).then((res) => {
        commit('setPopular', res.data.data);
        return res;
      });
    },
    editProduct({ commit }, { index, data }) {
      const buf = { ...data };
      buf.categoryId = data.category.id;
      buf.blimartId = data.retail.id;
      return Axios.put('/products', buf).then((res) => {
        commit('editProduct', { index, data: res.data.data });
        return res;
      });
    },
    addProduct({ commit }, data) {
      const buf = { ...data };
      buf.price = parseInt(data.price, 10);
      buf.stock = parseInt(data.stock, 10);
      buf.categoryId = data.category.id;
      buf.blimartId = data.retail.id;
      return Axios.post('/products', buf).then((res) => {
        commit('addProduct', res.data.data);
        return res;
      });
    },
    deleteProduct({ commit }, { index, data }) {
      return Axios.delete(`/products/${data.id}`).then((res) => {
        commit('deleteProduct', index);
        return res;
      });
    },
    uploadPicture({ commit }, { index, id, img }) {
      const formData = new FormData();
      formData.append('photo', img);

      return Axios.post(`/products/photo/${id}`, formData).then((res) => {
        commit('updatePicture', index);
        return res;
      });
    },
    setRetail({ commit }, id) {
      commit('setRetail', id);
    },
    // eslint-disable-next-line object-curly-spacing
    clearRetail() {
      localStorage.removeItem('blimartId');
      window.location.reload();
    },
  },
};
