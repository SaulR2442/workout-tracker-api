const express = require('express');
const router = express.Router();
const { exercises } = require('../../data/mockData');

// GET /api/v1/exercises?muscle_group=Piernas&category=Fuerza
router.get('/', (req, res) => {
  const { muscle_group, category } = req.query;
  let result = exercises;

  if (muscle_group) {
    result = result.filter(e =>
      e.muscle_group.toLowerCase() === muscle_group.toLowerCase()
    );
  }

  if (category) {
    result = result.filter(e => e.category === category);
  }

  res.status(200).json(result);
});

// GET /api/v1/exercises/:id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const exercise = exercises.find(e => e.id === Number(id));

  if (!exercise) {
    return res.status(404).json({ error: 'Ejercicio no encontrado' });
  }

  res.status(200).json(exercise);
});

module.exports = router;
