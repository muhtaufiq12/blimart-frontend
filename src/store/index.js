import Vue from 'vue';
import Vuex from 'vuex';
import layout from './modules/layout';
import products from './modules/products';
import reviews from './modules/reviews';
import wishlist from './modules/wishlist';
import cart from './modules/cart';
import payment from './modules/payment';
import auth from './modules/auth';
import orderList from './modules/order-list';
import categories from './modules/categories';
import suppliers from './modules/suppliers';
import users from './modules/users';
import procurements from './modules/procurements';
import ar from './modules/ar';
import transaction from './modules/transaction';
import map from './modules/map';
import retails from './modules/retails';

Vue.use(Vuex);


export default
new Vuex.Store({
  modules: {
    layout,
    products,
    reviews,
    wishlist,
    cart,
    payment,
    auth,
    orderList,
    categories,
    suppliers,
    users,
    procurements,
    ar,
    transaction,
    map,
    retails,
  },
});
