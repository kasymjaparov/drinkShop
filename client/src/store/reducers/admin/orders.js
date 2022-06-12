import constants from "../../constants"

const initialState = {
  get: {
    success: false,
    loading: false,
    failed: false,
    message: "",
    orders: [],
  },
  excute: {
    success: false,
    loading: false,
    failed: false,
    message: "",
  },
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.GET_ORDERS_FAILED:
      return {
        ...state,
        get: {
          success: false,
          loading: false,
          failed: true,
          message: action.payload,
        },
      }
    case constants.GET_ORDERS_LOADING:
      return {
        ...state,
        get: {
          success: false,
          loading: true,
          failed: false,
          message: "Загрузка...",
        },
      }
    case constants.GET_ORDERS_SUCCESS:
      return {
        ...state,
        get: {
          success: true,
          loading: false,
          failed: false,
          orders: action.payload,
        },
      }


      case constants.EXECUTE_ORDER_FAILED:
        return {
          ...state,
          execute: {
            success: false,
            loading: false,
            failed: true,
            message: action.payload,
          },
        }
      case constants.EXECUTE_ORDER_LOADING:
        return {
          ...state,
          execute: {
            success: false,
            loading: true,
            failed: false,
            message: "Загрузка...",
          },
        }
      case constants.EXECUTE_ORDER_SUCCESS:
        return {
          ...state,
          execute: {
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
