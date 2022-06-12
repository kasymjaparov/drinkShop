import React from "react"
import { Button } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router"
import { NavLink } from "react-router-dom"
import { addDrinkToMe } from "../../store/actions/lk/basket"
import "./DrinkCard.css"

export default function DrinkCard(props) {
  const { data } = props
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const sendToBasketBtn = () => {
    dispatch(addDrinkToMe({ drinkId: data.id, amount: 1 }))
  }
  return (
    <div className='drinkCard'>
      <div className='drinkCard_image'>
        <img src={data.logo} alt={data.name} />
      </div>
      <NavLink to={`drinks/${data.id}`} className='drinkCard_attr'>
        {data.name}
      </NavLink>
      <div className='drinkCard_attr'>{data.price} сом</div>
      {data.amount <= 0 ? (
        <span className='input_error'>Напиток закончился</span>
      ) : (
        <Button
          onClick={sendToBasketBtn}
          variant='dark'
          className='drinkCard_btn-basket'
        >
          В КОРЗИНУ
        </Button>
      )}
    </div>
  )
}
