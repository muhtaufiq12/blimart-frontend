/* eslint-disable guard-for-in */
import Vue from 'vue';
import Vuetify from 'vuetify';
import moment from 'moment';
import VueCarousel3d from 'vue-carousel-3d';
import MockAdapter from 'axios-mock-adapter';
import Axios from 'axios';
import Vuex from 'vuex';
import Notifications from 'vue-notification';
import mockItem from '../src/mock';


Vue.use(VueCarousel3d);
Vue.use(Vuetify);
Vue.use(Notifications);
Vue.use(Vuex);
Axios.defaults.baseURL = 'http://localhost';
const mock = new MockAdapter(Axios);

mockItem.forEach((v) => {
  switch (v.method) {
    case 'POST': {
      mock.onPost(v.path).reply(v.status, { code: 200, paging: {}, data: v.data });
      break;
    }
    case 'GET': {
      mock.onGet(v.path).reply(v.status, { code: 200, paging: {}, data: v.data });
      break;
    }
    case 'PUT': {
      mock.onPut(v.path).reply(v.status, { code: 200, paging: {}, data: v.data });
      break;
    }
    case 'DELETE': {
      mock.onDelete(v.path).reply(v.status, { code: 200, paging: {}, data: v.data });
      break;
    }
    case 'PATCH': {
      mock.onPatch(v.path).reply(v.status, { code: 200, paging: {}, data: v.data });
      break;
    }
    default: {
      mock.onGet(v.path).reply(v.status, { paging: {}, data: v.data });
      break;
    }
  }
});

moment.locale('id');
Vue.filter('date', (value) => {
  if (value) {
    return moment(String(value), 'x').format('LL');
  }
  return '-';
});
Vue.filter('serverImg', (value) => {
  if (value) {
    return `${`localhost${value}`}`;
  }
  return '';
});
Vue.filter('initial', (value) => {
  if (value) {
    const names = value.split(' ');
    let initials = names[0].substring(0, 1).toUpperCase();

    if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
  }
  return '';
});

Vue.filter('time', (value) => {
  if (value) {
    return moment(String(value), 'x').format('LT');
  }
  return '-';
});
Vue.filter('dateTime', (value) => {
  if (value) {
    return moment(String(value), 'x').format('LLL');
  }
  return '-';
});
Vue.filter('price', (value) => {
  if (value || value === 0) {
    return value.toLocaleString('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 2,
    });
  }
  return '';
});

Vue.filter('dynamicSortA', (property) => {
  let sortOrder = 1;
  let buf = property;
  if (property[0] === '-') {
    sortOrder = -1;
    buf = property.substr(1);
  }
  // eslint-disable-next-line func-names
  return function (a, b) {
    /* next line works with strings and numbers,
     * and you may want to customize it to your needs
     */
    // eslint-disable-next-line no-nested-ternary
    const result = (a[buf] < b[buf]) ? -1 : (a[buf] > b[buf]) ? 1 : 0;
    return result * sortOrder;
  };
});
Vue.filter('dynamicSortD', (property) => {
  let sortOrder = 1;
  let buf = property;
  if (property[0] === '-') {
    sortOrder = -1;
    buf = property.substr(1);
  }
  // eslint-disable-next-line func-names
  return function (a, b) {
    /* next line works with strings and numbers,
     * and you may want to customize it to your needs
     */
    // eslint-disable-next-line no-nested-ternary
    const result = (a[buf] > b[buf]) ? -1 : (a[buf] < b[buf]) ? 1 : 0;
    return result * sortOrder;
  };
});


Vue.filter('dynamicSearch', (keyword) => {
  // eslint-disable-next-line func-names
  const f = function (obj) {
    /* next line works with strings and numbers,
     * and you may want to customize it to your needs
     */
    // eslint-disable-next-line no-nested-ternary
    if (keyword === '') return true;
    // eslint-disable-next-line no-restricted-syntax
    for (const key in obj) {
      // eslint-disable-next-line eqeqeq
      // eslint-disable-next-line no-constant-condition
      if (typeof obj[key] === 'object' && obj[key] != null) {
        return this.filterFunction(obj[key], keyword);
      }
      const a = String.prototype.toLowerCase.apply(obj[key] || '');
      if (typeof a === 'string') {
        if (a.includes(keyword.toLowerCase())) {
          return true;
        }
      }
    }
    return false;
  };
  return f;
});
HTMLCanvasElement.prototype.getContext = () => {
  // return whatever getContext has to return
};

Vue.config.productionTip = false;
