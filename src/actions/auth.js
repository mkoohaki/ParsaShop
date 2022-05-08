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
