import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import MyNavbar from "../../components/Navbar/Navbar"
import {
  getDrinksFiltered,
  getDrinksPaginated,
} from "../../store/actions/admin/drinks"
import DrinksFilters from "./components/DrinksFilters"
import DrinkCard from "../../components/DrinkCard/DrinkCard"
import "./Main.css"
import api from "../../api"
import { Col, Pagination, Row } from "react-bootstrap"
import { createPages } from "../../utils/pagesCreator"

export default function Main() {
  const dispatch = useDispatch()
  const allDrinks = useSelector(state => state.drinks.get)
  const totalCount = useSelector(state => state.drinks.total)
  const [page, setPage] = React.useState(1)
  const limit = 4
  const navbarLinks = [{ path: "lk", text: "Личный кабинет" }]
  const pagesCount = Math.ceil(totalCount / limit)
  const pages = []
  createPages(pages, pagesCount, page)
  React.useEffect(() => {
    dispatch(getDrinksFiltered({ page, limit }))
  }, [page])

  return (
    <div className='admin main container'>
      <MyNavbar data={navbarLinks} />
      <DrinksFilters paginationParams={{ page, limit }} />
      <Row className='main_drinks_row gy-5'>
        {allDrinks.success &&
          allDrinks.drinks.map(drink => {
            return (
              <Col key={drink.id} sm>
                <DrinkCard data={drink} />
              </Col>
            )
          })}
      </Row>
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
