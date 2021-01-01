// import { RouterLinkStub, mount, createLocalVue } from '@vue/test-utils';
// import AdminProduct from '@/views/AdminProduct.vue';
// import Vuetify from 'vuetify';
// import Vue from 'vue';
// import store from '../../../src/store';

// const localVue = createLocalVue();
// // import Vuetify from 'vuetify';
// describe('AdminProduct.vue', () => {
//   let vuetify;
//   beforeEach(() => {
//     vuetify = new Vuetify();
//   });
//   it('AdminProduct Mount Edit', async () => {
//     // await Vue.nextTick();
//     const wrapper = mount(AdminProduct, {
//       localVue,
//       vuetify,
//       mocks: {
//         $store: store,
//         $mq: 'md',
//       },
//       stubs: {
//         RouterLink: RouterLinkStub,
//       },
//     });
//     URL.createObjectURL = () => {};
//     wrapper.vm.option = { page: 1, itemsPerPage: 10 };
//     wrapper.vm.validate = () => true;
//     wrapper.vm.selectedImage = {};

//     wrapper.vm.paginationChanged(2);
//     expect(wrapper.vm.option.page).toBe(2);
//     wrapper.vm.pageSizeChanged({ target: { value: 20 } });
//     expect(wrapper.vm.option.itemsPerPage).toBe(20);

//     await Vue.nextTick();
//     await Vue.nextTick();

//     // console.log(wrapper.vm.listC[0].id);

//     wrapper.find('#edit-1').trigger('click');
//     await Vue.nextTick();


//     wrapper.vm.save();
//     await Vue.nextTick();
//     expect(wrapper.vm.validate()).toBeTruthy();
//   });
//   it('AdminProduct Mount Delete', async () => {
//     // await Vue.nextTick();
//     const wrapper = mount(AdminProduct, {
//       localVue,
//       vuetify,
//       mocks: {
//         $store: store,
//         $mq: 'md',
//       },
//       stubs: {
//         RouterLink: RouterLinkStub,
//       },
//     });
//     URL.createObjectURL = () => {};
//     wrapper.vm.option = { page: 1, itemsPerPage: 10 };
//     wrapper.vm.validate = () => true;
//     wrapper.vm.selectedImage = {};


//     await Vue.nextTick();
//     await Vue.nextTick();

//     // console.log(wrapper.vm.listC[0].id);

//     wrapper.find('#delete-1').trigger('click');
//     await Vue.nextTick();


//     wrapper.find('#deleteConfirmBtn').trigger('click');
//     await Vue.nextTick();
//   });
//   it('AdminProduct Mount Add', async () => {
//     // await Vue.nextTick();
//     const wrapper = mount(AdminProduct, {
//       localVue,
//       vuetify,
//       mocks: {
//         $store: store,
//         $mq: 'md',
//       },
//       stubs: {
//         RouterLink: RouterLinkStub,
//       },
//     });
//     URL.createObjectURL = () => {};
//     wrapper.vm.option = { page: 1, itemsPerPage: 10 };
//     wrapper.vm.validate = () => true;
//     wrapper.vm.selectedImage = {};

//     await Vue.nextTick();
//     await Vue.nextTick();

//     // console.log(wrapper.vm.listC[0].id);

//     wrapper.find('#addBtn').trigger('click');
//     await Vue.nextTick();
//     wrapper.vm.object.category = { id: 1 };


//     wrapper.vm.save();
//     await Vue.nextTick();
//     expect(wrapper.vm.validate()).toBeTruthy();
//   });
//   it('AdminProduct Mount $mq = xs', async () => {
//     const wrapper = mount(AdminProduct, {
//       localVue,
//       vuetify,
//       mocks: {
//         $store: store,
//         $mq: 'xs',
//       },
//       stubs: {
//         RouterLink: RouterLinkStub,
//       },
//     });
//     await Vue.nextTick();
//     wrapper.find('#card-1').trigger('click');
//   });
// });
