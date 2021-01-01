import { RouterLinkStub, mount, createLocalVue } from '@vue/test-utils';
import AdminProcurement from '@/views/AdminProcurement.vue';
import Vuetify from 'vuetify';
import Vue from 'vue';
import store from '../../../src/store';

// import Vuetify from 'vuetify';
describe('AdminProcurement.vue', () => {
  let vuetify;
  let localVue;
  beforeEach(() => {
    vuetify = new Vuetify();
    localVue = createLocalVue();
  });
  it('AdminProcurement Mount Add', async () => {
    // await Vue.nextTick();
    const wrapper = mount(AdminProcurement, {
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

    wrapper.vm.paginationChanged(2);
    expect(wrapper.vm.option.page).toBe(2);
    wrapper.vm.pageSizeChanged({ target: { value: 20 } });
    expect(wrapper.vm.option.itemsPerPage).toBe(20);

    await Vue.nextTick();
    await Vue.nextTick();


    wrapper.find('#addBtn').trigger('click');
    await Vue.nextTick();
    wrapper.vm.object.category = { id: 1 };


    wrapper.vm.save();
    await Vue.nextTick();
    expect(wrapper.vm.validate()).toBeTruthy();
  });
  it('AdminProcurement Mount $mq = xs', async () => {
    const wrapper = mount(AdminProcurement, {
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
