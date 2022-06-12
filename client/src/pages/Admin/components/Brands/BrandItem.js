import React from "react"
import { FormControl, InputGroup } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router"
import {
  deleteBrand,
  editBrand,
  getAllBrands,
} from "../../../../store/actions/admin/brands"

export default function TypeItem(props) {
  const { type } = props
  const [choosenItemId, setChoosenItemId] = React.useState(0)
  const [typeName, setTypeName] = React.useState(type.name)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const saveTypeBtn = id => {
    if (typeName) {
      setChoosenItemId(0)
      dispatch(editBrand({ id, name: typeName }))
    }
  }
  const deleteTypeBtn = id => {
    dispatch(deleteBrand(id))
  }
  return (
    <div className='typeItem'>
      <InputGroup>
        <FormControl
          disabled={type.id != choosenItemId}
          name='type'
          type='text'
          onChange={e => setTypeName(e.target.value)}
          value={typeName}
          className='auth_input'
        />
        {type.id != choosenItemId && (
          <InputGroup.Text
            onClick={() => setChoosenItemId(type.id)}
            className='types-input_after types-input_after-edit'
          >
            Изменить
          </InputGroup.Text>
        )}

        {type.id === choosenItemId && (
          <InputGroup.Text
            onClick={() => saveTypeBtn(type.id)}
            className='types-input_after types-input_after-edit'
          >
            Сохранить
          </InputGroup.Text>
        )}

        <InputGroup.Text
          onClick={() => deleteTypeBtn(type.id)}
          className='types-input_after types-input_after-delete'
        >
          Удалить
        </InputGroup.Text>
      </InputGroup>
    </div>
  )
}
