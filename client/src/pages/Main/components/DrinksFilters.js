import React from "react"
import { Form, FormControl, InputGroup } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { getDrinksFiltered } from "../../../store/actions/admin/drinks"
import { getAllTypes } from "../../../store/actions/admin/types"

export default function SongFilters({ paginationParams }) {
  const [params, setParams] = React.useState({
    type: "",
    drinkName: "",
  })
  const dispatch = useDispatch()
  React.useEffect(() => {
    dispatch(getAllTypes())
  }, [])
  const allTypes = useSelector(state => state.types.get)
  const searchBtn = () => {
    dispatch(
      getDrinksFiltered({
        ...paginationParams,
        type: params.type,
        drinkName: params.drinkName,
      })
    )
  }
  return (
    allTypes.success && (
      <div className='main_filters'>
        <div className='main_songs_filters_item'>
          <Form.Select
            onChange={e => {
              setParams({ ...params, type: e.target.value })
            }}
            className='auth_input  filter-input'
          >
            <option value=''>Все</option>
            {allTypes.types.map(item => (
              <option key={item.id} value={item.name}>
                {item.name}
              </option>
            ))}
          </Form.Select>
        </div>
        <InputGroup style={{ width: "50%" }}>
          <FormControl
            onChange={e => {
              setParams({ ...params, drinkName: e.target.value })
            }}
            name='name'
            className='auth_input filter-input'
            placeholder='Введите название алкоголя'
          />
        </InputGroup>
        <div onClick={searchBtn} className='main_filters_search auth_input'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            fill='currentColor'
            className='bi bi-search'
            viewBox='0 0 16 16'
          >
            <path d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z' />
          </svg>
        </div>
      </div>
    )
  )
}
