import {
  ITEMS_RETRIEVAL_SUCCESS,
  ITEMS_RETRIEVAL_ERROR,
} from '../actions/types';

const initialState = {
  items: null,
  item: null,
  totalPurchase: 0,
  totalSold: 0,
  loading: true,
};

function itemsReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ITEMS_RETRIEVAL_SUCCESS:
      return {
        ...state,
        items: payload,
        totalPurchased: payload.reduce((acc, item) => acc + item.buyPrice, 0),
        totalSold: payload.reduce((acc, item) => acc + item.soldPrice, 0),
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
