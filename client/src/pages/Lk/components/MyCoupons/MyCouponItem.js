import React from "react"
import { Accordion, Button } from "react-bootstrap"
import { useDispatch } from "react-redux"

export default function CouponItem(props) {
  const { coupon } = props
  const dispatch = useDispatch()

  return (
    <Accordion
      className='songs_accordion songs_accordion-item'
      defaultActiveKey='0'
    >
      <Accordion.Item className='songs_accordion' eventKey='0'>
        <Accordion.Header className='songs_accordion songs_accordion-item_header'>
          ID: {coupon.id}
        </Accordion.Header>
        <Accordion.Body className='songs_accordion songs_accordion-item_body'>
          <div className='songs_accordion-item_body_author'>
            Сумма: {coupon.sum} сом
          </div>
          <div className='songs_accordion-item_body_author'>
            Использована: {coupon.isUsed ? "Да" : "Нет"}
          </div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  )
}
