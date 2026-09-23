const express = require('express');
const router = express.Router();


//Importar rutas especificas
const usersRoutes = require('./users.routes');
const exercisesRoutes = require('./exercises.routes');
const progressRoutes = require('./progress.routes');
const workoutsRoutes = require('./workouts.routes');

router.use('/users', usersRoutes)
router.use('/exercises', exercisesRoutes)
router.use('/progress', progressRoutes)
router.use('/workouts', workoutsRoutes)

module.exports = router;
