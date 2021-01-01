import { RouterLinkStub, mount, createLocalVue } from '@vue/test-utils';
import Register from '@/views/Register.vue';
import Vuetify from 'vuetify';
import Vue from 'vue';
import store from '../../../src/store';
// import Vuetify from 'vuetify';
const localVue = createLocalVue();

describe('Product.vue', () => {
  let vuetify;
  let wrapper;

  beforeEach(() => {
    vuetify = new Vuetify();
    wrapper = mount(Register, {
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
  it('Register Success', async () => {
    wrapper.find('#username').setValue('test123123');
    wrapper.find('#password').setValue('test123123');
    wrapper.find('#rePassword').setValue('test123123');
    wrapper.find('#email').setValue('testexample@mail.com');
    await Vue.nextTick();
    expect(wrapper.vm.valid).toBe(true);
    wrapper.find('#submitBtn').trigger('click');
    expect(wrapper.vm.validate()).toBe(true);
  });
  // it('Register Failed', async () => {
  //   wrapper.find('#username').setValue('test123123');
  //   wrapper.find('#password').setValue('test123123');
  //   wrapper.find('#rePassword').setValue('test123123');
  //   wrapper.find('#email').setValue('testexample@mail.com');
  //   // eslint-disable-next-line prefer-promise-reject-errors
  //   axios.post.mockImplementationOnce(() => Promise.reject({ response: { status: 409 } }));
  //   await Vue.nextTick();
  //   expect(wrapper.vm.valid).toBe(true);
  //   wrapper.find('#submitBtn').trigger('click');
  //   expect(wrapper.vm.validate()).toBe(true);
  // });
  it('Register Not Valid', async () => {
    wrapper.find('#username').setValue('test123123');
    wrapper.find('#password').setValue('test123123');
    wrapper.find('#rePassword').setValue('test123123');
    wrapper.find('#email').setValue('testexample');
    await Vue.nextTick();
    wrapper.find('#submitBtn').trigger('click');
    expect(wrapper.vm.valid).toBe(false);
  });
});
