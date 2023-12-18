import React from 'react';
import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';

import style from "./Rules.module.css"

const Rules: React.FC = () => {

  return (
    <div className={style.rules}>
      <Typography variant="h4">ОБ ИГРЕ</Typography>
      <Typography className={style.bodytext} variant="body1">

      "Своя игра" представляет собой интеллектуальное телевизионное шоу, где участники соревнуются в ответах на вопросы различных категорий. Целью игры является набрать максимальное количество очков, отвечая правильно на вопросы. Игроки выбирают вопросы, за правильные ответы начисляются очки. Победителем становится тот, кто первым достигнет определенной отметки в очках или наберет максимальное количество к концу игры. Игра включает различные раунды, каждый из которых предлагает свои правила и условия, например, возможность удвоения очков или риска их потери. В конце игры победитель получает приз, который может быть денежной суммой или другими предметами.

      </Typography>
           
    </div>
  );
};

export default Rules;