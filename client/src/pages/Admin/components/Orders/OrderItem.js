import React from "react"
import { Accordion, Button } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { executeOrder } from "../../../../store/actions/admin/orders"

export default function OrderItem({ order }) {
  const dispatch = useDispatch()
  const executeOrderBtn = () => {
    dispatch(executeOrder({ orderId: order.id, drinks: order.drinks }))
  }
  return (
    <Accordion
      className='songs_accordion songs_accordion-item'
      defaultActiveKey='0'
    >
      <Accordion.Item className='songs_accordion' eventKey='0'>
        <Accordion.Header className='songs_accordion songs_accordion-item_header'>
          Номер заказа: {order.id}
        </Accordion.Header>
        <Accordion.Body className='songs_accordion songs_accordion-item_body'>
          <div className='songs_accordion-item_body_author'>
            Дата: {new Date(order.date).toLocaleString()}
          </div>
          <div className='songs_accordion-item_body_author'>
            Сумма: {order.sum} сом
          </div>
          <div className='songs_accordion-item_body_author'>
            Выполнено: {order.isDone ? "Выполнено" : "Не выполнено"}
          </div>
          <h2 className='order_item_subtitle'>Напитки</h2>
          {order.drinks.map((d, index) => (
            <div key={d.id}>
              {index + 1}){d.name} - {d.price} сом - {d.order_drink.amount} шт.
            </div>
          ))}

          {order.coupons.length > 0 && (
            <>
              <h2 className='order_item_subtitle'>Купон</h2>
              <div>
                {order.coupons[0].id} - {order.coupons[0].sum} сом
              </div>
            </>
          )}
          {order.user && (
            <>
              <h2 className='order_item_subtitle'>Пользователь</h2>
              <div> {order.user.email}</div>
            </>
          )}
          {order.isDone ? (
            <Button variant='secondary' disabled>
              Выполнено
            </Button>
          ) : (
            <Button onClick={executeOrderBtn}>Выполнить</Button>
          )}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  )
}
