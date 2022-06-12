import { combineReducers } from "redux"
import auth from "./auth"
import types from "./admin/types"
import drinks from "./admin/drinks"
import brands from "./admin/brands"
import coupons from "./admin/coupons"
import myCoupons from "./lk/coupons"
import basket from "./lk/basket"
import userOrders from "./lk/userOrders"
import orders from "./admin/orders"

export default combineReducers({
  auth,
  types,
  drinks,
  brands,
  coupons,
  myCoupons,
  basket,
  userOrders,
  orders,
})
