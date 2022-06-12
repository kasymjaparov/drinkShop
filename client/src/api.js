const root = "http://localhost:5000"
const api = {
  auth: {
    login: `${root}/api/auth/login`,
    registration: `${root}/api/auth/reg`,
    getRole: `${root}/api/auth/getRole`,
  },
  admin: {
    types: {
      getAll: `${root}/api/type/getAll`,
      add: `${root}/api/type/add`,
      edit: `${root}/api/type/edit`,
      delete: `${root}/api/type/delete`,
    },
    brands: {
      getAll: `${root}/api/brand/getAll`,
      add: `${root}/api/brand/add`,
      edit: `${root}/api/brand/edit`,
      delete: `${root}/api/brand/delete`,
    },
    drinks: {
      getAll: `${root}/api/drink/getAll`,
      getPaginated: `${root}/api/drink/getByPagination?`,
      getFiltered: `${root}/api/drink/getByFilter?`,
      add: `${root}/api/drink/add`,
      receipt: `${root}/api/drink/receipt`,
      getById: `${root}/api/drink/getById`,
    },
    coupons: {
      getAll: `${root}/api/coupon/getAll`,
      add: `${root}/api/coupon/add`,
      delete: `${root}/api/coupon/delete`,
    },
    orders: {
      getAll: `${root}/api/orders/getAll`,
      execute: `${root}/api/orders/execute`,
    },
  },
  lk: {
    coupons: {
      addToMe: `${root}/api/coupon/setCouponToMe`,
      getMyCoupons: `${root}/api/coupon/getMyCoupons`,
    },
    basket: {
      getMyDrinks: `${root}/api/basket/getAll`,
      add: `${root}/api/basket/add`,
      delete: `${root}/api/basket/delete`,
    },
    order: {
      getAll: `${root}/api/userOrders/getAll`,
      add: `${root}/api/userOrders/add`,
    },
  },
}
export default api
