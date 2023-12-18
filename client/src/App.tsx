import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom'
import LoginForm from './components/LoginForm/LoginForm';
import RegisterForm from './components/RegisterForm/RegisterForm';
import ProfilePage from './components/ProfilePage/ProfilePage';
import GameBoard from './components/BattleGround/BattleGround';

import './App.css'
import Navbar from './components/Navbar/Navbar'

import { useSelector } from 'react-redux';
import { userReducer } from './store/reducers/userReducer';
import { RootState } from './store/store';



import { useDispatch } from 'react-redux';
import Rules from './components/Rules/Rules';



function App() {
  const dispatch = useDispatch();
  const user = useSelector((state:RootState)=>state.userReducer.user)
  
  const HomePage = () => {
    return user?.email ? <Rules /> : <><RegisterForm /></>;
};

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/auth/check`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });
        if (response.ok) {
          const data = await response.json();
          dispatch({ type: 'Login', payload: data });
        } else {
          console.error('Ошибка получения данных с сервера');
        }
      } catch (error) {
        console.error('Произошла ошибка при получении данных:', error);
      }
    };
    
    fetchData();
  }, [dispatch]);
  
  return (
    <div className="App">
      <Navbar />
      <Routes>
  <Route path="/rules" element={<Rules />} />
  <Route path="/profile" element={<ProfilePage/>} />
  <Route path="/game" element={<GameBoard/>} />
  <Route path="/reg" element={<RegisterForm/>} />
  <Route path="/log" element={<LoginForm/>} />
  <Route path="/" element={<HomePage />} />
  <Route path="/games" element={< GameBoard/>} />
</Routes>
    </div>
  );
}


export default App


// // Ваш код для обработки успешного входа пользователя и получения токена
// // ...

// // Сохранение токена в localStorage
// localStorage.setItem('token', полученный_токен);

// // Получение токена из localStorage
// const token = localStorage.getItem('token');

// // Отправка запроса с токеном в заголовке
// fetch('url/для/запроса', {
//   method: 'GET', // или другой метод
//   headers: {
//     'Authorization': `Bearer ${token}` // Добавление токена в заголовок
//   }
// })
// .then(response => response.json())
// .then(data => {
//   // обработка полученных данных
// })
// .catch(error => {
//   // обработка ошибок
// });