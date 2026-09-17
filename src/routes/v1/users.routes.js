const crypto = require('crypto');
const express = require('express');
const router = express.Router();
const { users, workouts } = require('../../data/mockData');

// GET /api/v1/users?search=Carlos&role=user&limit=2
router.get('/', (req, res) => {
  const { search, role, limit } = req.query;
  let result = users;

  if (role) {
    result = result.filter(u => u.role === role);
  }

  if (search) {
    result = result.filter(u =>
      u.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (limit) {
    result = result.slice(0, Number(limit));
  }

  res.status(200).json(result);
});

// GET /api/v1/users/:id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  res.status(200).json(user);
});

// GET /api/v1/users/:id/workouts (jerarquico)
router.get('/:id/workouts', (req, res) => {
  const { id } = req.params;
  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  const userWorkouts = workouts.filter(w => w.user_id === id);
  res.status(200).json(userWorkouts);
});

// GET /api/v1/users/:id/reports (jerarquico: informe de progreso)
router.get('/:id/reports', (req, res) => {
  const { id } = req.params;
  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  const userWorkouts = workouts.filter(w => w.user_id === id);
  const total = userWorkouts.length;
  const completed = userWorkouts.filter(w => w.status === 'completado').length;

  res.status(200).json({
    user_id: id,
    name: user.name,
    experience_level: user.experience_level,
    total_workouts: total,
    completed_workouts: completed,
    pending_workouts: total - completed,
    completion_rate: total ? Math.round((completed / total) * 100) : 0,
    generated_at: new Date().toISOString()
  });
});


// POST /api/v1/users
router.post('/', (req, res) => {
  const { name, email, experience_level, role } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'name y email son requeridos' });
  }

  const newUser = {
    id: crypto.randomUUID(),
    name,
    email,
    experience_level: experience_level || 'Principiante',
    role: role || 'user',
    created_at: new Date().toISOString()
  };

  users.push(newUser);

  res.status(201).json(newUser);
});

module.exports = router;
