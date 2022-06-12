import React from "react"
import "./Types.css"
import { useDispatch, useSelector } from "react-redux"
import { getAllTypes, addType } from "../../../../store/actions/admin/types"
import { FormControl, InputGroup } from "react-bootstrap"
import TypeItem from "./TypeItem"

export default function Types() {
  const dispatch = useDispatch()
  const types = useSelector(state => state.types.get)
  const [typeName, setTypeName] = React.useState()
  React.useEffect(() => {
    dispatch(getAllTypes())
  }, [])
  const addTypeBtn = () => {
    if (typeName) {
      dispatch(addType(typeName))
    }
  }
  return (
    <div className='types'>
      <h1 className='admin-pages_title'>Типы</h1>
      <InputGroup>
        <FormControl
          placeholder='Введите название типа'
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
      {types.success &&
        types.types.map(type => {
          return <TypeItem key={type.id} type={type} />
        })}
    </div>
  )
}
