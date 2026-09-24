// Estado en memoria (simulación)
let exercises = [
  {
    id: "1",
    name: "Prees banca",    
    description: "Levamtamiento en vertical de pesos",
    category: "Fuerza",
    muscle_group: "Pecho",
    difficulty_level: "Dificil"
  },
  {
  id: "2",
  name: "Sentadilla con barra",
  description: "Flexión y extensión de rodillas soportando peso en la espalda",
  category: "Fuerza",
  muscle_group: "Piernas",
  difficulty_level: "Intermedio"
},
{
  id: "3",
  name: "Dominadas",
  description: "Tracción corporal colgado de una barra fijada en alto",
  category: "Calistenia",
  muscle_group: "Espalda",
  difficulty_level: "Dificil"
}
];

// GET /api/v1/exercises
const getExercises = ((req, res) => { 
  res.status(200).json(exercises);
 })

  // GET /exercises/:id
const getExercisesId = ((req, res) => {
  const { id } = req.params;   // 1
  const exercise = exercises.find(u => u.id === id);   // 2

  if (!exercise) {   // 3
    return res.status(404).json({ error: 'Ejercicio no encontrado' });
  }

  res.status(200).json(exercise);   // 4
});

// POST /exercises
const postExercises =  ((req, res) => {
  const { name, description, category, muscle_group, difficulty_level } = req.body;   // 1

  if (!name || !description || !category || !muscle_group || !difficulty_level) {   // 2
    return res.status(400).json({ error: 'Nombre, descripcion, categoria, grupo muscular, nivel de dificultad es obligatorio' });
  }

  const newExercises = {   // 3
    id: `${Date.now()}`,  // identificador temporal
    name,
    description,
    category,
    muscle_group,
    difficulty_level
  };

  exercises.push(newExercises);   // 4

  res.status(201).json(newExercises);   // 5
});

// PUT /exercises/:id
const putExercise = ((req, res) => {
  const { id } = req.params;              // 1
  const { name, description, category, muscle_group, difficulty_level } = req.body; // 2

  const index = exercises.findIndex(u => u.id === id); // 3
  if (index === -1) {                     // 4
    return res.status(404).json({ error: 'Ejercicio no encontrado' });
  }

 if (!name || !description || !category || !muscle_group || !difficulty_level) {   // 2
    return res.status(400).json({ error: 'Nombre, descripcion, categoria, grupo muscular, nivel de dificultad es obligatorio' });
  }

  exercises[index] = {                        // 6
    ...exercises[index], // conserva los datos previos
    name,
    description,
    category,
    muscle_group,
    difficulty_level
  };

  res.status(200).json(exercises[index]);     // 7
});

// PATCH /exercises/:id
const patchExercise = ((req, res) => {
  const { id } = req.params;
  const updates = req.body; // Campos opcionales enviados por el cliente

  // 1. Buscar si el ejercicio existe
  const index = exercises.findIndex(u => u.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Ejercicio no encontrado' });
  }

  // 2. Validar que al menos se envíe un campo para actualizar
  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ error: 'Debe proporcionar al menos un campo para actualizar' });
  }

  // 3. Sobrescribir únicamente los campos recibidos manteniendo el resto
  exercises[index] = {
    ...exercises[index],
    ...updates
  };

  // 4. Responder con el ejercicio actualizado
  res.status(200).json(exercises[index]);
});

// DELETE /exercises/:id
const deleteExercises = ((req, res) => {
  const { id } = req.params;                            // 1
  const index = exercises.findIndex(u => u.id === id);      // 2

  if (index === -1) {                                   // 3
    return res.status(404).json({ error: 'Ejercicio no encontrado' });
  }

  const deletedExercises = exercises.splice(index, 1);           // 4
  res.status(200).json({ deleted: deletedExercises[0].id }); // 5
});

module.exports = {
    getExercises,
    getExercisesId,
    postExercises,
    putExercise,
    patchExercise,
    deleteExercises
}
