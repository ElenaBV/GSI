import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import style from "../LoginForm/LoginForm.module.css"
import { Button } from '@mui/material';

const RegisterForm: React.FC = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    login: '',
    password: '',
    email: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch('http://localhost:3000/register', {
      method: 'POST',
      credentials: 'include',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    })
      .then(async result => {
        return await result.json()
      })
      .then(data => dispatch({
        type: 'Login', payload: data.user
      }));
  };

  return (
    <div className={style.content}>
    <form className={style.form} onSubmit={handleSubmit} >
      <div >
        <input
          type="text"
          name="login"
          value={formData.login}
          onChange={handleChange}
          placeholder="ИМЯ"
          
        />
      </div>
      <div >
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="ПАРОЛЬ"
          
        />
      </div>
      <div >
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="EMAIL"
         
        />
      </div>
      <Button type="submit"  variant="outlined" size="medium">
      Зарегистрироваться
        </Button>
     
    </form>
    </div>
  );
};

export default RegisterForm;
