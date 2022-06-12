import axios from "axios"
import { Store } from "react-notifications-component"
import "animate.css"
import api from "../../../api"
import constants from "../../constants"
import notifications from "../../../utils/notifications"

export const getAllCoupons = () => async dispatch => {
  const token = localStorage.getItem("token")
  dispatch({ type: constants.GET_BRANDS_LOADING })
  axios
    .get(api.admin.coupons.getAll, { headers: { Authorization: token } })
    .then(({ data }) => {
      dispatch({ type: constants.GET_ALL_COUPONS_SUCCESS, payload: data })
    })
    .catch(err => {
      dispatch({
        type: constants.GET_ALL_COUPONS_FAILED,
        payload: err.response.data.message,
      })
      Store.addNotification({
        ...notifications.common,
        ...notifications.failed,
        message: err.response.data.message,
      })
    })
}

export const addCoupon = sum => async dispatch => {
  dispatch({ type: constants.ADD_COUPON_LOADING })
  const token = localStorage.getItem("token")
  axios
    .post(api.admin.coupons.add, sum, { headers: { Authorization: token } })
    .then(({ data }) => {
      dispatch({ type: constants.ADD_COUPON_SUCCESS })
      Store.addNotification({
        ...notifications.common,
        ...notifications.success,
        message: data.message,
      })
    })
    .then(() => {
      dispatch(getAllCoupons())
    })
    .catch(err => {
      dispatch({
        type: constants.ADD_COUPON_FAILED,
        payload: err.response.data.message,
      })
      Store.addNotification({
        ...notifications.common,
        ...notifications.failed,
        message: err.response.data.message,
      })
    })
}

export const deleteCoupon = id => async dispatch => {
  dispatch({ type: constants.DELETE_COUPON_LOADING })
  const token = localStorage.getItem("token")
  axios
    .delete(`${api.admin.coupons.delete}/${id}`, {
      headers: { Authorization: token },
    })
    .then(({ data }) => {
      dispatch({ type: constants.DELETE_COUPON_SUCCESS })
      Store.addNotification({
        ...notifications.common,
        ...notifications.success,
        message: data.message,
      })
    })
    .then(() => {
      dispatch(getAllCoupons())
    })
    .catch(err => {
      dispatch({
        type: constants.DELETE_COUPON_FAILED,
        payload: err.response.data.message,
      })
      Store.addNotification({
        ...notifications.common,
        ...notifications.failed,
        message: err.response.data.message,
      })
    })
}
