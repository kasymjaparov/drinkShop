import React from "react"
import { Button, Form, Modal } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import {
  getMyDrinks,
  addDrinkToMe,
  deleteDrinkFromBasket,
} from "../../../../store/actions/lk/basket"
import { getMyCoupons } from "../../../../store/actions/lk/coupons.js"
import { addOrder } from "../../../../store/actions/lk/orders"
import "./Basket.css"
import BasketItem from "./BasketItem"

export default function Basket() {
  const dispatch = useDispatch()
  React.useEffect(() => {
    dispatch(getMyDrinks())
    dispatch(getMyCoupons())
  }, [])
  const [show, setShow] = React.useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const sendOrderBtn = () => {
    dispatch(
      addOrder({
        drinks: checkedItems,
        date: new Date(),
        couponId: selectedCoupon,
        sum: total,
      })
    )
    setShow(false)
  }
  const myCoupons = useSelector(state => state.myCoupons.get)
  const allItems = useSelector(state => state.basket.get)
  const [checkedItems, setCheckedItems] = React.useState([])
  const [selectedCoupon, setSelectedCoupon] = React.useState("")
  const handleChange = data => {
    const candidateChecked = checkedItems
    const findIdx = candidateChecked.findIndex(
      obj => obj.drinkId == data.drinkId
    )
    if (findIdx > -1) {
      candidateChecked.splice(findIdx, 1)
    } else {
      candidateChecked.push(data)
    }
    setCheckedItems(candidateChecked)
  }
  const makeOrderBtn = () => {
    if (checkedItems.length < 1) {
    } else {
      handleShow()
    }
  }
  let total = 0
  return (
    <div className='basket'>
      <h1 className='admin-pages_title'>Корзина</h1>
      {allItems.loading && <div>Загрузка...</div>}
      {allItems.success &&
        allItems.drinks.map(drink => (
          <BasketItem
            handleChange={handleChange}
            key={drink.id}
            drink={drink}
          />
        ))}
      {allItems.success && allItems.drinks.length <= 0 && (
        <>
          <div>Корзина пуста</div>
        </>
      )}
      {allItems.success && allItems.drinks.length > 0 && (
        <>
          <span className='auth_label'>Купоны*</span>
          <Form.Select
            onChange={e => setSelectedCoupon(e.target.value)}
            className='auth_input'
          >
            <option disabled selected>
              -
            </option>
            {myCoupons.success &&
              myCoupons.coupons
                .filter(coupon => coupon.isUsed !== true)
                .map(coupon => (
                  <option key={coupon.id} value={coupon.id}>
                    {coupon.id} - {coupon.sum} сом
                  </option>
                ))}
          </Form.Select>
          <Button onClick={makeOrderBtn} className='basket_btn'>
            Заказать
          </Button>
        </>
      )}

      <Modal className='basket_modal' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Заказ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='basket_modal_body'>
            {checkedItems.map(d => (
              <div key={d.drinkId} className='basket_modal_body_items'>
                {(total += d.sum * d.amount)}
                {d.name} - {d.amount}шт - {d.sum} сом = {d.sum * d.amount} сом
              </div>
            ))}
            {myCoupons.success && selectedCoupon && (
              <div>
                Купоны: <br />
                {
                  myCoupons.coupons[
                    myCoupons.coupons.findIndex(obj => obj.id == selectedCoupon)
                  ].id
                }
                -
                {
                  myCoupons.coupons[
                    myCoupons.coupons.findIndex(obj => obj.id == selectedCoupon)
                  ].sum
                }
                сом
              </div>
            )}
            {myCoupons.success && selectedCoupon ? (
              <div className='modal_sum'>
                Сумма:
                {total -
                  (myCoupons.coupons[
                    myCoupons.coupons.findIndex(obj => obj.id == selectedCoupon)
                  ].sum || 0)}
              </div>
            ) : (
              <div className='modal_sum'>
                Сумма:
                {total}
              </div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='primary' onClick={sendOrderBtn}>
            Заказать
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
