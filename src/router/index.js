import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';
// import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('../views/Home.vue'),
      },
      {
        path: '/product/:id',
        name: 'product',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Product.vue'),
      },
      {
        path: '/experiment',
        name: 'abexperimentout',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Experiment.vue'),
      },
      {
        path: '/category',
        name: 'category',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Category.vue'),
      },
      {
        path: '/category/:id',
        name: 'SearchCategory',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/SearchCategory.vue'),
      },
      {
        path: '/order-list',
        name: 'OrderList',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/OrderList.vue'),
      },
      {
        path: '/map',
        name: 'Map',
        component: () => import('../views/Map.vue'),
      },
      {
        path: '/cart',
        name: 'Cart',
        meta: {
          auth: true,
        },
        component: () => import('../views/Cart.vue'),
      },
      {
        path: '/account',
        name: 'Account',
        component: () => import('../views/Profile.vue'),
        meta: {
          auth: true,
        },
      },
      {
        path: '/search/:keyword',
        name: 'Search',
        component: () => import('../views/Search.vue'),
        meta: {
          auth: null,
        },
      },
      {
        path: '/search-qr',
        name: 'SearchQR',
        component: () => import('../views/SearchQRCode.vue'),
        meta: {
          auth: null,
        },
      },
    ],
    component: () => import(/* webpackChunkName: "about" */ '../layouts/Main.vue'),
  },
  {
    path: '/ar/:id',
    name: 'AR',
    component: () => import('../views/AR.vue'),
    meta: {
      auth: null,
    },
  },
  {
    path: '/login',
    children: [
      {
        path: '',
        name: 'Login',
        component: () => import('../views/Login.vue'),
        meta: {
          auth: false,
        },
      },
    ],
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../layouts/Flat.vue'),
  },
  {
    path: '/admin',
    meta: {
      auth: true,
      isAdmin: true,
    },
    children: [
      {
        path: '',
        name: 'ProductAdmin2',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/AdminProduct.vue'),
      },
      {
        path: 'product',
        name: 'ProductAdmin',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/AdminProduct.vue'),
      },
      {
        path: 'retail',
        name: 'RetailAdmin',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/AdminRetail.vue'),
      },
      {
        path: 'category',
        name: 'CategoryAdmin',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/AdminCategory.vue'),
      },
      {
        path: 'supplier',
        name: 'SupplierAdmin',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/AdminSupplier.vue'),
      },
      {
        path: 'user',
        name: 'UserAdmin',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/AdminUser.vue'),
      },
      {
        path: 'mark',
        name: 'MarkAdmin',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/AdminMark.vue'),
      },
      {
        path: 'procurement',
        name: 'ProcurementAdmin',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/AdminProcurement.vue'),
      },
    ],
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../layouts/Dashboard.vue'),
  },
  {
    path: '/register',
    children: [
      {
        path: '',
        name: 'Register',
        component: () => import('../views/Register.vue'),
        meta: {
          auth: false,
        },
      },
    ],
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../layouts/Flat.vue'),
  },
  {
    path: '/payment/success',
    children: [
      {
        path: '',
        name: 'PaymentSuccess',
        component: () => import('../views/TransactionSuccess.vue'),
      },
    ],
    meta: {
      auth: true,
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../layouts/FlatNoAppBar.vue'),
  },
  {
    path: '/payment/:id',
    children: [
      {
        path: '',
        name: 'Payment',
        component: () => import('../views/Payment.vue'),
      },
    ],
    meta: {
      auth: true,
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../layouts/FlatNoAppBar.vue'),
  },
  // {
  //   path: '/payment',
  //   meta: {
  //     auth: true,
  //   },
  //   children: [{
  //     path: '',
  //     name: 'ActivePayment',
  //     component: () => import('../views/ActivePayment.vue'),
  //   }],
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../layouts/FlatNoAppBar.vue'),
  // },
  {
    path: '/wishlist',
    meta: {
      auth: true,
    },
    children: [
      {
        path: '',
        name: 'Wishlist',
        component: () => import('../views/Wishlist.vue'),
      },
    ],
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../layouts/FlatNoAppBar.vue'),
  },
  {
    path: '*',
    children: [
      {
        path: '',
        name: 'NotFound',
        component: () => import('../views/NotFound.vue'),
      },
    ],

    component: () => import(/* webpackChunkName: "about" */ '../layouts/Main.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.auth)) {
    if (store.getters['auth/isLoggedIn']) {
      const user = store.getters['auth/user'];
      if (user.isAdmin === true || !to.matched.some(record => record.meta.isAdmin)) {
        next();
        return;
      }
      if (user.id === undefined) {
        store.dispatch('auth/refresh').then((res) => {
          if (res.data.code !== 200) {
            next({ name: 'Login' });
            return;
          }
          if (
            res.data.data.userResponse.isAdmin
            || !to.matched.some(record => record.meta.isAdmin)
          ) {
            next();
          } else {
            next({ name: 'Login' });
          }
        });
      } else {
        next({ name: 'Login' });
      }
    } else {
      next({ name: 'Login' });
    }
  } else if (to.meta.auth === false) {
    if (store.getters['auth/isLoggedIn']) {
      next('404');
    } else {
      next();
    }
  } else {
    next();
  }
});
export default router;
