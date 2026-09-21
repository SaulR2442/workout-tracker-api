// Almacenamiento en memoria para simular base de datos sin persistencia real en disco.

let users = [
  {
    id: "e3b0c442-8c15-47b3-be41-000000000012",
    name: "Saúl Ramírez",
    email: "saul@example.com",
    experience_level: "Avanzado",
    role: "admin",
    created_at: "2026-09-10T08:30:00Z"
  },
  {
    id: "b42f53fa-7b30-4b91-8d36-dc1c6ef27611",
    name: "Carlos Navia",
    email: "carlos@example.com",
    experience_level: "Intermedio",
    role: "user",
    created_at: "2025-09-12T12:00:00Z"
  },
  {
    id: "a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d",
    name: "Ana Gómez",
    email: "ana@example.com",
    experience_level: "Principiante",
    role: "user",
    created_at: "2026-09-15T09:00:00Z"
  }
];

let exercises = [
  {
    id: 1,
    name: "Sentadilla libre",
    description: "Ejercicio compuesto para el desarrollo de la fuerza en el tren inferior (cuádriceps e isquiotibiales).",
    category: "Fuerza",
    muscle_group: "Piernas",
    difficulty_level: "Intermedio",
    weight: 100,
    reps: 5
  },
  {
    id: 2,
    name: "Press de Banca",
    description: "Ejercicio compuesto para pectoral, hombro anterior y tríceps.",
    category: "Fuerza",
    muscle_group: "Pecho",
    difficulty_level: "Medio",
    weight: 80,
    reps: 10
  },
  {
    id: 3,
    name: "Peso Muerto",
    description: "Ejercicio de fuerza multiarticular para la cadena posterior.",
    category: "Fuerza",
    muscle_group: "Espalda",
    difficulty_level: "Alto",
    weight: 120,
    reps: 5
  },
  {
    id: 4,
    name: "Carrera en Cinta",
    description: "Entrenamiento de cardio de moderada a alta intensidad.",
    category: "Cardio",
    muscle_group: "Piernas",
    difficulty_level: "Bajo",
    weight: 0,
    reps: 30
  },
  {
    id: 5,
    name: "Plancha Abdominal",
    description: "Ejercicio isométrico para fortalecer la musculatura del core.",
    category: "Flexibilidad",
    muscle_group: "Abdomen",
    difficulty_level: "Bajo",
    weight: 0,
    reps: 60
  }
];

let workouts = [
  {
    id: 105,
    user_id: "e3b0c442-8c15-47b3-be41-000000000012",
    name: "Día de Pierna Pesado",
    scheduled_date: "2026-09-12T18:00:00Z",
    status: "completado",
    comments: "Enfocarse en mantener la técnica de espalda recta en la sentadilla.",
    created_at: "2026-09-10T08:30:00Z"
  },
  {
    id: 106,
    user_id: "b42f53fa-7b30-4b91-8d36-dc1c6ef27611",
    name: "Rutina de Torso",
    scheduled_date: "2026-09-16T10:00:00Z",
    status: "pendiente",
    comments: "Enfocarse en press de banca controlado.",
    created_at: "2026-09-11T12:00:00Z"
  },
  {
    id: 107,
    user_id: "e3b0c442-8c15-47b3-be41-000000000012",
    name: "Cardio de recuperación",
    scheduled_date: "2026-09-18T07:00:00Z",
    status: "pendiente",
    comments: "Trotar a ritmo suave.",
    created_at: "2026-09-15T15:00:00Z"
  }
];

let workout_exercises = [
  {
    id: 301,
    workout_id: 105,
    exercise_id: 1,
    sets: 4,
    repetitions: 8,
    weight: 100.5
  },
  {
    id: 302,
    workout_id: 106,
    exercise_id: 2,
    sets: 4,
    repetitions: 10,
    weight: 70.0
  },
  {
    id: 303,
    workout_id: 107,
    exercise_id: 4,
    sets: 1,
    repetitions: 1,
    weight: 0.0
  }
];

module.exports = {
  users,
  exercises,
  workouts,
  workout_exercises
};
