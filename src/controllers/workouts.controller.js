// Estado en memoria (simulación)
let workouts = [
  {
    id: "1",
    name: "Rutina superior",
    scheduled_date: "1:30 H",
    status: "Pendiente",
    comments: "..",
    created_at : "2025-09-12T12:00:00Z"
    
  }
];

// GET /api/v1/workouts
const getWorkouts = ((req, res) => { 
  res.status(200).json(workouts);
 })

 // GET /workouts/:id
const getWorkoutsId = ((req, res) => {
  const { id } = req.params;   // 1
  const workout = workouts.find(u => u.id === id);   // 2

  if (!workout) {   // 3
    return res.status(404).json({ error: 'Rutina no encontrado' });
  }

  res.status(200).json(workout);   // 4
});

// POST /workouts
const postWorkouts = ((req, res) => {
  const { name, scheduled_date, status, comments } = req.body;   // 1

  if (!name || !status) {   // 2
    return res.status(400).json({ error: 'El nombre y el status son requeridos' });
  }

  const newWorkouts = {   // 3
    id: `${Date.now()}`,  // identificador temporal
    name,
    scheduled_date,
    status,
    comments,
    createcreated_at: new Date().toISOString()
  };

  workouts.push(newWorkouts);   // 4

  res.status(201).json(newWorkouts);   // 5
});

// PUT /workouts/:id
const putWorkouts = ((req, res) => {
  const { id } = req.params;              // 1
  const { name, scheduled_date, status, comments } = req.body; // 2

  const index = workouts.findIndex(u => u.id === id); // 3
  if (index === -1) {                     // 4
    return res.status(404).json({ error: 'Entrenamiento no encontrado' });
  }

  if (!name || !status) {                  // 5
    return res.status(400).json({ error: 'El nombre y el status son requeridos' });
  }

  workouts[index] = {                        // 6
    ...workouts[index], // conserva los datos previos
    name,
    scheduled_date,
    status,
    comments
  };

  res.status(200).json(workouts[index]);     // 7
});

// DELETE /workouts/:id
const deleteWorkouts = ((req, res) => {
  const { id } = req.params;                            // 1
  const index = workouts.findIndex(u => u.id === id);      // 2

  if (index === -1) {                                   // 3
    return res.status(404).json({ error: 'Rutina no encontrado' });
  }

  const deletedworkouts = workouts.splice(index, 1);           // 4
  res.status(200).json({ deleted: deletedworkouts[0].id }); // 5
});

module.exports = {
    getWorkouts,
    getWorkoutsId,
    postWorkouts,
    putWorkouts,
    deleteWorkouts
}



