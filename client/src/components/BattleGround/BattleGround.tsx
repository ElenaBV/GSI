import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  TextField,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import style from './battle.module.css';

let interval;

const GameBoard = () => {
  const [themes, setThemes] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const [answeredQuestionsCount, setAnsweredQuestionsCount] = useState(0);
  const [open, setOpen] = React.useState(true);
  const [count, setCount] = useState(30);
  const intervalRef = useRef();
  const timerRef = useRef();

  const [disabledQuestion, setDisabledQuestion] = useState([]);
  const dispatch = useDispatch();
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (count === 0) {
      clearInterval(intervalRef.current);
      setCount((prev) => prev + 30);
      setIsAnswerSubmitted(true);
      timerRef.current.style.display = 'none';
      setTimeout(() => {
        setShowModal(false);
      }, 3000);
    }
  }, [count]);

  useEffect(() => {
    axios
      .get('http://localhost:3000/game/themes')
      .then((response) => {
        setThemes(response.data);
      })
      .catch((error) => {
        console.error('Произошла ошибка при получении списка тем:', error);
      });
    axios
      .get('http://localhost:3000/game/questions')
      .then((response) => {
        setDisabledQuestion(response.data);
        setQuestions(response.data);
      })
      .catch((error) => {
        console.error('Произошла ошибка при получении списка вопросов:', error);
      });
  }, []);

  const handleThemeSelect = (theme) => {
    setSelectedTheme(theme);
  };

  const handleQuestSelect = (elem, e) => {
    setSelectedQuestion(elem);
    setShowModal(true);
    setActiveQuestion(elem);
    setUserAnswer('');
    setIsAnswerSubmitted(false);
    setIsAnswerCorrect(false);
    setDisabledQuestion(
      disabledQuestion.filter((el) => el.quest !== elem.quest)
    );
    e.target.parentElement.style.background = '#f2de6e';
    intervalRef.current = setInterval(() => {
      setCount((count) => count - 1);
    }, 1000);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setIsAnswerSubmitted(true);
    console.log('++handleCloseModal++',isAnswerSubmitted);
    
  };

  const handleUserAnswerChange = (event) => {
    setUserAnswer(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAnswerSubmit = (elem) => {
    console.log(elem);
    console.log(isAnswerSubmitted);
    setIsAnswerSubmitted(true);
    setOpen(true);
    console.log('****handleAnswerSubmit*****',isAnswerSubmitted);
    // clearTimeout(timerId);
    if (userAnswer.toLowerCase() === activeQuestion.answer.toLowerCase()) {
      setIsAnswerCorrect(true);
      setScore(score + elem.price);
      dispatch({ type: 'score', payload: score + elem.price });
      // clearTimeout(timerId);
    } else {
      setIsAnswerCorrect(false);
      setScore(score - elem.price);
      dispatch({ type: 'score', payload: score - elem.price });
    }
    
    setAnsweredQuestionsCount(answeredQuestionsCount + 1);
    clearInterval(intervalRef.current);
    timerRef.current.style.display = 'none';
    setCount((prev) => prev - prev + 30);
    
  };

  const handleStartGame = async () => {
    try {
      await axios.post(
        'http://localhost:3000/start',
        {
          score: score,
        },
        {
          withCredentials: true,
        }
      );
      console.log(score);
    } catch (error) {
      // Обработка ошибки
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100vh',
        background: 'url("./public/igra.png") center center / cover no-repeat',
      }}
    >
      <Card
        style={{
          width: '90%',
          padding: '20px',
          marginTop: '20px',
          overflow: 'auto',
          background: 'rgba(0, 8, 152, 1.00)',
        }}
      >
        <div>
          {answeredQuestionsCount >= 0 && (
            <Button
              onClick={handleStartGame}
              component={Link}
              to="/profile"
              variant="contained"
              color="primary"
            >
              Завершить игру
            </Button>
          )}
        </div>
        <h1
          style={{ textAlign: 'center', marginBottom: '20px', color: '#ffff' }}
        >
          Своя игра
        </h1>
        <CardContent>
          <table style={{ width: '100%' }}>
            <tbody>
              {themes.map((theme) => (
                <tr
                  key={theme.id}
                  style={{ backgroundColor: '#000565', borderRadius: '10px' }}
                >
                  <td
                    style={{
                      textAlign: 'left',
                      color: '#f2de6e',
                      fontSize: '20px',
                      padding: '10px',
                      cursor: 'pointer',
                      borderBottom: '1px solid #ddd',
                    }}
                    onClick={() => handleThemeSelect(theme)}
                  >
                    {theme.category}
                  </td>
                  <td
                    style={{
                      display: 'flex',
                      justifyContent: 'space-evenly',
                      whiteSpace: 'normal',
                    }}
                  >
                    {questions
                      .filter((el) => el.categoryId === theme.id)
                      .map((elem) => (
                        <Card
                          className="question-card"
                          key={elem.id}
                          style={{
                            background: '#000673',
                            minWidth: '200px',
                            height: '80px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '2px solid #f2de6e',
                            margin: '5px',
                            whiteSpace: 'normal',
                          }}
                        >
                          <Button
                            onClick={(e) => handleQuestSelect(elem, e)}
                            disabled={!disabledQuestion.includes(elem)}
                            style={{ color: '#f2de6e', fontSize: '20px' }}
                          >
                            {elem.price}
                          </Button>
                          <Dialog
                            open={showModal && activeQuestion === elem}
                            onClose={handleCloseModal}
                          >
                            <div
                              className={style.module}
                              style={{
                                padding: '70px',
                                background: '#f2de6e',
                                color: 'rgba(0, 8, 152, 1.00)',
                                fontSize: '20px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '20px',
                                fontWeight: 'bolder',
                              }}
                            >
                              <Typography className={style.qText}>
                                {elem.quest}
                              </Typography>
                              <div className="time" ref={timerRef}>
                                {count} секунд
                                {isAnswerSubmitted && elem.id === 25 && (
                                  <Dialog
                                  style={{ maxWidth: '100%' }}
                                  className={style.vidos}
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                  >
                                    <DialogContent style={{ width: '90%' }}>
                                      <img src="/oleg.JPG" alt="Oleg" />
                                    </DialogContent>
                                    <DialogActions>
                                      <Button onClick={handleClose}>
                                        Закрыть
                                      </Button>
                                      <Button onClick={handleClose} autoFocus>
                                        Смириться
                                      </Button>
                                    </DialogActions>
                                  </Dialog>
                                )}
                                {isAnswerSubmitted && elem.id === 21 && (
                                  <Dialog
                                  style={{ maxWidth: '100%' }}
                                  className={style.vidos}
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                  >
                                    <DialogContent style={{ width: '90%' }}>
                                      <video
                                        autoPlay
                                        loop
                                        poster="https://assets.codepen.io/6093409/river.jpg"
                                        className={style.vidos}
                                      >
                                        <source src="/33.mp4" type="video/mp4" />
                                      </video>
                                    </DialogContent>
                                    <DialogActions>
                                      <Button onClick={handleClose}>
                                        Закрыть
                                      </Button>
                                      <Button onClick={handleClose} autoFocus>
                                        Смириться
                                      </Button>
                                    </DialogActions>
                                  </Dialog>
                                )}
                                {isAnswerSubmitted && elem.id === 22 && (
                                  <Dialog
                                  style={{ maxWidth: '100%' }}
                                  className={style.vidos}
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                  >
                                    <DialogContent style={{ width: '90%' }}>
                                      <video
                                        autoPlay
                                        loop
                                        poster="https://assets.codepen.io/6093409/river.jpg"
                                        className={style.vidos}
                                      >
                                        <source src="/OlegDance.mp4" type="video/mp4" />
                                      </video>
                                    </DialogContent>
                                    <DialogActions>
                                      <Button onClick={handleClose}>
                                        Закрыть
                                      </Button>
                                      <Button onClick={handleClose} autoFocus>
                                        Смириться
                                      </Button>
                                    </DialogActions>
                                  </Dialog>
                                )}
                                {isAnswerSubmitted && elem.id === 23 && (
                                  <Dialog
                                  style={{ maxWidth: '100%' }}
                                  className={style.vidos}
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                  >
                                    <DialogContent style={{ width: '90%' }}>
                                      <video
                                        autoPlay
                                        loop
                                        poster="https://assets.codepen.io/6093409/river.jpg"
                                        className={style.vidos}
                                      >
                                        <source src="/1.mp4" type="video/mp4" />
                                      </video>
                                    </DialogContent>
                                    <DialogActions>
                                      <Button onClick={handleClose}>
                                        Закрыть
                                      </Button>
                                      <Button onClick={handleClose} autoFocus>
                                        Смириться
                                      </Button>
                                    </DialogActions>
                                  </Dialog>
                                )}
                                {isAnswerSubmitted && elem.id === 24 && (
                                  <Dialog
                                  style={{ maxWidth: '100%' }}
                                  className={style.vidos}
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                  >
                                    <DialogContent style={{ width: '90%' }}>
                                      <video
                                        autoPlay
                                        loop
                                        poster="https://assets.codepen.io/6093409/river.jpg"
                                        className={style.vidos}
                                      >
                                        <source src="/11.mp4" type="video/mp4" />
                                      </video>
                                    </DialogContent>
                                    <DialogActions>
                                      <Button onClick={handleClose}>
                                        Закрыть
                                      </Button>
                                      <Button onClick={handleClose} autoFocus>
                                        Смириться
                                      </Button>
                                    </DialogActions>
                                  </Dialog>
                                )}
                              </div>
                              {isAnswerSubmitted ? (
                                isAnswerCorrect ? (
                                  <Typography
                                    variant="h6"
                                    style={{ color: 'green' }}
                                  >
                                    Правильно!
                                  </Typography>
                                ) : (
                                  <Typography
                                    variant="h6"
                                    style={{ color: 'red' }}
                                  >
                                    Неправильно, правильный ответ:{' '}
                                    {activeQuestion.answer}
                                  </Typography>
                                )
                              ) : (
                                <TextField
                                  label="Ответ"
                                  value={userAnswer}
                                  onChange={handleUserAnswerChange}
                                />
                              )}
                              {!isAnswerSubmitted && (
                                <Button
                                  variant="contained"
                                  color="primary"
                                  onClick={() => handleAnswerSubmit(elem)}
                                >
                                  Подтвердить ответ
                                </Button>
                              )}
                            </div>
                          </Dialog>
                        </Card>
                      ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
      {/* <div style={{ marginTop: '20px' }}>
        {answeredQuestionsCount >= 1 && (
          <Button onClick={handleStartGame} component={Link} to="/profile" variant="contained" color="primary">
            Завершить игру
          </Button>
        )}
      </div> */}
    </div>
  );
};

export default GameBoard;
