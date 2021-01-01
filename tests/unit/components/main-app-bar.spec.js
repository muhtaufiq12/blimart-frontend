import { RouterLinkStub, mount, createLocalVue } from '@vue/test-utils';
import MainAppBar from '@/layouts/MainAppBar.vue';
import Vue from 'vue';
import Vuetify from 'vuetify';
import store from '../../../src/store';


describe('MainAppBar.vue', () => {
  // eslint-disable-next-line no-unused-vars
  let vuetify;
  const localVue = createLocalVue();

  beforeEach(() => {
    vuetify = new Vuetify();
  });
  it('MainAppBar Data Test', async () => {
    const wrapper = mount(MainAppBar,
      {
        localVue,
        vuetify,
        mocks: {
          $store: store,
          $router: { push: jest.fn(() => {}) },
        },
        stubs: {
          RouterLink: RouterLinkStub,
        },
      });

    wrapper.vm.logoutDialog = true;
    await Vue.nextTick();

    wrapper.find('#logoutConfirmBtn').trigger('click');
    await Vue.nextTick();
    await Vue.nextTick();
    await Vue.nextTick();
    expect(wrapper.vm.$router.push.mock.calls.length).toBe(1);
  });
});
