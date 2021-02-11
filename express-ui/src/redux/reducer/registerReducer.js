const INITIAL_STATE = {
  isValidUsername: false,
  isInvalidUsername: false,
  isValidEmail: false,
  isInvalidEmail: false,
  isValidPassword: false,
  isInvalidPassword: false,
  isValidCPassword: false,
  isInvalidCPassword: false,
};

export const registerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'IS_VALID_USERNAME':
      return {
        ...state,
        isValidUsername: action.payload,
      };
    case 'IS_INVALID_USERNAME':
      return {
        ...state,
        isInvalidUsername: action.payload,
      };
    case 'IS_VALID_EMAIL':
      return {
        ...state,
        isValidEmail: action.payload,
      };
    case 'IS_INVALID_EMAIL':
      return {
        ...state,
        isInvalidEmail: action.payload,
      };
    case 'IS_VALID_PASSWORD':
      return {
        ...state,
        isValidPassword: action.payload,
      };
    case 'IS_INVALID_PASSWORD':
      return {
        ...state,
        isInvalidPassword: action.payload,
      };
    case 'IS_VALID_CPASSWORD':
      return {
        ...state,
        isValidCPassword: action.payload,
      };
    case 'IS_INVALID_CPASSWORD':
      return {
        ...state,
        isInvalidCPassword: action.payload,
      };
    case 'NULLIFY_VALIDATION':
      return INITIAL_STATE;
    default:
      return state;
  }
};
