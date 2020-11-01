import {
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_SUCCESS,
  STOP_LOADING_UI
} from "../types";

const initialState = {
  loading: false,
  success: false,
  errors: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_ERRORS:
      return {
        ...state,
        loading: false,
        success: false,
        errors: action.payload
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        success: false,
        errors: {}
      };
    case LOADING_UI:
      return {
        ...state,
        loading: true
      };
    case SET_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        errors: {}
      };
    case STOP_LOADING_UI:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
}
