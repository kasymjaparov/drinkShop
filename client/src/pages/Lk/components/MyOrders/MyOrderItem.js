import React from "react"
import { Accordion } from "react-bootstrap"

export default function MyOrderItem({ order }) {
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

          {order.coupons && (
            <>
              <h2 className='order_item_subtitle'>Купон</h2>
              {order.coupons.map((c, index) => (
                <div key={c.id}>
                  {index + 1}) {c.id} - {c.sum} сом
                </div>
              ))}
            </>
          )}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  )
}
