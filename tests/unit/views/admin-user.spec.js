import { RouterLinkStub, mount, createLocalVue } from '@vue/test-utils';
import AdminUser from '@/views/AdminUser.vue';
import Vuetify from 'vuetify';
import Vue from 'vue';
import store from '../../../src/store';

const localVue = createLocalVue();
// import Vuetify from 'vuetify';
describe('AdminUser.vue', () => {
  let vuetify;
  beforeEach(() => {
    vuetify = new Vuetify();
  });
  it('AdminUser Mount Delete Failed', async () => {
    // await Vue.nextTick();
    const wrapper = mount(AdminUser, {
      localVue,
      vuetify,
      mocks: {
        $store: store,
        $mq: 'md',
      },
      stubs: {
        RouterLink: RouterLinkStub,
      },
    });
    wrapper.vm.deleteUser = jest.fn(() => new Promise((resolve, reject) => {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject({ response: { data: { code: 400 } } });
    }));

    URL.createObjectURL = () => {};
    wrapper.vm.option = { page: 1, itemsPerPage: 10 };
    wrapper.vm.validate = () => true;
    wrapper.vm.selectedImage = {};

    wrapper.vm.paginationChanged(2);
    expect(wrapper.vm.option.page).toBe(2);
    wrapper.vm.pageSizeChanged({ target: { value: 20 } });
    expect(wrapper.vm.option.itemsPerPage).toBe(20);


    await Vue.nextTick();
    await Vue.nextTick();

    // console.log(wrapper.vm.listC[0].id);

    wrapper.find('#delete-1').trigger('click');
    await Vue.nextTick();


    wrapper.find('#deleteConfirmBtn').trigger('click');
    await Vue.nextTick();

    expect(wrapper.vm.deleteUser.mock.calls.length).toBe(1);
  });
  it('AdminUser Mount UnDelete Success', async () => {
    // await Vue.nextTick();
    const wrapper = mount(AdminUser, {
      localVue,
      vuetify,
      mocks: {
        $store: store,
        $mq: 'md',
      },
      stubs: {
        RouterLink: RouterLinkStub,
      },
    });
    URL.createObjectURL = () => {};
    wrapper.vm.option = { page: 1, itemsPerPage: 10 };
    wrapper.vm.validate = () => true;
    wrapper.vm.selectedImage = {};

    wrapper.vm.unblockUser = jest.fn(() => new Promise((resolve) => {
      resolve();
    }));


    await Vue.nextTick();
    await Vue.nextTick();

    // console.log(wrapper.vm.listC[0].id);

    wrapper.find('#unblock-2').trigger('click');
    await Vue.nextTick();


    wrapper.find('#unblockConfirmBtn').trigger('click');
    await Vue.nextTick();
    expect(wrapper.vm.unblockUser.mock.calls.length).toBe(1);
  });
  it('AdminUser Mount UnDelete Failed', async () => {
    // await Vue.nextTick();
    const wrapper = mount(AdminUser, {
      localVue,
      vuetify,
      mocks: {
        $store: store,
        $mq: 'md',
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

    // console.log(wrapper.vm.listC[0].id);

    wrapper.find('#unblock-2').trigger('click');
    await Vue.nextTick();


    wrapper.find('#unblockConfirmBtn').trigger('click');
    await Vue.nextTick();
  });
  it('AdminUser Mount Delete', async () => {
    // await Vue.nextTick();
    const wrapper = mount(AdminUser, {
      localVue,
      vuetify,
      mocks: {
        $store: store,
        $mq: 'md',
      },
      stubs: {
        RouterLink: RouterLinkStub,
      },
    });
    URL.createObjectURL = () => {};
    wrapper.vm.option = { page: 1, itemsPerPage: 10 };
    wrapper.vm.validate = () => true;
    wrapper.vm.selectedImage = {};

    wrapper.vm.paginationChanged(2);
    expect(wrapper.vm.option.page).toBe(2);
    wrapper.vm.pageSizeChanged({ target: { value: 20 } });
    expect(wrapper.vm.option.itemsPerPage).toBe(20);


    await Vue.nextTick();
    await Vue.nextTick();

    // console.log(wrapper.vm.listC[0].id);

    wrapper.find('#delete-1').trigger('click');
    await Vue.nextTick();


    wrapper.find('#deleteConfirmBtn').trigger('click');
    await Vue.nextTick();
  });
  it('AdminUser Mount $mq = xs', async () => {
    const wrapper = mount(AdminUser, {
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
    await Vue.nextTick();
    wrapper.find('#card-2').trigger('click');
  });
});
