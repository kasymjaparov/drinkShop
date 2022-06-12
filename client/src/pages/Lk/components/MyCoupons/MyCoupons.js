import React from "react"
import { FormControl, InputGroup } from "react-bootstrap"
import CouponItem from "./MyCouponItem"
import { useDispatch, useSelector } from "react-redux"
import {
  addCouponToMe,
  getMyCoupons,
} from "../../../../store/actions/lk/coupons"
import "./MyCoupons.css"
import { useFormik } from "formik"
import * as yup from "yup"

export default function MyCoupons() {
  const dispatch = useDispatch()
  const myCoupons = useSelector(state => state.myCoupons)
  React.useEffect(() => {
    dispatch(getMyCoupons())
  }, [])
  const validationSchema = yup.object().shape({
    id: yup
      .string()
      .required("Обязательное поле")
      .matches(
        /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/,
        "Не соответствует паттерну купона"
      ),
  })
  const initialValues = {
    id: "",
  }
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    isValid,
    handleSubmit,
    dirty,
    setFieldValue,
  } = useFormik({
    initialValues,
    validateOnBlur: true,
    validationSchema: validationSchema,
    onSubmit: (data, { resetForm }) => {
      dispatch(addCouponToMe(data))
    },
  })
  return (
    <div className='myBasket'>
      <h1 className='admin-pages_title'>Мои купоны</h1>
      <InputGroup>
        <FormControl
          placeholder='Введите купон'
          className='auth_input'
          name='id'
          value={values.id}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <InputGroup.Text
          onClick={handleSubmit}
          disabled={!isValid || !dirty}
          className='types-input_after types-input_after-send'
        >
          Добавить
        </InputGroup.Text>
      </InputGroup>
      {touched.id && Boolean(errors.id) && (
        <div className='input_error'>{errors.id}</div>
      )}
      {myCoupons.get.success &&
        myCoupons.get.coupons.map(coupon => {
          return <CouponItem key={coupon.id} coupon={coupon} />
        })}
    </div>
  )
}
