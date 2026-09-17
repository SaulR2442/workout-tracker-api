const express = require('express');
const router = express.Router();
const { users, exercises, workouts, workout_exercises } = require('../../data/mockData');

// Constructor del detalle de un entrenamiento: ejercicios anidados + HATEOAS
function buildWorkoutDetail(workout) {
  const nested = workout_exercises
    .filter(we => we.workout_id === workout.id)
    .map(we => {
      const ex = exercises.find(e => e.id === we.exercise_id);
      return {
        workout_exercise_id: we.id,
        exercise_id: we.exercise_id,
        name: ex ? ex.name : 'Ejercicio desconocido',
        sets: we.sets,
        repetitions: we.repetitions,
        weight: we.weight
      };
    });

  return {
    id: workout.id,
    user_id: workout.user_id,
    name: workout.name,
    scheduled_date: workout.scheduled_date,
    status: workout.status,
    comments: workout.comments,
    created_at: workout.created_at,
    exercises: nested,
    _links: {
      self: { href: `/api/v1/workouts/${workout.id}`, method: 'GET' },
      user_owner: { href: `/api/v1/users/${workout.user_id}`, method: 'GET' },
      add_exercise: { href: `/api/v1/workouts/${workout.id}/exercises`, method: 'POST' },
      progress_reports: { href: `/api/v1/users/${workout.user_id}/reports`, method: 'GET' }
    }
  };
}

// GET /api/v1/workouts?status=pendiente&user_id=...&limit=10
router.get('/', (req, res) => {
  const { status, user_id, limit } = req.query;
  let result = workouts;

  if (user_id) {
    result = result.filter(w => w.user_id === user_id);
  }

  if (status) {
    result = result.filter(w => w.status === status);
  }

  if (limit) {
    result = result.slice(0, Number(limit));
  }

  res.status(200).json(result);
});

// GET /api/v1/workouts/:id
router.get('/:id', (req, res) => {
  const workout = workouts.find(w => w.id === Number(req.params.id));
  if (!workout) {
    return res.status(404).json({ error: 'Entrenamiento no encontrado' });
  }

  res.status(200).json(buildWorkoutDetail(workout));
});

// POST /api/v1/workouts
router.post('/', (req, res) => {
  const { user_id, name, scheduled_date, status, comments } = req.body;

  if (!user_id || !name) {
    return res.status(400).json({ error: 'user_id y name son requeridos' });
  }

  const user = users.find(u => u.id === user_id);
  if (!user) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  const nextId = Math.max(...workouts.map(w => w.id)) + 1;
  const newWorkout = {
    id: nextId,
    user_id,
    name,
    scheduled_date: scheduled_date || new Date().toISOString(),
    status: status || 'pendiente',
    comments: comments || '',
    created_at: new Date().toISOString()
  };

  workouts.push(newWorkout);
  res.status(201).json(buildWorkoutDetail(newWorkout));
});

// PUT /api/v1/workouts/:id (actualizacion completa de metadatos)
router.put('/:id', (req, res) => {
  const workout = workouts.find(w => w.id === Number(req.params.id));
  if (!workout) {
    return res.status(404).json({ error: 'Entrenamiento no encontrado' });
  }

  const { name, scheduled_date, status, comments } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'name es requerido' });
  }

  workout.name = name;
  workout.scheduled_date = scheduled_date || workout.scheduled_date;
  workout.status = status || workout.status;
  workout.comments = comments !== undefined ? comments : workout.comments;

  res.status(200).json(buildWorkoutDetail(workout));
});

// PATCH /api/v1/workouts/:id (actualizacion parcial)
router.patch('/:id', (req, res) => {
  const workout = workouts.find(w => w.id === Number(req.params.id));
  if (!workout) {
    return res.status(404).json({ error: 'Entrenamiento no encontrado' });
  }

  const { name, scheduled_date, status, comments } = req.body;

  if (name) workout.name = name;
  if (scheduled_date) workout.scheduled_date = scheduled_date;
  if (status) workout.status = status;
  if (comments !== undefined) workout.comments = comments;

  res.status(200).json(buildWorkoutDetail(workout));
});

// DELETE /api/v1/workouts/:id
router.delete('/:id', (req, res) => {
  const index = workouts.findIndex(w => w.id === Number(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: 'Entrenamiento no encontrado' });
  }

  const [removed] = workouts.splice(index, 1);

  // Limpieza de los ejercicios asociados al entrenamiento eliminado
  const removedIds = new Set(
    workout_exercises.filter(we => we.workout_id === removed.id).map(we => we.id)
  );
  for (let i = workout_exercises.length - 1; i >= 0; i--) {
    if (removedIds.has(workout_exercises[i].id)) {
      workout_exercises.splice(i, 1);
    }
  }

  res.status(204).send();
});

// POST /api/v1/workouts/:id/exercises (jerarquico)
router.post('/:id/exercises', (req, res) => {
  const workout = workouts.find(w => w.id === Number(req.params.id));
  if (!workout) {
    return res.status(404).json({ error: 'Entrenamiento no encontrado' });
  }

  const { exercise_id, sets, repetitions, weight } = req.body;
  if (!exercise_id || !sets || !repetitions) {
    return res.status(400).json({ error: 'exercise_id, sets y repetitions son requeridos' });
  }

  const exercise = exercises.find(e => e.id === Number(exercise_id));
  if (!exercise) {
    return res.status(404).json({ error: 'Ejercicio no encontrado en el catálogo' });
  }

  const nextId = Math.max(...workout_exercises.map(we => we.id), 0) + 1;
  const newWorkoutExercise = {
    id: nextId,
    workout_id: workout.id,
    exercise_id: Number(exercise_id),
    sets,
    repetitions,
    weight: weight !== undefined ? weight : 0
  };

  workout_exercises.push(newWorkoutExercise);

  res.status(201).json({
    workout_exercise_id: newWorkoutExercise.id,
    exercise_id: newWorkoutExercise.exercise_id,
    name: exercise.name,
    sets: newWorkoutExercise.sets,
    repetitions: newWorkoutExercise.repetitions,
    weight: newWorkoutExercise.weight
  });
});

module.exports = router;
