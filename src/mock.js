const baseApi = 'http://localhost';
const supplier = [{
  id: 1, name: 'PT M', email: 'email@email.com', phone: '09120121',
}];
const categories = [
  { id: 1, name: 'Elektronik' },
];
const marks = [{
  id: 1,
  name: 'An',
  path: '/patterns/pattern-An',
},
{
  id: 2,
  name: 'As',
  path: '/patterns/pattern-As',
}, {
  id: 3,
  name: 'Ae',
  path: '/patterns/pattern-Ae',
}, {
  id: 4,
  name: 'Aw',
  path: '/patterns/pattern-Aw',
},
{
  id: 5,
  name: 'Bn',
  path: '/patterns/pattern-Bn',
},
{
  id: 6,
  name: 'Bs',
  path: '/patterns/pattern-Bs',
}, {
  id: 7,
  name: 'Be',
  path: '/patterns/pattern-Be',
}, {
  id: 8,
  name: 'Bw',
  path: '/patterns/pattern-Bw',
},
{
  id: 9,
  name: 'Cn',
  path: '/patterns/pattern-Cn',
},
{
  id: 10,
  name: 'Cs',
  path: '/patterns/pattern-Cs',
}, {
  id: 11,
  name: 'Ce',
  path: '/patterns/pattern-Ce',
}, {
  id: 12,
  name: 'Cw',
  path: '/patterns/pattern-Cw',
},
{
  id: 13,
  name: 'Dn',
  path: '/patterns/pattern-Dn',
},
{
  name: 'Ds',
  path: '/patterns/pattern-Ds',
}, {
  name: 'De',
  path: '/patterns/pattern-De',
}, {
  name: 'Dw',
  path: '/patterns/pattern-Dw',
},
{
  name: 'En',
  path: '/patterns/pattern-En',
},
{
  name: 'Es',
  path: '/patterns/pattern-Es',
}, {
  name: 'Ee',
  path: '/patterns/pattern-Ee',
}, {
  name: 'Ew',
  path: '/patterns/pattern-Ew',
},
{
  name: 'Fn',
  path: '/patterns/pattern-Fn',
},
{
  name: 'Fs',
  path: '/patterns/pattern-Fs',
}, {
  name: 'Fe',
  path: '/patterns/pattern-Fe',
}, {
  name: 'Fw',
  path: '/patterns/pattern-Fw',
},
{
  name: 'Gn',
  path: '/patterns/pattern-Gn',
},
{
  name: 'Gs',
  path: '/patterns/pattern-Gs',
}, {
  name: 'Ge',
  path: '/patterns/pattern-Ge',
}, {
  name: 'Gw',
  path: '/patterns/pattern-Gw',
},
{
  name: 'Hn',
  path: '/patterns/pattern-Hn',
},
{
  name: 'Hs',
  path: '/patterns/pattern-Hs',
}, {
  name: 'He',
  path: '/patterns/pattern-He',
}, {
  name: 'Hw',
  path: '/patterns/pattern-Hw',
},
{
  name: 'In',
  path: '/patterns/pattern-In',
},
{
  name: 'Is',
  path: '/patterns/pattern-Is',
}, {
  name: 'Ie',
  path: '/patterns/pattern-Ie',
}, {
  name: 'Iw',
  path: '/patterns/pattern-Iw',
},
{
  name: 'Jn',
  path: '/patterns/pattern-Jn',
},
{
  name: 'Js',
  path: '/patterns/pattern-Js',
}, {
  name: 'Je',
  path: '/patterns/pattern-Je',
}, {
  name: 'Jw',
  path: '/patterns/pattern-Jw',
},
{
  name: 'Kn',
  path: '/patterns/pattern-Kn',
},
{
  name: 'Ks',
  path: '/patterns/pattern-Ks',
}, {
  name: 'Ke',
  path: '/patterns/pattern-Ke',
}, {
  name: 'Kw',
  path: '/patterns/pattern-Kw',
},
{
  name: 'Ln',
  path: '/patterns/pattern-Ln',
},
{
  name: 'Ls',
  path: '/patterns/pattern-Ls',
}, {
  name: 'Le',
  path: '/patterns/pattern-Le',
}, {
  name: 'Lw',
  path: '/patterns/pattern-Lw',
},
];
const products = [{
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
  category: 'Elektronik',
  supplier,
},
{
  id: 2,
  name: 'Nama Produk',
  stock: 1,
  price: 50000,
  discount: 10,
  photoUrl: 'https://cdn.pixabay.com/photo/2014/10/26/17/19/fishermen-504098__340.jpg',
  xCoordinate: 8.0123123,
  yCoordinate: 20.1232323,
  updatedDate: '2014-01-01T23:28:56.782Z',
  updatedBy: 'jovianto',
  createdDate: '2014-01-01T23:28:56.782Z',
  createdBy: 'jovianto',
  category: 'Kategori',
  supplier,
}, {
  id: 3,
  name: 'Nama Produk',
  stock: 10,
  price: 30000,
  discount: 0,
  photoUrl: 'https://cdn.pixabay.com/photo/2014/10/26/17/19/fishermen-504098__340.jpg',
  xCoordinate: 0.0123123,
  yCoordinate: 0.1232323,
  updatedDate: '2014-01-01T23:28:56.782Z',
  updatedBy: 'jovianto',
  createdDate: '2014-01-01T23:28:56.782Z',
  createdBy: 'jovianto',
  category: 'Kategori',
  supplier,
},
{
  id: 4,
  name: 'Nama Produk',
  stock: 1,
  price: 50000,
  discount: 10,
  photoUrl: 'https://cdn.pixabay.com/photo/2014/10/26/17/19/fishermen-504098__340.jpg',
  xCoordinate: 8.0123123,
  yCoordinate: 20.1232323,
  updatedDate: '2014-01-01T23:28:56.782Z',
  updatedBy: 'jovianto',
  createdDate: '2014-01-01T23:28:56.782Z',
  createdBy: 'jovianto',
  category: 'kategori',
  supplier,
}];

const supplies = [{
  id: 1, supplierResponse: supplier[0], productResponse: products[0], qty: 2,
}];
const users = [{
  id: 1,
  photoUrl: 'https://cdn.pixabay.com/photo/2014/10/26/17/19/fishermen-504098__340.jpg',
  name: 'Nama',
  email: 'Email@domain.com',
  username: 'Username',
  isAdmin: true,
  updatedDate: '2014-01-01T23:28:56.782Z',
  updatedBy: 'jovianto',
  createdDate: '2014-01-01T23:28:56.782Z',
  createdBy: 'jovianto',
}, {
  id: 2,
  name: 'Nama2',
  photoUrl: 'https://cdn.pixabay.com/photo/2014/10/26/17/19/fishermen-504098__340.jpg',
  isAdmin: false,
  email: 'Email2@domain.com',
  username: 'Username2',
  updatedDate: '2014-01-01T23:28:56.782Z',
  updatedBy: 'jovianto',
  createdDate: '2014-01-01T23:28:56.782Z',
  createdBy: 'jovianto',
  isBlocked: true,
}];
const wishlist = [
  {
    id: 1,
    productResponse: products[0],
    createdDate: '2014-01-01T23:28:56.782Z',
    createdBy: 'jovianto',
  },
  {
    id: 2,
    productResponse: products[1],
    createdDate: '2014-01-01T23:28:56.782Z',
    createdBy: 'jovianto',
  },
];
const review = {
  mean: 4.5,
  reviews: [{
    id: 1,
    user: users[0],
    stars: 5,
    comment: 'Detail Komentar',
    createdDate: '2014-01-01T23:28:56.782Z',
    createdBy: 'jovianto',
  },
  {
    id: 2,
    user: users[1],
    stars: 4,
    comment: 'Detail Komentar',
    createdDate: '2014-01-01T23:28:56.782Z',
    createdBy: 'jovianto',
  }],
};
const detailCarts = [{
  id: 1,
  productResponse: products[0],
  totalItem: 4,
  updatedDate: '2014-01-01T23:28:56.782Z',
  updatedBy: 'jovianto',
  createdDate: '2014-01-01T23:28:56.782Z',
  createdBy: 'jovianto',
}, {
  id: 2,
  productResponse: products[1],
  totalItem: 1,
  updatedDate: '2014-01-01T23:28:56.782Z',
  updatedBy: 'jovianto',
  createdDate: '2014-01-01T23:28:56.782Z',
  createdBy: 'jovianto',
}];

const detailCartsUpdated = [{
  id: 1,
  productResponse: products[0],
  totalItem: 3,
  updatedDate: '2014-01-01T23:28:56.782Z',
  updatedBy: 'jovianto',
  createdDate: '2014-01-01T23:28:56.782Z',
  createdBy: 'jovianto',
}, {
  id: 2,
  productResponse: products[1],
  totalItem: 2,
  updatedDate: '2014-01-01T23:28:56.782Z',
  updatedBy: 'jovianto',
  createdDate: '2014-01-01T23:28:56.782Z',
  createdBy: 'jovianto',
}];
const detailCartsDeleted = [{
  id: 1,
  product: products[0],
  totalItem: 3,
  updatedDate: '2014-01-01T23:28:56.782Z',
  updatedBy: 'jovianto',
  createdDate: '2014-01-01T23:28:56.782Z',
  createdBy: 'jovianto',
}];
// const cart = {
//   details: detailCarts,
//   updatedDate: '2014-01-01T23:28:56.782Z',
//   updatedBy: 'jovianto',
//   createdDate: '2014-01-01T23:28:56.782Z',
//   createdBy: 'jovianto',
// };
// const cartDeleted = {
//   details: detailCartsDeleted,
//   updatedDate: '2014-01-01T23:28:56.782Z',
//   updatedBy: 'jovianto',
//   createdDate: '2014-01-01T23:28:56.782Z',
//   createdBy: 'jovianto',
// };
// const cartUpdated = {
//   details: detailCartsUpdated,
//   updatedDate: '2014-01-01T23:28:56.782Z',
//   updatedBy: 'jovianto',
//   createdDate: '2014-01-01T23:28:56.782Z',
//   createdBy: 'jovianto',
// };

const cart = detailCarts;
const cartDeleted = detailCartsDeleted;
const cartUpdated = detailCartsUpdated;

const detailTransactions = [{
  id: 1,
  productResponse: products[0],
  subTotal: 120000,
  totalItem: 4,
  updatedDate: '2014-01-01T23:28:56.782Z',
  updatedBy: 'jovianto',
  createdDate: '2014-01-01T23:28:56.782Z',
  createdBy: 'jovianto',
}, {
  id: 2,
  productResponse: products[1],
  subTotal: 40000,
  totalItem: 1,
  updatedDate: '2014-01-01T23:28:56.782Z',
  updatedBy: 'jovianto',
  createdDate: '2014-01-01T23:28:56.782Z',
  createdBy: 'jovianto',
}];
const transactions = [
  {
    detailResponses: detailTransactions,
    total: 230000,
    users: users[0],
    updatedDate: '2014-01-01T23:28:56.782Z',
    updatedBy: 'jovianto',
    createdDate: '2014-01-01T23:28:56.782Z',
    createdBy: 'jovianto',
  }, {
    status: 'done',
    detailResponses: detailTransactions,
    total: 10000,
    users: users[1],
    updatedDate: '2014-01-01T23:28:56.782Z',
    updatedBy: 'jovianto',
    createdDate: '2014-01-01T23:28:56.782Z',
    createdBy: 'jovianto',
  },
];
const transactionDone = {
  detailResponses: detailTransactions,
  total: 230000,
  users: users[0],
  status: 'done',
  updatedDate: '2014-01-01T23:28:56.782Z',
  updatedBy: 'jovianto',
  createdDate: '2014-01-01T23:28:56.782Z',
  createdBy: 'jovianto',
};
export default [
  {
    method: 'DELETE',
    status: 200,
    path: `${baseApi}/users/1`,
    data: users[0],
  },
  {
    method: 'GET',
    status: 200,
    path: new RegExp(`${baseApi}/users*`),
    data: users,
  },
  {
    method: 'POST',
    status: 200,
    path: new RegExp(`${baseApi}/auth`),
    data: users[0],
  },
  {
    method: 'POST',
    status: 200,
    path: new RegExp(`${baseApi}/logout`),
    data: users[0],
  },
  {
    method: 'GET',
    status: 200,
    path: new RegExp(`${baseApi}/auth`),
    data: users[0],
  },
  {
    method: 'POST',
    status: 200,
    path: new RegExp(`${baseApi}/register`),
    data: users[0],
  },
  {
    method: 'POST',
    status: 200,
    path: new RegExp(`${baseApi}/login`),
    data: users[0],
  },
  {
    method: 'POST',
    status: 200,
    path: new RegExp(`${baseApi}/product*`),
    data: products[0],
  },
  {
    method: 'GET',
    status: 200,
    path: new RegExp(`${baseApi}/transactions/history/*`),
    data: cart,
  },
  {
    method: 'GET',
    status: 200,
    path: `${baseApi}/product/popular`,
    data: products,
  },
  {
    method: 'GET',
    status: 200,
    path: `${baseApi}/product/promotion`,
    data: products,
  },

  // {
  //   method: 'GET',
  //   status: 200,
  //   path: new RegExp(`${baseApi}/products/*`),
  //   data: products[0],
  // },
  {
    method: 'GET',
    status: 200,
    path: `${baseApi}/products/1`,
    data: products[0],
  },
  {
    method: 'GET',
    status: 200,
    path: `${baseApi}/products/2`,
    data: products[1],
  },
  {
    method: 'GET',
    status: 200,
    path: `${baseApi}/products/3`,
    data: products[2],
  },
  {
    method: 'GET',
    status: 200,
    path: `${baseApi}/products/4`,
    data: products[3],
  },
  {
    method: 'GET',
    status: 200,
    path: new RegExp(`${baseApi}/products`),
    data: products,
  },
  {
    method: 'GET',
    status: 200,
    path: `${baseApi}/categories`,
    data: categories,
  },
  {
    method: 'PUT',
    status: 200,
    path: new RegExp(`${baseApi}/categories*`),
    data: categories[0],
  },
  {
    method: 'POST',
    status: 200,
    path: new RegExp(`${baseApi}/categories*`),
    data: categories[0],
  },
  {
    method: 'DELETE',
    status: 200,
    path: new RegExp(`${baseApi}/categories*`),
    data: categories[0],
  },
  {
    method: 'GET',
    status: 200,
    path: new RegExp(`${baseApi}/supplies*`),
    data: supplies,
  },
  {
    method: 'PUT',
    status: 200,
    path: new RegExp(`${baseApi}/supplies*`),
    data: supplies[0],
  },
  {
    method: 'POST',
    status: 200,
    path: new RegExp(`${baseApi}/supplies*`),
    data: supplies[0],
  },
  {
    method: 'DELETE',
    status: 200,
    path: new RegExp(`${baseApi}/supplies*`),
    data: supplies[0],
  },
  {
    method: 'GET',
    status: 200,
    path: `${baseApi}/product/barcodeUUID`,
    data: products[0],
  },
  {
    method: 'GET',
    status: 200,
    path: `${baseApi}/product/keyword`,
    data: products,
  },
  {
    method: 'PUT',
    status: 200,
    path: new RegExp(`${baseApi}/products`),
    data: products[0],
  },
  {
    method: 'DELETE',
    status: 200,
    path: `${baseApi}/products`,
    data: products[0],
  },
  {
    method: 'GET',
    status: 200,
    path: `${baseApi}/review/1`,
    data: review,
  },
  {
    method: 'GET',
    status: 200,
    path: `${baseApi}/review/2`,
    data: review,
  },
  {
    method: 'GET',
    status: 200,
    path: `${baseApi}/review/3`,
    data: review,
  },
  {
    method: 'GET',
    status: 200,
    path: `${baseApi}/review/4`,
    data: review,
  },
  {
    method: 'POST',
    status: 200,
    path: new RegExp(`${baseApi}/carts*`),
    data: cart,
  },
  {
    method: 'GET',
    status: 200,
    path: new RegExp(`${baseApi}/carts*`),
    data: cart,
  },
  {
    method: 'PUT',
    status: 200,
    path: new RegExp(`${baseApi}/carts*`),
    data: cartUpdated,
  },
  {
    method: 'DELETE',
    status: 200,
    path: new RegExp(`${baseApi}/carts*`),
    data: cartDeleted,
  },
  {
    method: 'POST',
    status: 200,
    path: `${baseApi}/checkout`,
    data: transactions[0],
  },
  {
    method: 'POST',
    status: 200,
    path: `${baseApi}/payment`,
    data: cart, // same field
  },
  {
    method: 'GET',
    status: 200,
    path: new RegExp(`${baseApi}/payment/*`),
    data: cart, // same field
  },
  {
    method: 'GET',
    status: 200,
    path: `${baseApi}/transactions`,
    data: transactions,
  },
  {
    method: 'GET',
    status: 200,
    path: `${baseApi}/transactions/1`,
    data: transactions[0],
  },
  {
    method: 'GET',
    status: 200,
    path: `${baseApi}/transactions/2`,
    data: transactions[1],
  },
  {
    method: 'GET',
    status: 200,
    path: `${baseApi}/transactions/me`,
    data: transactions,
  },
  {
    method: 'POST',
    status: 200,
    path: new RegExp(`${baseApi}/transactions/payment*`),
    data: transactionDone,
  },
  {
    method: 'POST',
    status: 200,
    path: `${baseApi}/payment/token`,
    data: true,
  },
  {
    method: 'POST',
    status: 200,
    path: new RegExp(`${baseApi}/wishlists`),
    data: wishlist,
  },
  {
    method: 'GET',
    status: 200,
    path: new RegExp(`${baseApi}/wishlists*`),
    data: wishlist,
  },
  {
    method: 'GET',
    status: 200,
    path: new RegExp(`${baseApi}/ar/marks*`),
    data: marks,
  },
  {
    method: 'PUT',
    status: 200,
    path: new RegExp(`${baseApi}/ar/marks*`),
    data: marks[0],
  },
  {
    method: 'POST',
    status: 200,
    path: new RegExp(`${baseApi}/ar/marks*`),
    data: marks[0],
  },
  {
    method: 'DELETE',
    status: 200,
    path: new RegExp(`${baseApi}/ar/marks*`),
    data: marks[0],
  },
  {
    method: 'DELETE',
    status: 200,
    path: new RegExp(`${baseApi}/wishlist*`),
    data: wishlist,
  },

  {
    method: 'POST',
    status: 200,
    path: new RegExp(`${baseApi}/ar/*`),
    data: { id: '804c9bdc-bf9b-11ea-b3de-0242ac130004', next: 'As' },
  },
  {
    method: 'PUT',
    status: 200,
    path: `${baseApi}/ar/804c9bdc-bf9b-11ea-b3de-0242ac130004?mark=As`,
    data: { rotation: -90, next: 'Be' },
  },
  {
    method: 'PUT',
    status: 200,
    path: `${baseApi}/ar/804c9bdc-bf9b-11ea-b3de-0242ac130004?mark=Be`,
    data: { rotation: -90, next: 'Ce' },
  },
  {
    method: 'PUT',
    status: 200,
    path: `${baseApi}/ar/804c9bdc-bf9b-11ea-b3de-0242ac130004?mark=Ce`,
    data: { rotation: -90, next: 'De' },
  },
  {
    method: 'PUT',
    status: 200,
    path: `${baseApi}/ar/804c9bdc-bf9b-11ea-b3de-0242ac130004?mark=De`,
    data: { rotation: 180, next: 'Hs' },
  },
  {
    method: 'PUT',
    status: 200,
    path: `${baseApi}/ar/804c9bdc-bf9b-11ea-b3de-0242ac130004?mark=Hs`,
    data: { rotation: 180, next: null },
  },
];
