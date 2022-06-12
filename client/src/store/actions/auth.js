import axios from "axios"
import { Store } from "react-notifications-component"
import "animate.css"
import api from "../../api"
import constants from "../constants"
import notifications from "../../utils/notifications"

export const login = (userdata, navigate) => dispatch => {
  dispatch({ type: constants.LOGIN_LOADING })
  axios
    .post(api.auth.login, userdata)
    .then(({ data }) => {
      window.localStorage.setItem("token", data.token)
      dispatch({ type: constants.LOGIN_SUCCESS, payload: data })
      if (data.role == "admin") {
        navigate("/admin")
      } else {
        navigate("/lk")
      }
    })
    .then(() => {
      Store.addNotification({
        ...notifications.common,
        ...notifications.login,
        ...notifications.success,
      })
    })
    .catch(err => {
      dispatch({
        type: constants.LOGIN_FAILED,
        payload: err.response.data,
      })
      Store.addNotification({
        ...notifications.common,
        ...notifications.failed,
        message: err.response.data,
      })
    })
}

export const registration = userdata => dispatch => {
  dispatch({ type: constants.REGISTRATION_LOADING })
  axios
    .post(api.auth.registration, userdata)
    .then(({ data }) => {
      dispatch({ type: constants.REGISTRATION_SUCCESS })
    })
    .then(() => {
      Store.addNotification({
        ...notifications.common,
        ...notifications.registration,
        ...notifications.success,
      })
    })
    .catch(err => {
      dispatch({
        type: constants.REGISTRATION_FAILED,
        payload: err.response.data.message,
      })
      Store.addNotification({
        ...notifications.common,
        ...notifications.failed,
        message: err.response.data.message,
      })
    })
}

export const getRole = () => dispatch => {
  dispatch({ type: constants.GET_ROLE_LOADING })
  const token = localStorage.getItem("token")
  axios
    .get(api.auth.getRole, { headers: { Authorization: token } })
    .then(({ data }) => {
      dispatch({ type: constants.GET_ROLE_SUCCESS, payload: data.role })
    })
    .catch(err => {
      dispatch({
        type: constants.GET_ROLE_FAILED,
        payload: err.response.data,
      })
    })
}
