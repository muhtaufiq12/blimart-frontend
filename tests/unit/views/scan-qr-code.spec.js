import {
  RouterLinkStub, createLocalVue, shallowMount,
} from '@vue/test-utils';
import SearchQRCode from '@/views/SearchQRCode.vue';
import Vuetify from 'vuetify';
import store from '../../../src/store';
// import Vuetify from 'vuetify';
const localVue = createLocalVue();

describe('SearchQRCode.vue', () => {
  let vuetify; let
    wrapper;

  beforeEach(() => {
    vuetify = new Vuetify();
    wrapper = shallowMount(SearchQRCode, {
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
  it('Simulate Add To Cart', () => {
    wrapper.vm.onDecode('testing');
  });

  // it('Simulate Add To Cart Not Valid', async (res) => {
  // });
});
