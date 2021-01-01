import { RouterLinkStub, mount, createLocalVue } from '@vue/test-utils';
import Search from '@/views/Search.vue';
import Vuetify from 'vuetify';
import store from '../../../src/store';
// import Vuetify from 'vuetify';
const localVue = createLocalVue();

describe('Search.vue', () => {
  let vuetify;
  let wrapper;

  afterEach(() => {
    // spy.mockClear();
  });


  beforeEach(() => {
    vuetify = new Vuetify();
    wrapper = mount(Search, {
      localVue,
      vuetify,
      mocks: {
        $store: store,
        $route: { params: { keyword: 'p' } },
        $router: { push: jest.fn(() => {}) },
      },
      stubs: {
        RouterLink: RouterLinkStub,
      },
    });
  });
  it('Register Not Valid', async () => {
    expect(wrapper.vm.$route.params.keyword).toBe('p');
  });
});
