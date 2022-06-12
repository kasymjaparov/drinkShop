import axios from "axios"
import { Store } from "react-notifications-component"
import "animate.css"
import api from "../../../api"
import constants from "../../constants"
import notifications from "../../../utils/notifications"

export const getAllTypes = () => async dispatch => {
  dispatch({ type: constants.GET_TYPES_LOADING })
  axios
    .get(api.admin.types.getAll)
    .then(({ data }) => {
      dispatch({ type: constants.GET_TYPES_SUCCESS, payload: data })
    })
    .catch(err => {
      dispatch({
        type: constants.GET_TYPES_FAILED,
        payload: err.response.data,
      })
      Store.addNotification({
        ...notifications.common,
        ...notifications.failed,
        message: err.response.data,
      })
    })
}

export const addType = type => async dispatch => {
  dispatch({ type: constants.ADD_TYPE_LOADING })
  const token = localStorage.getItem("token")
  axios
    .post(
      api.admin.types.add,
      { name: type },
      { headers: { Authorization: token } }
    )
    .then(({ data }) => {
      dispatch({ type: constants.ADD_TYPE_SUCCESS })
      Store.addNotification({
        ...notifications.common,
        ...notifications.success,
        message: data.message,
      })
    })
    .then(() => {
      dispatch(getAllTypes())
    })
    .catch(err => {
      dispatch({
        type: constants.ADD_TYPE_FAILED,
        payload: err.response.data,
      })
      Store.addNotification({
        ...notifications.common,
        ...notifications.failed,
        message: err.response.data,
      })
    })
}

export const deleteType = id => async dispatch => {
  dispatch({ type: constants.DELETE_TYPE_LOADING })
  const token = localStorage.getItem("token")
  axios
    .delete(`${api.admin.types.delete}/${id}`, {
      headers: { Authorization: token },
    })
    .then(({ data }) => {
      dispatch({ type: constants.DELETE_TYPE_SUCCESS })
      Store.addNotification({
        ...notifications.common,
        ...notifications.success,
        message: data.message,
      })
    })
    .then(() => {
      dispatch(getAllTypes())
    })
    .catch(err => {
      dispatch({
        type: constants.DELETE_TYPE_FAILED,
        payload: err.response.data.message,
      })
      Store.addNotification({
        ...notifications.common,
        ...notifications.failed,
        message: err.response.data.message,
      })
    })
}

export const editType =
  ({ id, name }) =>
  async dispatch => {
    dispatch({ type: constants.EDIT_TYPE_LOADING })
    const token = localStorage.getItem("token")
    axios
      .put(
        `${api.admin.types.edit}/${id}`,
        { name },
        {
          headers: { Authorization: token },
        }
      )
      .then(({ data }) => {
        dispatch({ type: constants.EDIT_TYPE_SUCCESS })
        Store.addNotification({
          ...notifications.common,
          ...notifications.success,
          message: data.message,
        })
      })
      .then(() => {
        dispatch(getAllTypes())
      })
      .catch(err => {
        dispatch({
          type: constants.EDIT_TYPE_FAILED,
          payload: err.response.data,
        })
        Store.addNotification({
          ...notifications.common,
          ...notifications.failed,
          message: err.response.data,
        })
      })
  }
