import { RouterLinkStub, shallowMount } from '@vue/test-utils';
import Category from '@/views/Category.vue';
import store from '../../../src/store';
// import Vuetify from 'vuetify';

describe('Category.vue', () => {
  beforeEach(() => {
    shallowMount(Category, {
      mocks: {
        $store: store,
      },
      stubs: {
        RouterLink: RouterLinkStub,
      },
    });
  });
  it('Category Mount', async () => {
    // await Vue.nextTick();
  });
});
