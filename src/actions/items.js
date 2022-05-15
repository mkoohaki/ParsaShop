import api from '../utils/api';
import { ITEMS_RETRIEVAL_SUCCESS, ITEMS_RETRIEVAL_ERROR } from './types';

// export const deleteItem = (id) => async (dispatch) => {
//   try {
//     const res = api.delete('http://localhost:5000/api/items/' + id);
//   } catch (error) {
//     console.log(error.message);
//   }
// };

export const getItems = (id) => async (dispatch) => {
  try {
    const res = await api.get('/items');

    dispatch({
      type: ITEMS_RETRIEVAL_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: ITEMS_RETRIEVAL_ERROR,
    });
  }
};
