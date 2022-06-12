import React from "react"
import "./Drinks.css"
import { InputGroup, FormControl, Button, Form } from "react-bootstrap"
import * as yup from "yup"
import { useFormik } from "formik"
import { useDispatch, useSelector } from "react-redux"
import { getAllTypes } from "../../../../store/actions/admin/types"
import { getAllBrands } from "../../../../store/actions/admin/brands"
import { addDrink } from "../../../../store/actions/admin/drinks"

export default function CreateDrink() {
  const dispatch = useDispatch()
  React.useEffect(() => {
    dispatch(getAllTypes())
    dispatch(getAllBrands())
  }, [])
  const allBrands = useSelector(state => state.brands.get)
  const allTypes = useSelector(state => state.types.get)
  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .required("Обязательное поле")
      .min(3, "Минимальное количество символов 3"),
    brandId: yup.number().required("Обязательное поле"),
    capacity: yup.string().required("Обязательное поле"),
    desc: yup.string().required("Обязательное поле"),
    price: yup.number("Должно быть число").required("Обязательное поле"),
    amount: yup.number("Должно быть число").required("Обязательное поле"),
    typeId: yup.number().required("Обязательное поле"),
    logo: yup.string().required("Обязательное поле"),
  })
  const initialValues = {
    name: "",
    brandId: "",
    capacity: "",
    desc: "",
    price: "",
    amount: "",
    typeId: "",
    logo: "",
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
      dispatch(addDrink(data))
    },
  })
  const convertBase64 = file => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(file)

      fileReader.onload = () => {
        resolve(fileReader.result)
      }

      fileReader.onerror = error => {
        reject(error)
      }
    })
  }
  const uploadImage = async file => {
    const base64 = await convertBase64(file)
    setFieldValue("logo", base64)
  }
  return (
    <div className='drinks'>
      <h1 className='admin-pages_title'>Создать напиток</h1>
      <form>
        <span className='auth_label'>Название напитка*</span>
        <InputGroup>
          <FormControl
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            name='name'
            error={touched.name && Boolean(errors.name)}
            className='auth_input'
            placeholder='Введите название'
          />
        </InputGroup>
        {touched.name && Boolean(errors.name) && (
          <div className='input_error'>{errors.name}</div>
        )}
        <span className='auth_label'>*Емкость</span>
        <InputGroup>
          <FormControl
            value={values.capacity}
            onChange={handleChange}
            onBlur={handleBlur}
            name='capacity'
            error={touched.capacity && Boolean(errors.capacity)}
            className='auth_input'
            placeholder='Введите емкость'
          />
        </InputGroup>
        {touched.capacity && Boolean(errors.capacity) && (
          <div className='input_error'>{errors.capacity}</div>
        )}
        <span className='auth_label'>*Цена</span>
        <InputGroup>
          <FormControl
            value={values.price}
            onChange={handleChange}
            onBlur={handleBlur}
            name='price'
            type='number'
            error={touched.price && Boolean(errors.price)}
            className='auth_input'
            placeholder='Введите цену'
          />
        </InputGroup>
        {touched.price && Boolean(errors.price) && (
          <div className='input_error'>{errors.price}</div>
        )}
        <span className='auth_label'>*Количество</span>
        <InputGroup>
          <FormControl
            value={values.amount}
            onChange={handleChange}
            onBlur={handleBlur}
            name='amount'
            type='number'
            error={touched.amount && Boolean(errors.amount)}
            className='auth_input'
            placeholder='Введите количество'
          />
        </InputGroup>
        {touched.amount && Boolean(errors.amount) && (
          <div className='input_error'>{errors.amount}</div>
        )}
        <span className='auth_label'>*Описание</span>
        <InputGroup>
          <FormControl
            value={values.desc}
            onChange={handleChange}
            onBlur={handleBlur}
            name='desc'
            as='textarea'
            rows={3}
            error={touched.desc && Boolean(errors.desc)}
            className='auth_input'
            placeholder='Введите описание'
          />
        </InputGroup>
        {touched.desc && Boolean(errors.desc) && (
          <div className='input_error'>{errors.desc}</div>
        )}
        {allBrands.success && (
          <>
            <span className='auth_label'>Бренд*</span>
            <Form.Select
              onChange={handleChange}
              onBlur={handleBlur}
              name='brandId'
              className='auth_input'
            >
              <option disabled selected>
                -
              </option>
              {allBrands.success &&
                allBrands.brands.map(brand => {
                  return (
                    <option key={brand.id} value={brand.id}>
                      {brand.name}
                    </option>
                  )
                })}
            </Form.Select>
          </>
        )}

        {allTypes.success && (
          <>
            <span className='auth_label'>Тип*</span>
            <Form.Select
              onChange={handleChange}
              onBlur={handleBlur}
              name='typeId'
              className='auth_input'
            >
              <option disabled selected>
                -
              </option>
              {allTypes.success &&
                allTypes.types.map(type => {
                  return (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  )
                })}
            </Form.Select>
          </>
        )}
        <Form.Group>
          <span className='auth_label'>Картинка*</span>
          <Form.Control
            onChange={e => uploadImage(e.target.files[0])}
            onBlur={handleBlur}
            accept='image/png, image/jpeg'
            className='auth_input'
            type='file'
            name='logo'
          />
        </Form.Group>
        {touched.logo && Boolean(errors.logo) && (
          <div className='input_error'>{errors.logo}</div>
        )}
        <Button
          onClick={handleSubmit}
          disabled={!isValid || !dirty}
          type='button'
          className='auth_btn'
          variant='primary'
        >
          Отправить
        </Button>
      </form>
    </div>
  )
}
