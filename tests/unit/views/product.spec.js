import { RouterLinkStub, createLocalVue, mount } from '@vue/test-utils';
import Product from '@/views/Product.vue';
import Vuetify from 'vuetify';
import Vue from 'vue';
import store from '../../../src/store';
// import Vuetify from 'vuetify';
const localVue = createLocalVue();

describe('Product.vue', () => {
  let vuetify;
  let wrapper;

  beforeEach(() => {
    vuetify = new Vuetify();
    wrapper = mount(Product, {
      localVue,
      vuetify,
      mocks: {
        $store: store,
        $route: { params: { id: 1 } },
        $router: { push: jest.fn(() => {}) },
      },
      stubs: {
        RouterLink: RouterLinkStub,
      },
    });
  });
  it('Simulate Add To Wishlist', async () => {
    wrapper.vm.isLoggedIn = () => true;
    expect(wrapper.vm.isLoggedIn()).toBe(true);
    await Vue.nextTick();

    wrapper.find('#addWishlistBtn').trigger('click');
  });
  it('Simulate Add To Wishlist UnAuthorized', async () => {
    wrapper.vm.isLoggedIn = () => false;
    expect(wrapper.vm.isLoggedIn()).toBe(false);
    await Vue.nextTick();

    wrapper.find('#addWishlistBtn').trigger('click');
  });
  it('Simulate Buy Now', async () => {
    wrapper.vm.isLoggedIn = () => true;
    expect(wrapper.vm.isLoggedIn()).toBe(true);
    await Vue.nextTick();

    wrapper.find('#buyNowBtn').trigger('click');
    wrapper.vm.nItem = 2;

    expect(wrapper.vm.nItem).toBe(2);

    await Vue.nextTick();
    wrapper.find('#save').trigger('click');
    expect(wrapper.vm.validate()).toBe(true);
  });
  it('Simulate Buy Now UnAuthorized', async () => {
    wrapper.vm.isLoggedIn = () => false;
    expect(wrapper.vm.isLoggedIn()).toBe(false);
    await Vue.nextTick();

    wrapper.find('#buyNowBtn').trigger('click');
    wrapper.vm.nItem = 2;

    expect(wrapper.vm.nItem).toBe(2);

    await Vue.nextTick();
    expect(wrapper.find('#save').exists()).toBeFalsy();
  });

  it('Simulate Add To Cart Not Valid', async () => {
    wrapper.vm.isLoggedIn = () => true;
    expect(wrapper.vm.isLoggedIn()).toBe(true);
    await Vue.nextTick();

    wrapper.find('#buyNowBtn').trigger('click');
    wrapper.vm.nItem = -1;

    expect(wrapper.vm.nItem).toBe(-1);

    await Vue.nextTick();
    wrapper.find('#save').trigger('click');
    expect(wrapper.vm.validate()).toBe(false);
  });
  it('Simulate Add To Cart UnAuthorized', async () => {
    wrapper.vm.isLoggedIn = () => false;
    expect(wrapper.vm.isLoggedIn()).toBe(false);
    await Vue.nextTick();

    wrapper.find('#addToCartBtn').trigger('click');
    wrapper.vm.nItem = 2;

    expect(wrapper.vm.nItem).toBe(2);

    await Vue.nextTick();

    expect(wrapper.find('#save').exists()).toBeFalsy();
  });
  it('Simulate Add To Cart', async () => {
    wrapper.vm.isLoggedIn = () => true;
    expect(wrapper.vm.isLoggedIn()).toBe(true);
    await Vue.nextTick();

    wrapper.find('#addToCartBtn').trigger('click');
    wrapper.vm.nItem = 2;

    expect(wrapper.vm.nItem).toBe(2);

    await Vue.nextTick();
    wrapper.find('#save').trigger('click');
    expect(wrapper.vm.validate()).toBe(true);
  });
  it('Simulate Add To Wishlist Failed', async () => {
    wrapper.vm.addWishlist = () => new Promise((resolve, reject) => {
      reject();
    });
    wrapper.vm.isLoggedIn = () => true;
    expect(wrapper.vm.isLoggedIn()).toBe(true);
    await Vue.nextTick();

    wrapper.find('#addWishlistBtn').trigger('click');
  });
  it('Simulate Add To Cart Failed', async () => {
    wrapper.vm.addCart = () => new Promise((resolve, reject) => {
      reject();
    });

    wrapper.vm.isLoggedIn = () => true;
    expect(wrapper.vm.isLoggedIn()).toBe(true);
    await Vue.nextTick();

    wrapper.find('#addToCartBtn').trigger('click');
    wrapper.vm.nItem = 2;

    expect(wrapper.vm.nItem).toBe(2);

    await Vue.nextTick();
    wrapper.find('#save').trigger('click');
    expect(wrapper.vm.validate()).toBe(true);
    expect(wrapper.vm.addToCartDialog).toBeTruthy();
  });
  it('Simulate Add To Cart UnAuthorized', async () => {
    wrapper.vm.isLoggedIn = () => false;
    expect(wrapper.vm.isLoggedIn()).toBe(false);
    await Vue.nextTick();

    wrapper.find('#addToCartBtn').trigger('click');
    wrapper.vm.nItem = 2;

    expect(wrapper.vm.nItem).toBe(2);

    await Vue.nextTick();
    expect(wrapper.find('#save').exists()).toBeFalsy();
  });

  it('Simulate Add To Cart Not Valid', async () => {
    wrapper.vm.isLoggedIn = () => true;
    expect(wrapper.vm.isLoggedIn()).toBe(true);
    await Vue.nextTick();

    wrapper.find('#addToCartBtn').trigger('click');
    wrapper.vm.nItem = -1;

    expect(wrapper.vm.nItem).toBe(-1);

    await Vue.nextTick();
    wrapper.find('#save').trigger('click');
    expect(wrapper.vm.validate()).toBe(false);
  });
});
