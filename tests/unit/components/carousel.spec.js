import { RouterLinkStub, shallowMount } from '@vue/test-utils';
import Carousel from '@/components/Carousel.vue';


describe('Carousel.vue', () => {
  it('Carousel Test $MQ = XS', () => {
    const wrapper = shallowMount(Carousel,
      {
        mocks: {
          $mq: 'xs',
        },
        stubs: {
          RouterLink: RouterLinkStub,
        },
      });
    expect(wrapper.vm.height).toBe(100);
    expect(wrapper.vm.width).toBe(300);
    expect(wrapper.vm.display).toBe(3);
  });
  it('Carousel Test $MQ != XS', () => {
    const wrapper = shallowMount(Carousel,
      {
        mocks: {
          $mq: 'md',
        },
        stubs: {
          RouterLink: RouterLinkStub,
        },
      });
    expect(wrapper.vm.height).toBe(186);
    expect(wrapper.vm.width).toBe(590);
    expect(wrapper.vm.display).toBe(5);
  });
});
