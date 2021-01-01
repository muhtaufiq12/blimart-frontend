import { RouterLinkStub, mount, createLocalVue } from '@vue/test-utils';
import Profile from '@/views/Profile.vue';
import Vuetify from 'vuetify';
import store from '../../../src/store';
// import Vuetify from 'vuetify';
const localVue = createLocalVue();

describe('Profile.vue', () => {
  let vuetify;
  let wrapper;
  window.URL.createObjectURL = jest.fn();

  afterEach(() => {
    // spy.mockClear();
  });


  beforeEach(() => {
    vuetify = new Vuetify();
    wrapper = mount(Profile, {
      localVue,
      vuetify,
      mocks: {
        $store: store,
        $router: { push: jest.fn(() => {}) },
      },
      stubs: {
        RouterLink: RouterLinkStub,
      },
    });
  });
  it('Profile Logout', async () => {
    wrapper.find('#logoutBtn').trigger('click');
    const spyLogout = jest.spyOn(wrapper.vm, 'logoutAction');

    wrapper.vm.$nextTick(() => {
      wrapper.find('#logoutConfirmBtn').trigger('click');
      wrapper.vm.$nextTick(() => {
        expect(spyLogout).toBeCalled();
      });
    });
  });
  it('Edit Profile', () => {
    wrapper.vm.valid = true;
    wrapper.vm.editDialog = true;
    wrapper.vm.editUser = () => new Promise((resolve, reject) => {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject({ response: { data: { code: 400 } } });
    });
    wrapper.vm.$nextTick(() => {
      wrapper.vm.name = 'Jo';
      wrapper.vm.phone = '093029320232';
      wrapper.vm.birthDate = '24-06-1999';
      wrapper.vm.gender = true;
      wrapper.vm.object.photoUrl = '...';
      wrapper.vm.save();
      wrapper.vm.$nextTick(() => {

      });
    });
  });
  it('Edit Profile Success', () => {
    wrapper.vm.valid = true;
    wrapper.vm.editDialog = true;
    wrapper.vm.editUser = () => new Promise((resolve) => {
      resolve();
    });
    wrapper.vm.$nextTick(() => {
      wrapper.vm.name = 'Jo';
      wrapper.vm.phone = '093029320232';
      wrapper.vm.birthDate = '24-06-1999';
      wrapper.vm.gender = true;
      wrapper.vm.object.photoUrl = '...';
      wrapper.vm.save();
      wrapper.vm.$nextTick(() => {

      });
    });
  });
  it('Edit Profile Success Change picture', () => {
    wrapper.vm.valid = true;
    wrapper.vm.editDialog = true;
    wrapper.vm.selectedImage = { name: 'name.png' };
    wrapper.vm.editUser = () => new Promise((resolve) => {
      resolve();
    });
    wrapper.vm.uploadPicture = () => new Promise((resolve) => {
      resolve({ data: { code: 200 } });
    });
    wrapper.vm.$nextTick(() => {
      wrapper.vm.name = 'Jo';
      wrapper.vm.phone = '093029320232';
      wrapper.vm.birthDate = '24-06-1999';
      wrapper.vm.gender = true;
      wrapper.vm.object.photoUrl = '...';
      wrapper.vm.save();
      wrapper.vm.$nextTick(() => {

      });
    });
  });
  it('Edit Profile Success Change picture failed', () => {
    wrapper.vm.valid = true;
    wrapper.vm.editDialog = true;
    wrapper.vm.selectedImage = { name: 'name.png' };
    wrapper.vm.editUser = () => new Promise((resolve) => {
      resolve();
    });
    wrapper.vm.uploadPicture = () => new Promise((resolve, reject) => {
      reject();
    });
    wrapper.vm.$nextTick(() => {
      wrapper.vm.name = 'Jo';
      wrapper.vm.phone = '093029320232';
      wrapper.vm.birthDate = '24-06-1999';
      wrapper.vm.gender = true;
      wrapper.vm.object.photoUrl = '...';
      wrapper.vm.save();
      wrapper.vm.$nextTick(() => {

      });
    });
  });
});
