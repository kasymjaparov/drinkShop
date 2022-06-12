import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllOrders } from "../../../../store/actions/admin/orders"
import OrderItem from "./OrderItem"

export default function Orders() {
  const dispatch = useDispatch()
  const allOrders = useSelector(state => state.orders.get)
  React.useEffect(() => {
    dispatch(getAllOrders())
  }, [])
  return (
    <div className='orders'>
      <div className='admin-pages_title'>Заказы</div>
      {allOrders.success &&
        allOrders.orders.map(o => {
          return <OrderItem key={o.id} order={o} />
        })}
    </div>
  )
}
