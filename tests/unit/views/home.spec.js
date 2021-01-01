import { RouterLinkStub, shallowMount } from '@vue/test-utils';
import Home from '@/views/Home.vue';
import Vue from 'vue';
import store from '../../../src/store';
// import Vuetify from 'vuetify';

describe('Home.vue', () => {
  beforeEach(() => {
    shallowMount(Home, {
      mocks: {
        $store: store,
      },
      stubs: {
        RouterLink: RouterLinkStub,
      },
    });
  });
  it('Home Success', async () => {
    await Vue.nextTick();
  });
});
