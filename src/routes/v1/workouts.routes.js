const express = require('express');
const router = express.Router();

const {
   getWorkouts,
    getWorkoutsId,
    postWorkouts,
    putWorkouts,
    deleteWorkouts
} = require ('../../controllers/workouts.controller')

router.get('/', getWorkouts)

router.get('/id', getWorkoutsId)

router.post('/', postWorkouts)

router.put('/id', putWorkouts)

router.patch('/id', patchWorkouts)

router.delete('/id', deleteWorkouts)

module.exports = router;