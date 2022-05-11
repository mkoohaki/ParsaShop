import { useState } from 'react';
import { Link } from 'react-router-dom';
import { login } from '../../../actions/auth';
import './login.css';

export const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div id='user'>
      <h3>Login</h3>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className='divs'>
          <label>Email</label>
          <input
            type='text'
            value={email}
            name='email'
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='divs'>
          <label>Password</label>
          <input
            type='password'
            value={password}
            name='password'
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div>
          <input className='button' type='submit' value='Login' />
        </div>
        <p>
          Don't have an account? <Link to='/register'>Register</Link>
        </p>
      </form>
    </div>
  );
};
