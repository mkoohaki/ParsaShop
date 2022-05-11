import api from '../utils/api';

// Register User
export const register = async (formData) => {
  try {
    const res = await api.post('/users', formData);
  } catch (error) {
    const errors = error.response.data.errors;
    console.log(errors);
  }
};

// Register User
export const login = async (formData) => {
  try {
    const res = await api.post('/auth', formData);
    const token = res.data;
    localStorage.setItem('token', token);
  } catch (error) {
    const errors = error.response.data.errors;
    console.log(errors);
  }
};
