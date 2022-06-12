import axios from "axios"
import { Store } from "react-notifications-component"
import "animate.css"
import api from "../../../api"
import constants from "../../constants"
import notifications from "../../../utils/notifications"

export const getMyCoupons = () => async dispatch => {
  dispatch({ type: constants.GET_MY_COUPONS_LOADING })
  const token = localStorage.getItem("token")
  axios
    .get(api.lk.coupons.getMyCoupons, {
      headers: { Authorization: token },
    })
    .then(({ data }) => {
      dispatch({
        type: constants.GET_MY_COUPONS_SUCCESS,
        payload: data.coupons,
      })
    })
    .catch(err => {
      dispatch({
        type: constants.GET_MY_COUPONS_FAILED,
        payload: err.response.data.message,
      })
      Store.addNotification({
        ...notifications.common,
        ...notifications.failed,
        message: err.response.data.message,
      })
    })
}
export const addCouponToMe = data => async dispatch => {
  dispatch({ type: constants.ADD_COUPON_TO_ME_LOADING })
  const token = localStorage.getItem("token")
  axios
    .post(api.lk.coupons.addToMe, data, {
      headers: { Authorization: token },
    })
    .then(({ data }) => {
      dispatch({
        type: constants.ADD_COUPON_TO_ME_SUCCESS,
        payload: data.message,
      })
      Store.addNotification({
        ...notifications.common,
        ...notifications.success,
        message: data.message,
      })
    })
    .then(() => {
      dispatch(getMyCoupons())
    })
    .catch(err => {
      dispatch({
        type: constants.ADD_COUPON_TO_ME_FAILED,
        payload: err.response.data.message,
      })
      Store.addNotification({
        ...notifications.common,
        ...notifications.failed,
        message: err.response.data.message,
      })
    })
}
