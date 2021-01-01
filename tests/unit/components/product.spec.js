import { RouterLinkStub, shallowMount } from '@vue/test-utils';
import Product from '@/components/Product.vue';
// import Vuetify from 'vuetify';


const product = {
  id: 1,
  name: 'Nama Produk Nama ProdukNama Produk PO32',
  stock: 10,
  price: 30000,
  discount: 10,
  photoUrl: 'https://cdn.pixabay.com/photo/2014/10/26/17/19/fishermen-504098__340.jpg',
  xCoordinate: 0.0123123,
  yCoordinate: 0.1232323,
  updatedDate: '2014-01-01T23:28:56.782Z',
  updatedBy: 'jovianto',
  createdDate: '2014-01-01T23:28:56.782Z',
  createdBy: 'jovianto',
  category: 'Minuman',
};

describe('Product.vue', () => {
  // eslint-disable-next-line no-unused-vars
  let vuetify;

  beforeEach(() => {
  });
  it('Product Data Test', () => {
    const wrapper = shallowMount(Product,
      {
        propsData: { item: product },
        stubs: {
          RouterLink: RouterLinkStub,
        },
      });
    expect(wrapper.find('#name').text()).toMatch(product.name);
    expect(wrapper.find('#percentDiscount').text()).toMatch(`${product.discount}% OFF`);
    expect(wrapper.find('#price').text()).toMatch('30,000.00');
    expect(wrapper.find('#discounted').text()).toMatch('27,000.00');
  });
});
