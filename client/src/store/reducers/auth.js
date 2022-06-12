import constants from "../constants"

const initialState = {
  login: {
    success: false,
    loading: false,
    failed: false,
    message: "",
    token: "",
    role: "",
  },
  registration: {
    success: false,
    loading: true,
    failed: false,
  },
  getRole: {
    success: false,
    loading: false,
    failed: false,
    message: "",
  },
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.LOGIN_FAILED:
      return {
        ...state,
        login: {
          success: false,
          loading: false,
          failed: true,
          message: action.payload,
          token: "",
          role: "",
        },
      }
    case constants.LOGIN_LOADING:
      return {
        ...state,
        login: {
          success: false,
          loading: true,
          failed: false,
          message: "Загрузка...",
          token: "",
          role: "",
        },
      }
    case constants.LOGIN_SUCCESS:
      return {
        ...state,
        login: {
          success: true,
          loading: false,
          failed: false,
          message: action.payload.message,
          token: action.payload.token,
          role: action.payload.role,
        },
        registration: {
          success: false,
          loading: false,
          failed: false,
        },
      }
    case constants.REGISTRATION_LOADING:
      return {
        ...state,
        registration: {
          success: false,
          loading: true,
          failed: false,
        },
      }
    case constants.REGISTRATION_SUCCESS:
      return {
        ...state,
        registration: {
          success: true,
          loading: false,
          failed: false,
        },
      }
    case constants.REGISTRATION_FAILED:
      return {
        ...state,
        registration: {
          success: false,
          loading: false,
          failed: true,
        },
      }

    case constants.GET_ROLE_FAILED:
      return {
        ...state,
        getRole: {
          success: false,
          loading: false,
          failed: true,
          message: action.payload,
        },
      }
    case constants.GET_ROLE_LOADING:
      return {
        ...state,
        getRole: {
          success: false,
          loading: true,
          failed: false,
          message: "Загрузка...",
        },
      }
    case constants.GET_ROLE_SUCCESS:
      return {
        ...state,
        getRole: {
          success: true,
          loading: false,
          failed: false,
          message: "Вы успешно получили роль",
        },
        login: {
          success: false,
          loading: false,
          failed: false,
          message: "",
          token: "",
          role: action.payload,
        },
      }
    default:
      return state
  }
}

export default reducer
