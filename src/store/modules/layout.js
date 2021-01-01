
import Vue from 'vue';

export default {
  namespaced: true,
  state: {
    layout: 'default-layout',
  },
  mutations: {
  },
  getters: {
  },
  actions: {
    TOGLE_THEME() {
      localStorage.setItem('dark_theme', !Vue.prototype.$vuetify.framework.theme.dark);
      Vue.prototype.$vuetify.framework.theme.dark = !Vue.prototype.$vuetify.framework.theme.dark;
    },
  },
};
