import {
  API_LOADING_START,
  API_LOADING_SUCCESS,
  API_LOADING_FAILED,
  API_GET_PRODUCTDB,
  NULLIFY_ERROR,
} from '../type';

const INITIAL_STATE = {
  productdb: [],
  productSelected: null,
  isLoading: false,
  error: null,
};

export const productReducer = (state = INITIAL_STATE, action) => {
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
        error: action.payload,
        isLoading: false,
      };
    case API_GET_PRODUCTDB:
      return {
        ...state,
        productdb: action.payload,
      };
    case NULLIFY_ERROR:
      return {
        ...state,
        error: '',
      };
    case 'GET_PRODUCT_SELECTED':
      return {
        ...state,
        productSelected: action.payload,
      };
    case 'DELETE_PRODUCT_SELECTED':
      return {
        ...state,
        productSelected: action.payload,
      };
    default:
      return state;
  }
};
