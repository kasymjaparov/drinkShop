import axios from "axios"
import { Store } from "react-notifications-component"
import "animate.css"
import api from "../../../api"
import constants from "../../constants"
import notifications from "../../../utils/notifications"

export const getAllBrands = () => async dispatch => {
  dispatch({ type: constants.GET_BRANDS_LOADING })
  axios
    .get(api.admin.brands.getAll)
    .then(({ data }) => {
      dispatch({ type: constants.GET_BRANDS_SUCCESS, payload: data })
    })
    .catch(err => {
      dispatch({
        type: constants.GET_BRANDS_FAILED,
        payload: err.response.data,
      })
      Store.addNotification({
        ...notifications.common,
        ...notifications.failed,
        message: err.response.data,
      })
    })
}

export const addBrand = brand => async dispatch => {
  dispatch({ type: constants.ADD_BRAND_LOADING })
  const token = localStorage.getItem("token")
  axios
    .post(
      api.admin.brands.add,
      { name: brand },
      { headers: { Authorization: token } }
    )
    .then(({ data }) => {
      dispatch({ type: constants.ADD_BRAND_SUCCESS })
      Store.addNotification({
        ...notifications.common,
        ...notifications.success,
        message: data.message,
      })
    })
    .then(() => {
      dispatch(getAllBrands())
    })
    .catch(err => {
      dispatch({
        type: constants.ADD_BRAND_FAILED,
        payload: err.response.data,
      })
      Store.addNotification({
        ...notifications.common,
        ...notifications.failed,
        message: err.response.data,
      })
    })
}

export const deleteBrand = id => async dispatch => {
  dispatch({ type: constants.DELETE_BRAND_LOADING })
  const token = localStorage.getItem("token")
  axios
    .delete(`${api.admin.brands.delete}/${id}`, {
      headers: { Authorization: token },
    })
    .then(({ data }) => {
      dispatch({ type: constants.DELETE_BRAND_SUCCESS })
      Store.addNotification({
        ...notifications.common,
        ...notifications.success,
        message: data.message,
      })
    })
    .then(() => {
      dispatch(getAllBrands())
    })
    .catch(err => {
      dispatch({
        type: constants.DELETE_BRAND_FAILED,
        payload: err.response.data.message,
      })
      Store.addNotification({
        ...notifications.common,
        ...notifications.failed,
        message: err.response.data.message,
      })
    })
}

export const editBrand =
  ({ id, name }) =>
  async dispatch => {
    dispatch({ type: constants.EDIT_BRAND_LOADING })
    const token = localStorage.getItem("token")
    axios
      .put(
        `${api.admin.brands.edit}/${id}`,
        { name },
        {
          headers: { Authorization: token },
        }
      )
      .then(({ data }) => {
        dispatch({ type: constants.EDIT_BRAND_SUCCESS })
        Store.addNotification({
          ...notifications.common,
          ...notifications.success,
          message: data.message,
        })
      })
      .then(() => {
        dispatch(getAllBrands())
      })
      .catch(err => {
        dispatch({
          type: constants.EDIT_BRAND_FAILED,
          payload: err.response.data,
        })
        Store.addNotification({
          ...notifications.common,
          ...notifications.failed,
          message: err.response.data,
        })
      })
  }
