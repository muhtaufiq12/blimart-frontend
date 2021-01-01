import { RouterLinkStub, mount, createLocalVue } from '@vue/test-utils';
import Cart from '@/views/Cart.vue';
import Vue from 'vue';
import Vuetify from 'vuetify';
import store from '../../../src/store';
// import Vuetify from 'vuetify';
const localVue = createLocalVue();

describe('Cart.vue', () => {
  let wrapper;
  let vuetify;
  beforeEach(() => {
    vuetify = new Vuetify();
    wrapper = mount(Cart, {
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
  it('Mount Cart Delete 1', async () => {
    await Vue.nextTick();

    // console.log(wrapper.vm.listC[0].id);

    wrapper.find('#delete-1').trigger('click');
    await Vue.nextTick();

    wrapper.find('#deleteConfirmBtn').trigger('click');
  });
  it('Mount Cart Delete All', async () => {
    await Vue.nextTick();

    wrapper.find('#deleteAllBtn').trigger('click');
    await Vue.nextTick();

    wrapper.find('#deleteAllConfirmBtn').trigger('click');
  });
  it('Mount Cart Delete Any', async () => {
    await Vue.nextTick();

    // console.log(wrapper.vm.listC[0].id);

    expect(Object.keys(wrapper.vm.selected).length).toBe(2);

    wrapper.find('#checkAll').trigger('click');
    expect(Object.keys(wrapper.vm.selected).length).toBe(0);

    wrapper.find('#checkAll').trigger('click');
    expect(Object.keys(wrapper.vm.selected).length).toBe(wrapper.vm.cartC.length);

    wrapper.find('#check-1').trigger('click');
    expect(Object.keys(wrapper.vm.selected).length).toBe(wrapper.vm.cartC.length - 1);

    wrapper.find('#check-1').trigger('click');
    expect(Object.keys(wrapper.vm.selected).length).toBe(wrapper.vm.cartC.length);

    wrapper.find('#deleteAnyBtn').trigger('click');
    await Vue.nextTick();

    wrapper.find('#deleteAnyConfirmBtn').trigger('click');
  });
  it('Mount Cart Checkout', async () => {
    wrapper.vm.$router = { push() {} };
    await Vue.nextTick();
    expect(wrapper.vm.cartC.length).toBe(2);

    wrapper.find('#checkOutBtn').trigger('click');
  });
});
