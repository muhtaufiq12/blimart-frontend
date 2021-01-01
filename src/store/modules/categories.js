
import Axios from 'axios';

const basePath = 'categories';

export default {
  namespaced: true,
  state: {
    categories: [],
  },
  mutations: {
    setCategories(state, payload) {
      state.categories = payload;
    },
    addCategory(state, payload) {
      state.categories.unshift(payload);
    },
    editCategory(state, { index, data }) {
      Object.assign(state.categories[index], data);
    },
    deleteCategory(state, index) {
      state.categories.splice(index, 1);
    },
  },
  getters: {
    categories: state => state.categories,
  },
  actions: {
    getCategories({ commit }) {
      return Axios.get(basePath)
        .then((res) => {
          commit('setCategories', res.data.data);
        });
    },
    deleteCategory({ commit }, { index, data }) {
      return Axios.delete(`${basePath}/${data.id}`)
        .then(() => {
          commit('deleteCategory', index);
        });
    },
    addCategory({ commit }, obj) {
      return Axios.post(basePath, obj)
        .then((res) => {
          commit('addCategory', res.data.data);
        });
    },
    editCategory({ commit }, { index, data }) {
      return Axios.put(basePath, data)
        .then((res) => {
          commit('editCategory', { index, data: res.data.data });
        });
    },
  },
};
