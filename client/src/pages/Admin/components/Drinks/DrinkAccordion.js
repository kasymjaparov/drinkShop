import React from "react"
import { Accordion, FormControl, InputGroup } from "react-bootstrap"
import { useDispatch } from "react-redux"
import * as yup from "yup"
import { useFormik } from "formik"
import { receiptDrink } from "../../../../store/actions/admin/drinks"

export default function DrinkAccordion({ drink }) {
  const dispatch = useDispatch()
  const validationSchema = yup.object().shape({
    amount: yup
      .number("Должно быть число")
      .min(0, "Должно быть больше 0")
      .required("Обязательное поле"),
  })
  const initialValues = {
    amount: "",
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
      dispatch(
        receiptDrink({
          drinkId: drink.id,
          amount: data.amount,
          isComing: true,
          date: new Date(),
        })
      )
    },
  })
  return (
    <Accordion
      className='songs_accordion songs_accordion-item'
      defaultActiveKey='0'
    >
      <Accordion.Item className='songs_accordion' eventKey='0'>
        <Accordion.Header className='songs_accordion songs_accordion-item_header'>
          {drink.name}
        </Accordion.Header>
        <Accordion.Body className='songs_accordion songs_accordion-item_body'>
          <div className='songs_accordion-item_body_author'>
            Тип: {drink.type.name}
          </div>

          <div className='songs_accordion-item_body_author'>
            Бренд: {drink.brand.name}
          </div>
          <div className='songs_accordion-item_body_author'>
            Количество: {drink.amount}
          </div>
          <InputGroup>
            <FormControl
              value={values.amount}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder='Количество поступившего товара'
              className='auth_input'
              type='number'
              name='amount'
            />
            <InputGroup.Text
              onClick={handleSubmit}
              disabled={!isValid || !dirty}
              className='types-input_after types-input_after-send'
            >
              Отправить
            </InputGroup.Text>
          </InputGroup>
          {touched.amount && Boolean(errors.amount) && (
            <div className='input_error'>{errors.amount}</div>
          )}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  )
}
