
import Axios from 'axios';

const basePath = 'ar';

export default {
  namespaced: true,
  state: {
    marks: [],
  },
  mutations: {
    setMarks(state, payload) {
      state.marks = payload;
    },
    addMark(state, payload) {
      state.marks.unshift(payload);
    },
    editMark(state, { index, data }) {
      Object.assign(state.marks[index], data);
      state.marks[index].id = '3';
      state.marks[index].id = data.id;
    },
    deleteMark(state, index) {
      state.marks.splice(index, 1);
    },
  },
  getters: {
    marks: state => state.marks,
  },
  actions: {
    getMarks({ commit }) {
      return Axios.get(`${basePath}/marks`)
        .then((res) => {
          commit('setMarks', res.data.data);
          return res;
        });
    },
    addMark({ commit }, data) {
      return Axios.post(`${basePath}/marks`, data).then((res) => {
        commit('addMark', res.data.data);
        return res;
      });
    },
    editMark({ commit }, { data, index }) {
      return Axios.put(`${basePath}/marks`, data).then((res) => {
        commit('editMark', { index, data: res.data.data });
        return res;
      });
    },
    deleteMark({ commit }, { index, data }) {
      return Axios.delete(`${basePath}/marks/${data.id}`).then((res) => {
        commit('deleteMark', index);
        return res;
      });
    },

    // eslint-disable-next-line no-unused-vars
    initAR({ commit }, data) {
      return Axios.post(`${basePath}/route`, data);
    },
    // eslint-disable-next-line no-unused-vars
    foundMark({ commit }, { id, markId }) {
      return Axios.put(`${basePath}/${id}?mark=${markId}`);
    },
  },
};
