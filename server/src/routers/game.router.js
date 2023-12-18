const express = require('express');

const router = express.Router();
const { Category, Question } = require('../../db/models');

router.get('/themes', async (req, res) => {
  try {
    const findAllTheme = await Category.findAll({ raw: true });
    console.log(findAllTheme);
    res.json(findAllTheme);
  } catch (error) {
    console.log(error);
  }
});

router.get('/questions', async (req, res) => {
  try {
    const findAllQuestion = await Question.findAll({ raw: true });
    console.log(findAllQuestion)
    res.json(findAllQuestion);
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
