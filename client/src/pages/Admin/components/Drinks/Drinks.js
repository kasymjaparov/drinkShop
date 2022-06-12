import React from "react"
import "./Drinks.css"
import { useDispatch, useSelector } from "react-redux"
import { createPages } from "../../../../utils/pagesCreator"
import { Pagination } from "react-bootstrap"
import { getDrinksFiltered } from "../../../../store/actions/admin/drinks.js"
import { NavLink } from "react-router-dom"
import { Button } from "react-bootstrap"
import DrinkAccordion from "./DrinkAccordion"

export default function Drinks() {
  const dispatch = useDispatch()

  const allDrinks = useSelector(state => state.drinks.get)
  const totalCount = useSelector(state => state.drinks.total)
  const [page, setPage] = React.useState(1)
  const limit = 4
  const pages = []
  const pagesCount = Math.ceil(totalCount / limit)
  createPages(pages, pagesCount, page)
  React.useEffect(() => {
    dispatch(getDrinksFiltered({ page, limit }))
  }, [page])

  return (
    <div className='drinks'>
      <NavLink className='drinks_link' to='/admin/createDrink'>
        <Button> Создать напиток</Button>
      </NavLink>
      <h1 className='admin-pages_title'>Напитки</h1>
      <div>
        {allDrinks.success &&
          allDrinks.drinks.map(drink => {
            return <DrinkAccordion key={drink.id} drink={drink} />
          })}
      </div>
      <Pagination className='pagination_pages '>
        {pages.map(pN => (
          <Pagination.Item
            onClick={() => setPage(pN)}
            className='auth_input'
            key={pN}
            active={pN === page}
          >
            {pN}
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
  )
}
