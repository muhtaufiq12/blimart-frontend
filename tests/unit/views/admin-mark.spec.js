import { RouterLinkStub, mount, createLocalVue } from '@vue/test-utils';
import AdminMark from '@/views/AdminMark.vue';
import Vuetify from 'vuetify';
import Vue from 'vue';
import store from '../../../src/store';

const localVue = createLocalVue();
// import Vuetify from 'vuetify';
describe('AdminMark.vue', () => {
  let vuetify;
  beforeEach(() => {
    vuetify = new Vuetify();
  });
  it('AdminMark Mount Edit', async () => {
    // await Vue.nextTick();
    const wrapper = mount(AdminMark, {
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

    expect(wrapper.vm.listC.length).toBeGreaterThan(0);

    wrapper.find('#edit-1').trigger('click');
    await Vue.nextTick();


    wrapper.vm.save();
    await Vue.nextTick();
    expect(wrapper.vm.validate()).toBeTruthy();
  });
  it('AdminMark Mount Edit Failed', async () => {
    // await Vue.nextTick();
    const wrapper = mount(AdminMark, {
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
    wrapper.vm.editMark = jest.fn(() => new Promise((resolve, reject) => {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject({ response: { data: { code: 400 } } });
    }));

    await Vue.nextTick();
    await Vue.nextTick();

    expect(wrapper.vm.listC.length).toBeGreaterThan(0);

    wrapper.find('#edit-1').trigger('click');
    await Vue.nextTick();


    wrapper.vm.save();
    await Vue.nextTick();
    expect(wrapper.vm.validate()).toBeTruthy();
    expect(wrapper.vm.editMark.mock.calls.length).toBe(1);
  });
  it('AdminMark Mount Delete', async () => {
    // await Vue.nextTick();
    const wrapper = mount(AdminMark, {
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
  it('AdminMark Mount Delete Failed', async () => {
    // await Vue.nextTick();
    const wrapper = mount(AdminMark, {
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
    wrapper.vm.deleteMark = jest.fn(() => new Promise((resolve, reject) => {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject({ response: { data: { code: 400 } } });
    }));


    await Vue.nextTick();
    await Vue.nextTick();

    // console.log(wrapper.vm.listC[0].id);

    wrapper.find('#delete-1').trigger('click');
    await Vue.nextTick();


    wrapper.find('#deleteConfirmBtn').trigger('click');
    await Vue.nextTick();
    expect(wrapper.vm.deleteMark.mock.calls.length).toBe(1);
  });
  it('AdminMark Mount Add', async () => {
    // await Vue.nextTick();
    const wrapper = mount(AdminMark, {
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
  it('AdminMark Mount Add Failed', async () => {
    // await Vue.nextTick();
    const wrapper = mount(AdminMark, {
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
    wrapper.vm.addMark = jest.fn(() => new Promise((resolve, reject) => {
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
    expect(wrapper.vm.addMark.mock.calls.length).toBe(1);
  });
  it('AdminMark Mount $mq = xs', async () => {
    const wrapper = mount(AdminMark, {
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
    wrapper.find('#card-1').trigger('click');
  });
});
