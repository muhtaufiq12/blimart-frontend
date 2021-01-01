import { RouterLinkStub, mount, createLocalVue } from '@vue/test-utils';
import Login from '@/views/Login.vue';
import Vuetify from 'vuetify';
import Vue from 'vue';
import store from '../../../src/store';
// import Vuetify from 'vuetify';
const localVue = createLocalVue();

describe('Login.vue', () => {
  let vuetify;
  let wrapper;

  beforeEach(() => {
    vuetify = new Vuetify();
    wrapper = mount(Login, {
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
  it('Login Success', async () => {
    wrapper.vm.login = jest.fn(() => new Promise((resolve) => {
      resolve({ data: { code: 200 } });
    }));
    wrapper.find('#username').setValue('test123123');
    wrapper.find('#password').setValue('test123123');
    await Vue.nextTick();
    expect(wrapper.vm.valid).toBe(true);
    wrapper.find('#submitBtn').trigger('click');
    expect(wrapper.vm.validate()).toBe(true);

    expect(wrapper.vm.login.mock.calls.length).toBe(1);
  });
  it('Login Failed Unauthorized', async () => {
    wrapper.vm.login = jest.fn(() => new Promise((resolve) => {
      resolve({ data: { code: 201 } });
    }));
    wrapper.find('#username').setValue('test123123');
    wrapper.find('#password').setValue('test123123');
    await Vue.nextTick();
    expect(wrapper.vm.valid).toBe(true);
    wrapper.find('#submitBtn').trigger('click');
    expect(wrapper.vm.validate()).toBe(true);
    expect(wrapper.vm.login.mock.calls.length).toBe(1);
  });
  it('Login Failed Unknown Error', async () => {
    wrapper.vm.login = jest.fn(() => new Promise((resolve, reject) => {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject({ response: {} });
    }));
    wrapper.find('#username').setValue('test123123');
    wrapper.find('#password').setValue('test123123');
    await Vue.nextTick();
    expect(wrapper.vm.valid).toBe(true);
    wrapper.find('#submitBtn').trigger('click');
    expect(wrapper.vm.validate()).toBe(true);
    expect(wrapper.vm.login.mock.calls.length).toBe(1);
  });
  it('Login Not Valid', async () => {
    await Vue.nextTick();
    wrapper.find('#submitBtn').trigger('click');
    expect(wrapper.vm.valid).toBe(false);
  });
});
