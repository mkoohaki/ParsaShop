import {
  ITEMS_RETRIEVAL_SUCCESS,
  ITEMS_RETRIEVAL_ERROR,
} from '../actions/types';

const initialState = {
  items: null,
  item: null,
  loading: true,
};

function itemsReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ITEMS_RETRIEVAL_SUCCESS:
      return {
        ...state,
        items: payload,
        loading: false,
      };
    case ITEMS_RETRIEVAL_ERROR:
      return {
        ...state,
        items: null,
        loading: false,
      };
    default:
      return state;
  }
}

export default itemsReducer;
