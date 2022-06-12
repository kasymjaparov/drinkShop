import axios from "axios"
import { Store } from "react-notifications-component"
import "animate.css"
import api from "../../../api"
import constants from "../../constants"
import notifications from "../../../utils/notifications"

export const getAllDrinks = () => dispatch => {
  dispatch({ type: constants.GET_DRINKS_LOADING })
  axios
    .get(api.admin.drinks.getAll)
    .then(({ data }) => {
      dispatch({ type: constants.GET_DRINKS_SUCCESS, payload: data })
    })
    .catch(err => {
      dispatch({
        type: constants.GET_DRINKS_FAILED,
        payload: err.response.data,
      })
      Store.addNotification({
        ...notifications.common,
        ...notifications.failed,
        message: err.response.data.message,
      })
    })
}

export const getDrinkById = id => dispatch => {
  dispatch({ type: constants.GET_DRINK_LOADING })
  axios
    .get(`${api.admin.drinks.getById}/${id}`)
    .then(({ data }) => {
      dispatch({
        type: constants.GET_DRINK_SUCCESS,
        payload: data,
      })
    })
    .catch(err => {
      dispatch({
        type: constants.GET_DRINK_FAILED,
        payload: err.response.data.message,
      })
      Store.addNotification({
        ...notifications.common,
        ...notifications.failed,
        message: err.response.data.message,
      })
    })
}

export const getDrinksPaginated =
  ({ page, limit }) =>
  dispatch => {
    dispatch({ type: constants.GET_DRINKS_PAGINATED_LOADING })
    console.log("pag")
    axios
      .get(`${api.admin.drinks.getPaginated}page=${page}&limit=${limit}`)
      .then(({ data }) => {
        dispatch({
          type: constants.GET_DRINKS_PAGINATED_SUCCESS,
          payload: data,
        })
      })
      .catch(err => {
        dispatch({
          type: constants.GET_DRINKS_PAGINATED_FAILED,
          payload: err.response.data.message,
        })
        Store.addNotification({
          ...notifications.common,
          ...notifications.failed,
          message: err.response.data.message,
        })
      })
  }

export const getDrinksFiltered =
  ({ page, limit, type = "", drinkName = "" }) =>
  dispatch => {
    dispatch({ type: constants.GET_DRINKS_PAGINATED_LOADING })
    axios
      .get(
        `${api.admin.drinks.getFiltered}page=${page}&limit=${limit}&type=${type}&drinkName=${drinkName}`
      )
      .then(({ data }) => {
        dispatch({
          type: constants.GET_DRINKS_PAGINATED_SUCCESS,
          payload: data,
        })
      })
      .catch(err => {
        dispatch({
          type: constants.GET_DRINKS_PAGINATED_FAILED,
          payload: err.response.data.message,
        })
        Store.addNotification({
          ...notifications.common,
          ...notifications.failed,
          message: err.response.data.message,
        })
      })
  }

export const addDrink = data => async dispatch => {
  dispatch({ type: constants.ADD_DRINK_LOADING })
  const token = localStorage.getItem("token")
  axios
    .post(api.admin.drinks.add, data, { headers: { Authorization: token } })
    .then(({ data }) => {
      dispatch({ type: constants.ADD_DRINK_SUCCESS, payload: data.message })
      Store.addNotification({
        ...notifications.common,
        ...notifications.success,
        message: data.message,
      })
    })
    .catch(err => {
      dispatch({
        type: constants.ADD_DRINK_FAILED,
        payload: err.response.data.message,
      })
      Store.addNotification({
        ...notifications.common,
        ...notifications.failed,
        message: err.response.data.message,
      })
    })
}

export const receiptDrink = data => async dispatch => {
  dispatch({ type: constants.RECEIPT_DRINK_LOADING })
  const token = localStorage.getItem("token")
  axios
    .post(api.admin.drinks.receipt, data, { headers: { Authorization: token } })
    .then(({ data }) => {
      dispatch({ type: constants.RECEIPT_DRINK_SUCCESS, payload: data.message })
      Store.addNotification({
        ...notifications.common,
        ...notifications.success,
        message: data.message,
      })
    })
    .then(() => {
      dispatch(getDrinksFiltered({ page: 1, limit: 4 }))
    })
    .catch(err => {
      dispatch({
        type: constants.RECEIPT_DRINK_FAILED,
        payload: err.response.data.message,
      })
      Store.addNotification({
        ...notifications.common,
        ...notifications.failed,
        message: err.response.data.message,
      })
    })
}
