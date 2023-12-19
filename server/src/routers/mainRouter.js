const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const session = require('express-session');

const router = express.Router();

const {
  User, Category, Game, Question,
} = require('../../db/models');

router.use(
  session({
    secret: 'mySecretKey',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  }),
);

router.post('/register', async (req, res) => {
  try {
    const { login, password, email } = req.body;
    console.log(req.body);
    const hash = await bcrypt.hash(password, 10);
    const user = await User.findOne({ where: { email } });
    if (user) {
      return res.status(401).json({ message: 'Такой пользователь существует' });
    }
    const newUser = await User.create({
      login,
      password: hash,
      email,
    });
    req.session.user = {
      id: newUser.id,
      email: newUser.email,
      login: newUser.login,
    };
    console.log(newUser);
    res
      .status(201)
      .json({ message: 'Пользователь успешно зарегистрирован', user: newUser });
  } catch (error) {
    res.status(500).json({
      message: 'Произошла ошибка при регистрации пользователя',
      error: error.message,
    });
  }
});

router.post('/login', async (req, res) => {
  const { password, email } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Неправильный email или пароль' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Неправильный email или пароль' });
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, 'secret', {
      expiresIn: '1h',
    });
    req.session.user = { id: user.id, email: user.email, login: user.login };
    res.status(200).json({
      token,
      user: { id: user.id, login: user.login, email: user.email },
    });
  } catch (error) {
    res.status(500).json({
      message: 'Произошла ошибка при попытке входа',
      error: error.message,
    });
  }
});

router.get('/logout', async (req, res) => {
  console.log(req.session);
  try {
    req.session.destroy();
    res.clearCookie('token');
    res.status(200).json({ message: 'Пользователь успешно разлогинен' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Произошла ошибка при выходе', error: error.message });
  }
});

router.get('/profile', async (req, res) => {
  try {
    const { email } = req.query;
    const user = await User.findOne({ where: { email } });
    console.log('req.query req.query', req.query);
    const userGames = await Game.findAndCountAll({
      where: { userId: user.id },
    });
    console.log('userGamesuserGamesuserGames', userGames);

    const totalGames = userGames.count;
    const totalPoints = userGames.rows.reduce(
      (acc, game) => acc + game.points,
      0,
    );

    const allGames = await Game.findAll({
      where: { userId: user.id },
    });
    const gamesData = allGames.map((game) => ({
      id: game.id,
      points: game.points,
      time: game.createdAt,
    }));
    // console.log(gamesData);
    res.json({ totalGames, totalPoints, gamesData });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Неизвестная ошибка', error: error.message });
  }
});

router.get('/auth/check', async (req, res) => {
  try {
    if (req.session.user) {
      const user = {
        login: req.session.user.login,
        // password: 0,
        email: req.session.user.email,
      };
      return res.json(user);
    }
    console.log('neok');
    return res.json(null);
  } catch (err) {
    console.log('Ошибка в check --->', err);
    return res.status(400).json({ error: 'Ошибка' });
  }
});

router.post('/start', async (req, res) => {
  try {
    const { score } = req.body;
    const newGame = await Game.create({
      userId: req.session.user.id,
      points: score,
    });
    console.log('newGame newGame', newGame);
    res.json({ game: newGame });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка создания игры' });
  }
});

// router.post('/notebooks', async (req, res) => {
//   try {
//     const { title, user_id } = req.body;
//     const newNotebook = await Notebook.create({
//       title,
//       user_id,
//     });
//     res
//       .status(201)
//       .json({ message: 'Блокнот успешно создан', notebook: newNotebook });
//   } catch (error) {
//     res.status(500).json({
//       message: 'Произошла ошибка при создании блокнота',
//       error: error.message,
//     });
//   }
// });

// router.get('/notebooks/:notebookId/notes', async (req, res) => {
//   const { notebook_id } = req.params;

//   try {
//     const notes = await Note.findAll({ where: { notebook_id } });

//     res.status(200).json({ notes });
//   } catch (error) {
//     res.status(500).json({
//       message: 'Произошла ошибка при получении заметок',
//       error: error.message,
//     });
//   }
// });

// router.post('/notebooks/:notebookId/notes', async (req, res) => {
//   const { notebook_id } = req.params;
//   const { title, content } = req.body;

//   try {
//     const newNote = await Note.create({
//       title,
//       content,
//       notebook_id,
//     });
//     res.status(201).json({ message: 'Заметка успешно создана', note: newNote });
//   } catch (error) {
//     res.status(500).json({
//       message: 'Произошла ошибка при создании заметки',
//       error: error.message,
//     });
//   }
// });

// router.put('/notebooks/:notebookId/notes/:noteId', async (req, res) => {
//   const { notebookId, noteId } = req.params;
//   const { title, content } = req.body;

//   try {
//     const updatedNote = await Note.findOne({
//       where: { id: noteId, notebook_id: notebookId },
//     });
//     if (!updatedNote) {
//       return res.status(404).json({ message: 'Заметка не найдена' });
//     }

//     updatedNote.title = title;
//     updatedNote.content = content;
//     await updatedNote.save();

//     res
//       .status(200)
//       .json({ message: 'Заметка успешно обновлена', note: updatedNote });
//   } catch (error) {
//     res.status(500).json({
//       message: 'Произошла ошибка при обновлении заметки',
//       error: error.message,
//     });
//   }
// });

// router.delete('/notebooks/:notebookId/notes/:noteId', async (req, res) => {
//   const { notebookId, noteId } = req.params;

//   try {
//     const deletedNote = await Note.findOne({
//       where: { id: noteId, notebook_id: notebookId },
//     });

//     if (!deletedNote) {
//       return res.status(404).json({ message: 'Заметка не найдена' });
//     }

//     await deletedNote.destroy();

//     res.status(200).json({ message: 'Заметка успешно удалена' });
//   } catch (error) {
//     res.status(500).json({
//       message: 'Произошла ошибка при удалении заметки',
//       error: error.message,
//     });
//   }
// });

// router.delete('/notebooks/:notebookId', async (req, res) => {
//   const { notebookId } = req.params;

//   try {
//     const deletedNotebook = await Notebook.findOne({
//       where: { id: notebookId },
//     });

//     if (!deletedNotebook) {
//       return res.status(404).json({ message: 'Блокнот не найден' });
//     }

//     await deletedNotebook.destroy();

//     res.status(200).json({ message: 'Блокнот успешно удален' });
//   } catch (error) {
//     res.status(500).json({
//       message: 'Произошла ошибка при удалении блокнота',
//       error: error.message,
//     });
//   }
// });

module.exports = router;
