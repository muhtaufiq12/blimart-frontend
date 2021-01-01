import { RouterLinkStub, mount, createLocalVue } from '@vue/test-utils';
import AdminSupplier from '@/views/AdminSupplier.vue';
import Vuetify from 'vuetify';
import Vue from 'vue';
import store from '../../../src/store';

const localVue = createLocalVue();
// import Vuetify from 'vuetify';
describe('AdminSupplier.vue', () => {
  let vuetify;
  beforeEach(() => {
    vuetify = new Vuetify();
  });
  it('AdminSupplier Mount Edit', async () => {
    // await Vue.nextTick();
    const wrapper = mount(AdminSupplier, {
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

    wrapper.find('#edit-1').trigger('click');
    await Vue.nextTick();


    wrapper.vm.save();
    await Vue.nextTick();
    expect(wrapper.vm.validate()).toBeTruthy();
  });
  it('AdminSupplier Mount Edit Failed', async () => {
    // await Vue.nextTick();
    const wrapper = mount(AdminSupplier, {
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
    wrapper.vm.editSupplier = jest.fn(() => new Promise((resolve, reject) => {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject({ response: { data: { code: 400 } } });
    }));
    URL.createObjectURL = () => {};
    wrapper.vm.option = { page: 1, itemsPerPage: 10 };
    wrapper.vm.validate = () => true;
    wrapper.vm.selectedImage = {};

    await Vue.nextTick();
    await Vue.nextTick();

    // console.log(wrapper.vm.listC[0].id);

    wrapper.find('#edit-1').trigger('click');
    await Vue.nextTick();


    wrapper.vm.save();
    await Vue.nextTick();
    expect(wrapper.vm.validate()).toBeTruthy();
    expect(wrapper.vm.editSupplier.mock.calls.length).toBe(1);
  });
  it('AdminSupplier Mount Delete', async () => {
    // await Vue.nextTick();
    const wrapper = mount(AdminSupplier, {
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

    wrapper.find('#delete-1').trigger('click');
    await Vue.nextTick();


    wrapper.find('#deleteConfirmBtn').trigger('click');
    await Vue.nextTick();
  });
  it('AdminSupplier Mount Delete Failed', async () => {
    // await Vue.nextTick();
    const wrapper = mount(AdminSupplier, {
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
    wrapper.vm.deleteSupplier = jest.fn(() => new Promise((resolve, reject) => {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject({ response: {} });
    }));
    URL.createObjectURL = () => {};
    wrapper.vm.option = { page: 1, itemsPerPage: 10 };
    wrapper.vm.validate = () => true;
    wrapper.vm.selectedImage = {};


    await Vue.nextTick();
    await Vue.nextTick();

    // console.log(wrapper.vm.listC[0].id);

    wrapper.find('#delete-1').trigger('click');
    await Vue.nextTick();


    wrapper.find('#deleteConfirmBtn').trigger('click');
    await Vue.nextTick();

    expect(wrapper.vm.deleteSupplier.mock.calls.length).toBe(1);
  });
  it('AdminSupplier Mount Add', async () => {
    // await Vue.nextTick();
    const wrapper = mount(AdminSupplier, {
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

    wrapper.find('#addBtn').trigger('click');
    await Vue.nextTick();
    wrapper.vm.object.category = { id: 1 };


    wrapper.vm.save();
    await Vue.nextTick();
    expect(wrapper.vm.validate()).toBeTruthy();
  });
  it('AdminSupplier Mount Add Failed', async () => {
    // await Vue.nextTick();
    const wrapper = mount(AdminSupplier, {
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
    wrapper.vm.addSupplier = jest.fn(() => new Promise((resolve, reject) => {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject({ response: { data: { code: 400 } } });
    }));

    await Vue.nextTick();
    await Vue.nextTick();

    // console.log(wrapper.vm.listC[0].id);

    wrapper.find('#addBtn').trigger('click');
    await Vue.nextTick();
    wrapper.vm.object.category = { id: 1 };


    wrapper.vm.save();
    await Vue.nextTick();
    expect(wrapper.vm.validate()).toBeTruthy();
    expect(wrapper.vm.addSupplier.mock.calls.length).toBe(1);
  });
  it('AdminSupplier Mount $mq = xs', async () => {
    const wrapper = mount(AdminSupplier, {
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
