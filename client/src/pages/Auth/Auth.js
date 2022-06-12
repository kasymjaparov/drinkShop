import React from "react"
import "./Auth.css"
import { InputGroup, FormControl, Button } from "react-bootstrap"
import { Formik } from "formik"
import { useDispatch } from "react-redux"
import * as yup from "yup"
import { login, registration } from "../../store/actions/auth"
import { useNavigate } from "react-router-dom"

export default function Auth() {
  const dispatch = useDispatch()
  let navigate = useNavigate()
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .required("Обязательное поле")
      .email("Формат почты неверен"),
    password: yup
      .string()
      .required("Обязательное поле")
      .min(4, "Минимальное количество символов 4"),
  })
  const onSubmit = (data, { resetForm }) => {
    dispatch(login(data, navigate))
    resetForm({})
  }
  const regBtn = (data, resetForm) => {
    dispatch(registration(data))
    resetForm({})
  }
  return (
    <div className='auth container'>
      <Formik
        initialValues={{
          email: "",
          password: "",
          role: "user",
        }}
        validateOnBlur
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          isValid,
          handleSubmit,
          resetForm,
          dirty,
        }) => (
          <form className='auth_block'>
            <span className='auth_label'>E-mail*</span>
            <InputGroup>
              <FormControl
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                name='email'
                type='email'
                className='auth_input'
                isInvalid={touched.email && errors.email}
                placeholder='Введите email'
              />
            </InputGroup>
            {touched.email && errors.email && (
              <div className='input_error'>{errors.email}</div>
            )}
            <span className='auth_label'>Пароль*</span>
            <InputGroup>
              <FormControl
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.password && errors.password}
                name='password'
                autoComplete='off'
                className='auth_input'
                placeholder='Введите пароль'
                type='password'
              />
            </InputGroup>
            {touched.password && errors.password && (
              <div className='input_error'>{errors.password}</div>
            )}
            <Button
              type='button'
              disabled={!isValid || !dirty}
              onClick={handleSubmit}
              className='auth_btn'
              variant='primary'
            >
              Войти
            </Button>

            <Button
              type='button'
              disabled={!isValid || !dirty}
              onClick={() => regBtn(values, resetForm)}
              className='auth_btn'
              variant='primary'
            >
              Зарегистрироваться
            </Button>
          </form>
        )}
      </Formik>
    </div>
  )
}
