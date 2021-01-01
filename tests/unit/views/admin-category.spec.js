import { RouterLinkStub, mount, createLocalVue } from '@vue/test-utils';
import AdminCategory from '@/views/AdminCategory.vue';
import Vuetify from 'vuetify';
import Vue from 'vue';
import store from '../../../src/store';

// import Vuetify from 'vuetify';
describe('AdminCategory.vue', () => {
  let vuetify;
  let localVue;
  beforeEach(() => {
    vuetify = new Vuetify();
    localVue = createLocalVue();
  });
  it('AdminCategory Mount Edit', async () => {
    // await Vue.nextTick();
    const wrapper = mount(AdminCategory, {
      localVue,
      vuetify,
      mocks: {
        $store: store,
      },
      stubs: {
        RouterLink: RouterLinkStub,
      },
    });
    URL.createObjectURL = () => {};
    wrapper.vm.option = { page: 1, itemsPerPage: 10 };
    wrapper.vm.validate = () => true;
    wrapper.vm.selectedImage = {};

    await Vue.nextTick();
    await Vue.nextTick();


    wrapper.find('#edit-1').trigger('click');
    await Vue.nextTick();


    wrapper.vm.save();
    await Vue.nextTick();
    expect(wrapper.vm.validate()).toBeTruthy();
  });
  it('AdminCategory Mount Add', async () => {
    // await Vue.nextTick();
    const wrapper = mount(AdminCategory, {
      localVue,
      vuetify,
      mocks: {
        $store: store,
      },
      stubs: {
        RouterLink: RouterLinkStub,
      },
    });
    URL.createObjectURL = () => {};
    wrapper.vm.option = { page: 1, itemsPerPage: 10 };
    wrapper.vm.validate = () => true;
    wrapper.vm.selectedImage = {};

    await Vue.nextTick();
    await Vue.nextTick();


    wrapper.find('#addBtn').trigger('click');
    await Vue.nextTick();
    wrapper.vm.object.category = { id: 1 };


    wrapper.vm.save();
    await Vue.nextTick();
    expect(wrapper.vm.validate()).toBeTruthy();
  });
  it('AdminCategory Mount Add Failed', async () => {
    // await Vue.nextTick();

    const wrapper = mount(AdminCategory, {
      localVue,
      vuetify,
      mocks: {
        $store: store,
      },
      stubs: {
        RouterLink: RouterLinkStub,
      },
    });
    URL.createObjectURL = () => {};
    wrapper.vm.option = { page: 1, itemsPerPage: 10 };
    wrapper.vm.validate = () => true;
    wrapper.vm.selectedImage = {};
    wrapper.vm.addCategory = jest.fn(() => new Promise((resolve, reject) => {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject({ response: { data: { code: 400 } } });
    }));

    wrapper.find('#addBtn').trigger('click');
    await Vue.nextTick();
    wrapper.vm.object.category = { id: 1 };


    wrapper.vm.save();
    await Vue.nextTick();
    expect(wrapper.vm.validate()).toBeTruthy();
    expect(wrapper.vm.addCategory.mock.calls.length).toBe(1);
  });
  it('AdminCategory Mount Edit Failed', async () => {
    // await Vue.nextTick();

    const wrapper = mount(AdminCategory, {
      localVue,
      vuetify,
      mocks: {
        $store: store,
      },
      stubs: {
        RouterLink: RouterLinkStub,
      },
    });
    URL.createObjectURL = () => {};
    wrapper.vm.option = { page: 1, itemsPerPage: 10 };
    wrapper.vm.validate = () => true;
    wrapper.vm.selectedImage = {};
    wrapper.vm.editCategory = jest.fn(() => new Promise((resolve, reject) => {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject({ response: { data: { code: 400 } } });
    }));

    await Vue.nextTick();
    await Vue.nextTick();


    wrapper.find('#edit-1').trigger('click');
    await Vue.nextTick();
    wrapper.vm.object.category = { id: 1 };


    wrapper.vm.save();
    await Vue.nextTick();
    expect(wrapper.vm.validate()).toBeTruthy();
    expect(wrapper.vm.editCategory.mock.calls.length).toBe(1);
  });
  it('AdminCategory Mount $mq = xs', async () => {
    const wrapper = mount(AdminCategory, {
      localVue,
      vuetify,
      mocks: {
        $store: store,
        $mq: 'xs',
      },
      stubs: {
        RouterLink: RouterLinkStub,
      },
    });
    wrapper.find('#card-1').trigger('click');
    await Vue.nextTick();
  });
});
