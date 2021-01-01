import { RouterLinkStub, shallowMount } from '@vue/test-utils';
import ProductCarousel from '@/components/ProductCarousel.vue';

const carousel = [
  {
    src: 'https://www.static-src.com/siva/asset//05_2020/home-591-m11-live-r.jpg?output-format=webp',
  },
  {
    src: 'https://www.static-src.com/siva/asset//05_2020/lenovo590x197.jpg?output-format=webp',
  },
  {
    src: 'https://www.static-src.com/siva/asset//05_2020/wardah-hompej590x197rev.jpg?output-format=webp',
  }];

describe('Carousel.vue', () => {
  it('Product Carousel Test', () => {
    const wrapper = shallowMount(ProductCarousel,
      {
        propsData: {
          value: carousel,
        },
        stubs: {
          RouterLink: RouterLinkStub,
          agile: true,
        },
      });
    expect(wrapper.vm.items).toBe(carousel);
  });
});
