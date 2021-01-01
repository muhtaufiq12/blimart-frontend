import { RouterLinkStub, mount, createLocalVue } from '@vue/test-utils';
import Wishlist from '@/views/Wishlist.vue';
import Vuetify from 'vuetify';
import Vue from 'vue';
import store from '../../../src/store';
// import Vuetify from 'vuetify';
const localVue = createLocalVue();

describe('Wishlist.vue', () => {
  let vuetify; let
    wrapper;

  beforeEach(() => {
    vuetify = new Vuetify();
    wrapper = mount(Wishlist, {
      localVue,
      vuetify,
      mocks: {
        $store: store,
      },
      stubs: {
        RouterLink: RouterLinkStub,
      },
    });
  });
  it('Simulate Delete', () => wrapper.vm.getWishlist().then(async (res) => {
    const button = wrapper.find(`#delete-${res.data.data[0].id}`);
    button.trigger('click');
    await Vue.nextTick();
    wrapper.find('#deleteItem').trigger('click');
  }));
  it('Simulate Add To Cart', () => wrapper.vm.getWishlist().then(async (res) => {
    const button = wrapper.find(`#addToCart-${res.data.data[0].id}`);
    button.trigger('click');
    await Vue.nextTick();

    wrapper.vm.nItem = 2;

    expect(wrapper.vm.nItem).toBe(2);

    wrapper.find('#save').trigger('click');
    await Vue.nextTick();

    expect(wrapper.vm.valid).toBe(true);
    expect(wrapper.vm.validate()).toBe(true);
  }));
  it('Simulate Add To Cart Not Valid', () => wrapper.vm.getWishlist().then(async (res) => {
    const button = wrapper.find(`#addToCart-${res.data.data[0].id}`);
    button.trigger('click');
    await Vue.nextTick();

    wrapper.vm.nItem = '';

    await Vue.nextTick();

    wrapper.find('#save').trigger('click');

    expect(wrapper.vm.validate()).toBe(false);
  }));
  it('Simulate Delete All', () => wrapper.vm.getWishlist().then(async () => {
    const button = wrapper.find('#deleteAllBtn');
    button.trigger('click');
    await Vue.nextTick();
    wrapper.find('#deleteAllBtnConfirmed').trigger('click');
  }));
});
