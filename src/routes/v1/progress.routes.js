const express = require('express');
const router = express.Router();
const { users, exercises, workouts, workout_exercises } = require('../../data/mockData');

// GET /api/v1/users/:id/progress
router.get('/:id/progress', (req, res) => {
  const { id } = req.params;
  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  const userWorkouts = workouts.filter(w => w.user_id === id);
  const progress = [];

  userWorkouts.forEach(workout => {
    const workoutExercises = workout_exercises.filter(we => we.workout_id === workout.id);

    workoutExercises.forEach(we => {
      const exercise = exercises.find(e => e.id === we.exercise_id);
      if (exercise) {
        progress.push({
          workout_id: workout.id,
          workout_name: workout.name,
          exercise_id: exercise.id,
          exercise_name: exercise.name,
          weight: exercise.weight,
          reps: exercise.reps,
          sets: we.sets,
          repetitions: we.repetitions,
        });
      }
    });
  });

  res.status(200).json({
    user_id: id,
    name: user.name,
    progress: progress.length > 0 ? progress : [],
    generated_at: new Date().toISOString()
  });
});

module.exports = router;