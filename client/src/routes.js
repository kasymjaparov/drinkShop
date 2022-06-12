import React from "react"
import { Route, Routes } from "react-router"
import { RequiredAuth } from "./components/RequiredAuth"
import Admin from "./pages/Admin/Admin"
import Coupons from "./pages/Admin/components/Coupons/Coupons"
import CreateDrink from "./pages/Admin/components/Drinks/CreateDrink"
import Drinks from "./pages/Admin/components/Drinks/Drinks"
import Orders from "./pages/Admin/components/Orders/Orders"
import Types from "./pages/Admin/components/Types/Types"
import Auth from "./pages/Auth/Auth"
import Drink from "./pages/Drink/Drink"
import MyCoupons from "./pages/Lk/components/MyCoupons/MyCoupons"
import MyOrders from "./pages/Lk/components/MyOrders/MyOrders"
import Brands from "./pages/Admin/components/Brands/Brands"
import MyBasket from "./pages/Lk/components/Basket/Basket"
import Lk from "./pages/Lk/Lk"
import Main from "./pages/Main/Main"
import roles from "./utils/roles"

export const MyRoutes = () => {
  return (
    <Routes>
      <Route element={<Main />} path='/' />
      <Route element={<Auth />} path='/auth' />
      <Route element={<Drink />} path='/drinks/:id' />
      <Route
        element={
          <RequiredAuth roles={[roles.ADMIN]}>
            <Admin />
          </RequiredAuth>
        }
        path='/admin'
      >
        <Route element={<Brands />} index />
        <Route element={<Types/>} path='types' />
        <Route element={<Coupons />} path='coupons' />
        <Route element={<Drinks />} path='drinks' />
        <Route element={<Orders />} path='orders' />
        <Route element={<CreateDrink />} path='createDrink' />
      </Route>
      <Route
        element={
          <RequiredAuth roles={[roles.USER]}>
            <Lk />
          </RequiredAuth>
        }
        path='/lk'
      >
        <Route element={<MyBasket />} index />
        <Route element={<MyCoupons />} path='coupons' />
        <Route element={<MyOrders />} path='orders' />
      </Route>
    </Routes>
  )
}
