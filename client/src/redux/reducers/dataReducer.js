import {
  LOADING_DATA,
  SET_SCREAMS,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  DELETE_SCREAM,
  POST_SCREAM,
  SET_SCREAM,
  SUBMIT_COMMENT
} from "../types";

const initialState = {
  screams: [],
  scream: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      };
    case SET_SCREAMS:
      return {
        ...state,
        screams: action.payload,
        loading: false
      };
    case LIKE_SCREAM:
    case UNLIKE_SCREAM:
      const newScream = action.payload;
      return {
        ...state,
        screams: state.screams.map(scream =>
          scream.screamId === newScream.screamId
            ? { ...scream, ...newScream }
            : scream
        ),
        scream: { ...state.scream, ...newScream }
      };
    case DELETE_SCREAM:
      return {
        ...state,
        screams: state.screams.filter(
          scream => scream.screamId !== action.payload
        )
      };
    case POST_SCREAM:
      return {
        ...state,
        screams: [action.payload, ...state.screams]
      };
    case SET_SCREAM:
      return {
        ...state,
        scream: action.payload
      };
    case SUBMIT_COMMENT:
      let oldComments = Array.isArray(state.scream.comments)
        ? state.scream.comments
        : [];
      return {
        ...state,
        screams: state.screams.map(scream =>
          scream.screamId === action.payload.screamId
            ? { ...scream, commentCount: oldComments.length + 1 }
            : scream
        ),
        scream: {
          ...state.scream,
          comments: [action.payload, ...oldComments],
          commentCount: oldComments.length + 1
        }
      };
    default:
      return state;
  }
}
