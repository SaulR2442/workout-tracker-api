const express = require('express');
const router = express.Router();

const {
  getExercises,
  getExercisesId,
  postExercises,
  putExercise,
  deleteExercises
} = require ('../../controllers/exercises.controller')

router.get('/', getExercises)

router.get('/id', getExercisesId)

router.post('/', postExercises)

router.put('/', putExercise)

router.delete('/', deleteExercises)

module.exports = router;
