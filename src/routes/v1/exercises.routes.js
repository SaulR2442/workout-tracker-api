const express = require('express');
const router = express.Router();

const {
  getExercises,
  getExercisesId,
  postExercises,
  putExercise,
  patchExercise,
  deleteExercises
} = require ('../../controllers/exercises.controller')

router.get('/', getExercises)

router.get('/id', getExercisesId)

router.post('/', postExercises)

router.put('/id', putExercise)

router.patch('/id', patchExercise)

router.delete('/id', deleteExercises)

module.exports = router;
