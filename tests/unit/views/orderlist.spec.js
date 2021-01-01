import { RouterLinkStub, mount, createLocalVue } from '@vue/test-utils';
import OrderList from '@/views/OrderList.vue';
import Vuetify from 'vuetify';
import Vue from 'vue';
import store from '../../../src/store';
// import Vuetify from 'vuetify';
const localVue = createLocalVue();

describe('OrderList.vue', () => {
  let vuetify; let
    wrapper;

  beforeEach(() => {
    vuetify = new Vuetify();
    wrapper = mount(OrderList, {
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
  it('Simulate Add To Cart', () => wrapper.vm.getOrderList().then(async (res) => {
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
  it('Simulate Add To Cart Not Valid', () => wrapper.vm.getOrderList().then(async (res) => {
    const button = wrapper.find(`#addToCart-${res.data.data[0].id}`);
    button.trigger('click');
    await Vue.nextTick();

    wrapper.vm.nItem = '';

    await Vue.nextTick();

    wrapper.find('#save').trigger('click');

    expect(wrapper.vm.validate()).toBe(false);
  }));
});
