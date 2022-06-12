import constants from "../../constants"

const initialState = {
  get: {
    success: false,
    loading: false,
    failed: false,
    message: "",
    types: [],
  },
  delete: {
    success: false,
    loading: false,
    failed: false,
    message: "",
  },
  edit: {
    success: false,
    loading: false,
    failed: false,
    message: "",
  },
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.GET_TYPES_FAILED:
      return {
        ...state,
        get: {
          success: false,
          loading: false,
          failed: true,
          message: action.payload,
        },
      }
    case constants.GET_TYPES_LOADING:
      return {
        ...state,
        get: {
          success: false,
          loading: true,
          failed: false,
          message: "Загрузка...",
        },
      }
    case constants.GET_TYPES_SUCCESS:
      return {
        ...state,
        get: {
          success: true,
          loading: false,
          failed: false,
          types: action.payload,
        },
      }
    case constants.DELETE_TYPE_FAILED:
      return {
        ...state,
        delete: {
          success: false,
          loading: false,
          failed: true,
          message: action.payload,
        },
      }
    case constants.DELETE_TYPE_LOADING:
      return {
        ...state,
        delete: {
          success: false,
          loading: true,
          failed: false,
          message: "Загрузка...",
        },
      }
    case constants.DELETE_TYPE_SUCCESS:
      return {
        ...state,
        delete: {
          success: true,
          loading: false,
          failed: false,
          message: "",
        },
      }

    case constants.EDIT_TYPE_FAILED:
      return {
        ...state,
        edit: {
          success: false,
          loading: false,
          failed: true,
          message: action.payload,
        },
      }
    case constants.EDIT_TYPE_LOADING:
      return {
        ...state,
        edit: {
          success: false,
          loading: true,
          failed: false,
          message: "Загрузка...",
        },
      }
    case constants.EDIT_TYPE_SUCCESS:
      return {
        ...state,
        edit: {
          success: true,
          loading: false,
          failed: false,
          message: "",
        },
      }
    default:
      return state
  }
}

export default reducer
