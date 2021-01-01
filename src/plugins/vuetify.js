import Vue from 'vue';
import Vuetify, { colors } from 'vuetify/lib';
import '@fortawesome/fontawesome-free/css/all.css';

import id from 'vuetify/es5/locale/id';

const dark = JSON.parse(localStorage.getItem('dark_theme'));

Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    locales: { id },
    current: 'id',
  },
  icons: {
    iconfont: 'fa',
  },
  theme: {
    themes: {
      light: {
        primary: '#0193D9',
        secondary: colors.deepPurple.darken2,
        accent: '#c51162',
        error: colors.red.darken3,
        background: '#F5F5F5', // Not automatically applied
        surface: '#ffffff',
        onSurface: '#080808',
      },
      dark: {
        primary: colors.blue.lighten2,
        secondary: colors.deepPurple.lighten2,
        accent: '#c51162',
        success: colors.green,
        error: '#CF6679',
        background: '#121212', // Not automatically applied
        surface: '#1e1e1e',
        onSurface: '#ffffff',
      },
    },
    options: { customProperties: true },
    dark: dark || false,
  },
});
