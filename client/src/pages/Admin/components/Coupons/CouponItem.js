import React from "react"
import { Accordion, Button } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { deleteCoupon } from "../../../../store/actions/admin/coupons"
import { CopyToClipboard } from "react-copy-to-clipboard"

export default function CouponItem(props) {
  const { coupon } = props
  const dispatch = useDispatch()
  const deleteCouponBtn = () => {
    dispatch(deleteCoupon(coupon.id))
  }
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
          {coupon.user && (
            <div className='songs_accordion-item_body_author'>
              Принадлежит: {coupon.user.email}
            </div>
          )}
          <CopyToClipboard text={coupon.id}>
            <Button size='sm'>Скопировать</Button>
          </CopyToClipboard>

          <Button onClick={deleteCouponBtn} size='sm' variant='danger'>
            Удалить
          </Button>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  )
}
