import React from "react";
import { Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import style from "./Rules.module.css";

const Rules: React.FC = () => {
  const navigate = useNavigate();

  const navigateHandler = (): void => {
    navigate(`/game`);
  };

  return (
    <div className={style.rules}>
      <Typography className={style.h4} variant="h4">ОБ ИГРЕ</Typography>
      <Typography className={style.bodytext} variant="body1">
      'Своя игра' — это интеллектуальная игра, предназначенная для проверки умственных способностей  участников. В ходе игры участники отвечают на вопросы из различных областей знаний. 
        <ul className={style.ul} >
        <li> Игрок выбирает вопрос, за правильные ответы прибавляются баллы, за неправильные - отнимаюся. </li>
        <li> На ответ игроку дается 30 секунд, по истечению которых, ответ будет засчитан как неверный </li>
          <li> Цель игры - набрать максимальное количество очков 
        </li>
        
        </ul>
        
      </Typography>
      <Button type="submit"  variant="outlined" size="medium" onClick={navigateHandler}> Начать игру</Button>
    </div>
  );
};

export default Rules;
