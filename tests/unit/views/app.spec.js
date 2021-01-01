import { RouterLinkStub, shallowMount, createLocalVue } from '@vue/test-utils';
import App from '@/App.vue';
import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../../../src/store';
// import Vuetify from 'vuetify';
const localVue = createLocalVue();
localVue.use(VueRouter);

describe('App.vue', () => {
  beforeEach(() => {
    shallowMount(App, {
      localVue,
      mocks: {
        $store: store,
      },
      stubs: {
        RouterLink: RouterLinkStub,
      },
    });
  });
  it('Mount App', async () => {
    await Vue.nextTick();
  });
});
