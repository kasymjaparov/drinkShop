import axios from "axios"
import { Store } from "react-notifications-component"
import "animate.css"
import api from "../../../api"
import constants from "../../constants"
import notifications from "../../../utils/notifications"

export const getMyDrinks = () => async dispatch => {
  dispatch({ type: constants.GET_DRINKS_BASKET_LOADING })
  const token = localStorage.getItem("token")
  axios
    .get(api.lk.basket.getMyDrinks, {
      headers: { Authorization: token },
    })
    .then(({ data }) => {
      dispatch({
        type: constants.GET_DRINKS_BASKET_SUCCESS,
        payload: data.drinks,
      })
    })
    .catch(err => {
      dispatch({
        type: constants.GET_DRINKS_BASKET_FAILED,
        payload: err.response.data,
      })
      Store.addNotification({
        ...notifications.common,
        ...notifications.failed,
        message: err.response.data,
      })
    })
}
export const addDrinkToMe = data => async dispatch => {
  dispatch({ type: constants.ADD_DRINK_TO_ME_LOADING })
  const token = localStorage.getItem("token")
  axios
    .post(api.lk.basket.add, data, {
      headers: { Authorization: token },
    })
    .then(({ data }) => {
      dispatch({
        type: constants.ADD_DRINK_TO_ME_SUCCESS,
        payload: data.message,
      })
      Store.addNotification({
        ...notifications.common,
        ...notifications.success,
        message: data.message,
      })
    })
    .then(() => {
      dispatch(getMyDrinks())
    })
    .catch(err => {
      dispatch({
        type: constants.ADD_DRINK_TO_ME_FAILED,
        payload: err.response.data.message,
      })
      Store.addNotification({
        ...notifications.common,
        ...notifications.failed,
        message: err.response.data.message,
      })
    })
}

export const deleteDrinkFromBasket = id => async dispatch => {
  dispatch({ type: constants.DELETE_DRINK_BASKET_LOADING })
  const token = localStorage.getItem("token")
  axios
    .delete(`${api.lk.basket.delete}/${id}`, {
      headers: { Authorization: token },
    })
    .then(({ data }) => {
      dispatch({
        type: constants.DELETE_DRINK_BASKET_SUCCESS,
        payload: data.message,
      })
      Store.addNotification({
        ...notifications.common,
        ...notifications.success,
        message: data.message,
      })
    })
    .then(() => {
      dispatch(getMyDrinks())
    })
    .catch(err => {
      dispatch({
        type: constants.DELETE_DRINK_BASKET_FAILED,
        payload: err.response.data.message,
      })
      Store.addNotification({
        ...notifications.common,
        ...notifications.failed,
        message: err.response.data.message,
      })
    })
}
