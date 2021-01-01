import { RouterLinkStub, mount, createLocalVue } from '@vue/test-utils';
import SearchCategory from '@/views/SearchCategory.vue';
import Vuetify from 'vuetify';
import store from '../../../src/store';
// import Vuetify from 'vuetify';
const localVue = createLocalVue();

describe('SearchCategory.vue', () => {
  let vuetify;
  let wrapper;


  beforeEach(() => {
    vuetify = new Vuetify();
    wrapper = mount(SearchCategory, {
      localVue,
      vuetify,
      mocks: {
        $store: store,
        $route: { params: { keyword: '1' } },
        $router: { push: jest.fn(() => {}) },
      },
      stubs: {
        RouterLink: RouterLinkStub,
      },
    });
  });
  it('Register Not Valid', async () => {
    expect(wrapper.vm.$route.params.keyword).toBe('1');
  });
});
