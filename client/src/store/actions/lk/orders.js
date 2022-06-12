import axios from "axios"
import { Store } from "react-notifications-component"
import "animate.css"
import api from "../../../api"
import constants from "../../constants"
import notifications from "../../../utils/notifications"

export const addOrder = data => async dispatch => {
  dispatch({ type: constants.ADD_ORDER_LOADING })
  const token = localStorage.getItem("token")
  axios
    .post(api.lk.order.add, data, {
      headers: { Authorization: token },
    })
    .then(({ data }) => {
      dispatch({
        type: constants.ADD_ORDER_SUCCESS,
        payload: data.message,
      })
      Store.addNotification({
        ...notifications.common,
        ...notifications.success,
        message: data.message,
      })
    })
    .catch(err => {
      dispatch({
        type: constants.ADD_ORDER_FAILED,
        payload: err.response.data.message,
      })
      Store.addNotification({
        ...notifications.common,
        ...notifications.failed,
        message: err.response.data.message,
      })
    })
}

export const getUserOrders = () => async dispatch => {
  dispatch({ type: constants.GET_USER_ORDERS_LOADING })
  const token = localStorage.getItem("token")
  axios
    .get(api.lk.order.getAll, {
      headers: { Authorization: token },
    })
    .then(({ data }) => {
      dispatch({
        type: constants.GET_USER_ORDERS_SUCCESS,
        payload: data.orders,
      })
    })
    .catch(err => {
      dispatch({
        type: constants.GET_USER_ORDERS_FAILED,
        payload: err.response.data.message,
      })
      Store.addNotification({
        ...notifications.common,
        ...notifications.failed,
        message: err.response.data.message,
      })
    })
}
