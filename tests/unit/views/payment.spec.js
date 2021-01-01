import { RouterLinkStub, mount, createLocalVue } from '@vue/test-utils';
import Payment from '@/views/Payment.vue';
import Vue from 'vue';
import Vuetify from 'vuetify';
import store from '../../../src/store';
// import Vuetify from 'vuetify';
const localVue = createLocalVue();

describe('Payment.vue', () => {
  let wrapper;
  let vuetify;
  beforeEach(() => {
    vuetify = new Vuetify();
  });
  it('Mount Payment Pay', async () => {
    wrapper = mount(Payment, {
      localVue,
      vuetify,
      mocks: {
        $route: { params: { id: 1 } },
        $store: store,
        $router: { push: jest.fn(() => {}) },
      },
      stubs: {
        RouterLink: RouterLinkStub,
      },
    });
    await Vue.nextTick();

    wrapper.find('#payAction').trigger('click');
    await Vue.nextTick();
    await Vue.nextTick();
    expect(wrapper.vm.$router.push.mock.calls.length).toBe(1);
  });
  it('Mount Done Payment', async () => {
    wrapper = mount(Payment, {
      localVue,
      vuetify,
      mocks: {
        $route: { params: { id: 2 } },
        $store: store,
        $router: { push: jest.fn(() => {}) },
      },
      stubs: {
        RouterLink: RouterLinkStub,
      },
    });
    await Vue.nextTick();
    await Vue.nextTick();
    expect(wrapper.vm.$router.push.mock.calls.length).toBe(1);
  });
});
