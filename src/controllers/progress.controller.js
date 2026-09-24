// Estado en memoria (simulación)
let progress = [
  {
    id: "1",
    sets: "3",
    weight: "20kg",
    repetitions: "7"
  }
];

// GET /api/v1/progress
const getProgress = ((req, res) => { 
  res.status(200).json(progress);
 })

 // GET /progress/:id
const getProgressId = ((req, res) => {
  const { id } = req.params;   // 1
  const findProgress = progress.find(u => u.id === id);   // 2

  if (!findProgress) {   // 3
    return res.status(404).json({ error: 'Progreso no encontrado' });
  }

  res.status(200).json(findProgress);   // 4
});

// POST /progress
const postProgress = ((req, res) => {
  const { sets, weight, repetitions } = req.body;   // 1

  if (!sets || !weight || !repetitions) {   // 2
    return res.status(400).json({ error: 'Sets, pesos y repeticiones son obligatorios.' });
  }

  const newProgress = {   // 3
    id: `${Date.now()}`,  // identificador temporal
    sets,
    weight,
    repetitions
  };

  progress.push(newProgress);   // 4

  res.status(201).json(newProgress);   // 5
});

// PUT /progress/:id
const putProgress = ((req, res) => {
  const { id } = req.params;              // 1
  const { sets, weight, repetitions } = req.body; // 2

  const index = progress.findIndex(u => u.id === id); // 3
  if (index === -1) {                     // 4
    return res.status(404).json({ error: 'Progreso no encontrado' });
  }

 if (!sets || !weight || !repetitions) {   // 5
    return res.status(400).json({ error: 'Sets, pesos y repeticiones.' });
  }

  progress[index] = {                        // 6
    ...progress[index], // conserva los datos previos
    sets,
    weight,
    repetitions
  };

  res.status(200).json(progress[index]);     // 7
});

// PATCH /progress/:id
const patchProgress = ((req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const index = progress.findIndex(u => u.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Progreso no encontrado' });
  }

  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ error: 'Debe proporcionar al menos un campo para actualizar' });
  }

  progress[index] = {
    ...progress[index],
    ...updates
  };

  res.status(200).json(progress[index]);
});

// DELETE /progress/:id
const deleteProgress = ((req, res) => {
  const { id } = req.params;                            // 1
  const index = progress.findIndex(u => u.id === id);      // 2

  if (index === -1) {                                   // 3
    return res.status(404).json({ error: 'Progreso no encontrado' });
  }

  const deletedProgress = progress.splice(index, 1);           // 4
  res.status(200).json({ deleted: deletedProgress [0].id }); // 5
});

module.exports = {
    getProgress,
    getProgressId,
    postProgress,
    putProgress,
    patchProgress,
    deleteProgress
}