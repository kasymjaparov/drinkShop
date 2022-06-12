import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUserOrders } from "../../../../store/actions/lk/orders"
import MyOrderItem from "./MyOrderItem"
import "./MyOrders.css"

export default function MyOrders() {
  const dispatch = useDispatch()
  const myOrders = useSelector(state => state.userOrders.get)
  React.useEffect(() => {
    dispatch(getUserOrders())
  }, [])
  return (
    <div className='orders'>
      <h1 className='admin-pages_title'>Мои заказы</h1>
      {myOrders.success &&
        myOrders.orders.map(o => {
          return <MyOrderItem key={o.id} order={o} />
        })}
    </div>
  )
}
