import React from "react"
import { Outlet } from "react-router"
import Navbar from "../../components/Navbar/Navbar"
import "./Lk.css"

export default function Lk() {
  const navbarLinks = [
    { path: "", text: "Корзина" },
    { path: "coupons", text: "Мои купоны" },
    { path: "orders", text: "Мои заказы" },
  ]
  return (
    <div className='lk container'>
      <Navbar data={navbarLinks} />
      <div className='admin_divider'>
        <Outlet />
      </div>
    </div>
  )
}
