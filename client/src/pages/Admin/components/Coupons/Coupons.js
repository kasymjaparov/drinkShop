import React from "react"
import { Form, FormControl, InputGroup } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import {
  addCoupon,
  getAllCoupons,
} from "../../../../store/actions/admin/coupons"
import "./Coupons.css"
import CouponItem from "./CouponItem"

export default function Coupons() {
  const dispatch = useDispatch()
  const allCoupons = useSelector(state => state.coupons)
  const [sum, setSum] = React.useState(100)
  React.useEffect(() => {
    dispatch(getAllCoupons())
  }, [])

  const addCouponBtn = () => {
    dispatch(addCoupon({ sum }))
  }
  return (
    <div className='coupons'>
      <h1 className='admin-pages_title'>Купоны</h1>
      <InputGroup>
        <Form.Select
          onChange={e => {
            setSum(e.target.value)
          }}
          className='auth_input'
        >
          <option value={100}>100 сом</option>
          <option value={500}>500 сом</option>
          <option value={1000}>1000 сом</option>
        </Form.Select>
        <InputGroup.Text
          onClick={addCouponBtn}
          className='types-input_after types-input_after-send'
        >
          Добавить
        </InputGroup.Text>
      </InputGroup>
      {allCoupons.get.success &&
        allCoupons.get.coupons.map(coupon => {
          return <CouponItem key={coupon.id} coupon={coupon} />
        })}
    </div>
  )
}
