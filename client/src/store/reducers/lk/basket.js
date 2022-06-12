import constants from "../../constants"

const initialState = {
  get: {
    success: false,
    loading: false,
    failed: false,
    message: "",
    drinks: [],
  },
  add: {
    success: false,
    loading: false,
    failed: false,
    message: "",
  },
  delete: {
    success: false,
    loading: false,
    failed: false,
    message: "",
  },
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.GET_DRINKS_BASKET_FAILED:
      return {
        ...state,
        get: {
          success: false,
          loading: false,
          failed: true,
          drinks: [],
          message: action.payload,
        },
      }
    case constants.GET_DRINKS_BASKET_LOADING:
      return {
        ...state,
        get: {
          success: false,
          loading: true,
          failed: false,
          drinks: [],
          message: "Загрузка...",
        },
      }
    case constants.GET_DRINKS_BASKET_SUCCESS:
      return {
        ...state,
        get: {
          success: true,
          loading: false,
          failed: false,
          drinks: action.payload,
        },
      }
    case constants.ADD_DRINK_TO_ME_FAILED:
      return {
        ...state,
        add: {
          success: false,
          loading: false,
          failed: true,
          message: action.payload,
        },
      }
    case constants.ADD_DRINK_TO_ME_LOADING:
      return {
        ...state,
        add: {
          success: false,
          loading: true,
          failed: false,
          message: "Загрузка...",
        },
      }
    case constants.ADD_DRINK_TO_ME_SUCCESS:
      return {
        ...state,
        add: {
          success: true,
          loading: false,
          failed: false,
          message: action.payload,
        },
      }

      case constants.DELETE_DRINK_BASKET_FAILED:
        return {
          ...state,
          delete: {
            success: false,
            loading: false,
            failed: true,
            message: action.payload,
          },
        }
      case constants.DELETE_DRINK_BASKET_LOADING:
        return {
          ...state,
          delete: {
            success: false,
            loading: true,
            failed: false,
            message: "Загрузка...",
          },
        }
      case constants.DELETE_DRINK_BASKET_SUCCESS:
        return {
          ...state,
          delete: {
            success: true,
            loading: false,
            failed: false,
            message: action.payload,
          },
        }
    default:
      return state
  }
}

export default reducer
