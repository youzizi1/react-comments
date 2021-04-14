import { INIT_COMMENTS, ADD_COMMENT, DELETE_COMMENT } from "./action-types";

export const reducer = (state, action) => {
  if (!state) {
    state = {
      comments: [],
    };
  }

  switch (action.type) {
    case INIT_COMMENTS:
      return {
        ...state,
        comments: action.value,
      };
    case ADD_COMMENT:
      return {
        ...state,
        comments: [...state.comments, action.value],
      };
    case DELETE_COMMENT:
      return {
        ...state,
        comments: [
          ...state.comments.slice(0, action.value),
          ...state.comments.slice(action.value + 1),
        ],
      };
    default:
      return state
  }
};
