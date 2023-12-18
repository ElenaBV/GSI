import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import style from "./LoginForm.module.css"
import { Button } from "@mui/material";

const LoginForm: React.FC = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    login: "",
    password: "",
    email: "",
  });
const navigate = useNavigate();
  // const navigate = useNavigate()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch("http://localhost:3000/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((result) => {
        if (result.ok) {
          navigate('/game');
          return result.json();
        } else {
          throw new Error("Ошибка аутентификации");
        }
      })
      .then((res) => {
        console.log(res.user);
        localStorage.setItem("token", res.token);
        dispatch({ type: "Login", payload: res.user });
      })
      .catch((error) => {
        console.error("Ошибка при входе:", error);
      });
  };

  return (
    <div className={style.content}>
      <form onSubmit={handleSubmit} className={style.form}>
        <div>
          <input
            type="text"
            name="login"
            value={formData.login}
            onChange={handleChange}
            placeholder="ИМЯ"
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="ПАРОЛЬ"
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="EMAIL"
          />
        </div>
        <Button type="submit"  variant="outlined" size="medium">
        Войти
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
