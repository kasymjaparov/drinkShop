import axios from "axios"
import { Store } from "react-notifications-component"
import "animate.css"
import api from "../../../api"
import constants from "../../constants"
import notifications from "../../../utils/notifications"

export const getAllOrders = () => async dispatch => {
  dispatch({ type: constants.GET_ORDERS_LOADING })
  const token = localStorage.getItem("token")
  axios
    .get(api.admin.orders.getAll, { headers: { Authorization: token } })
    .then(({ data }) => {
      dispatch({ type: constants.GET_ORDERS_SUCCESS, payload: data.orders })
    })
    .catch(err => {
      dispatch({
        type: constants.GET_ORDERS_FAILED,
        payload: err.response.data.message,
      })
      Store.addNotification({
        ...notifications.common,
        ...notifications.failed,
        message: err.response.data.message,
      })
    })
}

export const executeOrder = data => async dispatch => {
  dispatch({ type: constants.EXECUTE_ORDER_LOADING })
  const token = localStorage.getItem("token")
  axios
    .post(api.admin.orders.execute, data, {
      headers: { Authorization: token },
    })
    .then(({ data }) => {
      dispatch({ type: constants.EXECUTE_ORDER_SUCCESS, payload: data.message })
      Store.addNotification({
        ...notifications.common,
        ...notifications.success,
        message: data.message,
      })
    })
    .then(() => {
      dispatch(getAllOrders())
    })
    .catch(err => {
      dispatch({
        type: constants.EXECUTE_ORDER_FAILED,
        payload: err.response.data.message,
      })
      Store.addNotification({
        ...notifications.common,
        ...notifications.failed,
        message: err.response.data.message,
      })
    })
}
