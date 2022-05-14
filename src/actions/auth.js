import api from "../utils/api";
import {
  REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGOUT,
  LOGIN_FAIL,
  REGISTER_FAIL,
} from "./types";

// Load User
export const loadUser = () => async (dispatch) => {
  // Prevents call if token does not exist
  if (localStorage.getItem("token")) {
    try {
      const res = await api.get("/auth");
      if (res) {
        dispatch({
          type: USER_LOADED,
          payload: res.data,
        });
      }
    } catch (error) {
      const errors = error.response.data.errors;
      dispatch({
        type: AUTH_ERROR,
      });
    }
  }
};

// Register User
export const register = (formData) => async (dispatch) => {
  try {
    const res = await api.post("/users", formData);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.errors;
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// User Login
export const login = (formData) => async (dispatch) => {
  try {
    const res = await api.post("/auth", formData);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.errors;
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Logout
export const logout = () => ({ type: LOGOUT });
