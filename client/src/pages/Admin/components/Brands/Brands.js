import React from "react"
import "./Brands.css"
import { useDispatch, useSelector } from "react-redux"
import { getAllBrands, addBrand } from "../../../../store/actions/admin/brands"
import { FormControl, InputGroup } from "react-bootstrap"
import BrandItem from "./BrandItem"

export default function Types() {
  const dispatch = useDispatch()
  const brands = useSelector(state => state.brands.get)
  const [typeName, setTypeName] = React.useState()
  React.useEffect(() => {
    dispatch(getAllBrands())
  }, [])
  const addTypeBtn = async () => {
    if (typeName) {
      dispatch(addBrand(typeName))
    }
  }
  return (
    <div className='types'>
      <h1 className='admin-pages_title'>Бренды</h1>
      <InputGroup>
        <FormControl
          placeholder='Введите название бренда'
          className='auth_input'
          onChange={e => setTypeName(e.target.value)}
          value={typeName}
        />
        <InputGroup.Text
          onClick={addTypeBtn}
          className='types-input_after types-input_after-send'
        >
          Добавить
        </InputGroup.Text>
      </InputGroup>
      {brands.success &&
        brands.brands.map(type => {
          return <BrandItem key={type.id} type={type} />
        })}
    </div>
  )
}
