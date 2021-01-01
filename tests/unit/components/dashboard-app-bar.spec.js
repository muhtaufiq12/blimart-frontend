import { RouterLinkStub, mount, createLocalVue } from '@vue/test-utils';
import DashboardAppBar from '@/layouts/DashboardAppBar.vue';
import Vue from 'vue';
import Vuetify from 'vuetify';
import store from '../../../src/store';


describe('DashboardAppBar.vue', () => {
  // eslint-disable-next-line no-unused-vars
  let vuetify;
  const localVue = createLocalVue();

  beforeEach(() => {
    vuetify = new Vuetify();
  });
  it('DashboardAppBar Data Test', async () => {
    const wrapper = mount(DashboardAppBar,
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

    wrapper.find('#logoutBtn').trigger('click');
    Vue.nextTick(() => {
      wrapper.find('#logoutConfirmBtn').trigger('click');
    });
  });
});
