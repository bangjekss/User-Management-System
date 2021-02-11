import {
  API_LOADING_START,
  API_LOADING_SUCCESS,
  API_LOADING_FAILED,
  API_REGIS_LOGIN,
  API_USER_LOGOUT,
  NULLIFY_ERROR,
} from '../type';

const INITIAL_STATE = {
  id: null,
  username: null,
  email: null,
  roleID: null,
  verified: null,
  isLoading: null,
  error: null,
  forgotPassword: null,
};

export const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case API_LOADING_START:
      return {
        ...state,
        isLoading: true,
      };
    case API_LOADING_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case API_LOADING_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case API_REGIS_LOGIN:
      return {
        ...state,
        ...action.payload,
      };
    case NULLIFY_ERROR:
      return {
        ...state,
        error: '',
      };
    case API_USER_LOGOUT:
      return INITIAL_STATE;
    case 'API_FORGOT_PASSWORD':
      return {
        ...state,
        forgotPassword: action.payload,
      };
    default:
      return state;
  }
};
