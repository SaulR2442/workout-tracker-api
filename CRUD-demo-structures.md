# Estructuras de Datos para CRUD - API Tracker de Entrenamientos

## 📋 Descripción General
Ejemplos de estructuras de datos para demostrar operaciones CRUD. Usa estos payloads de prueba en Thunder o tu cliente de API.

---

## 👥 USUARIOS

### Ejemplo 1: Crear Usuario
```json
{
  "id": "e3b0c442-8c15-47b3-be41-000000000012",
  "name": "Saúl Ramírez",
  "email": "saul@example.com",
  "experience_level": "Avanzado",
  "role": "admin",
  "created_at": "2026-09-10T08:30:00Z"
}
```

### Ejemplo 2: Usuario con Rol Diferente
```json
{
  "id": "11111111-1111-1111-1111-111111111111",
  "name": "María García",
  "email": "maria@gym.com",
  "experience_level": "Intermedio",
  "role": "user",
  "created_at": "2026-09-01T14:20:00Z"
}
```

---

## 💪 EJERCICIOS

### Ejemplo 1: Ejercicio de Piernas
```json
{
  "id": 1,
  "name": "Sentadilla libre",
  "description": "Ejercicio compuesto para el desarrollo de la fuerza en el tren inferior (cuádriceps e isquiotibiales).",
  "category": "Fuerza",
  "muscle_group": "Piernas",
  "difficulty_level": "Intermedio"
}
```

### Ejemplo 2: Ejercicio de Pecho
```json
{
  "id": 2,
  "name": "Press de banca",
  "description": "Ejercicio de empuje para desarrollar el músculo pectoral mayor.",
  "category": "Fuerza",
  "muscle_group": "Pecho",
  "difficulty_level": "Alto"
}
```

---

## 🏋️ ENTRENAMIENTOS

### Ejemplo 1: Nueva Rutina
```json
{
  "id": 1,
  "user_id": "e3b0c442-8c15-47b3-be41-000000000012",
  "name": "Rutina de Piernas",
  "scheduled_date": "2026-09-20T18:00:00Z",
  "status": "pendiente",
  "comments": "Enfoque en cuádriceps y isquiotibiales"
}
```

### Ejemplo 2: Entrenamiento Completado
```json
{
  "id": 2,
  "user_id": "11111111-1111-1111-1111-111111111111",
  "name": "Entreno de Pecho y Tríceps",
  "scheduled_date": "2026-09-15T16:00:00Z",
  "status": "completado",
  "comments": "Buen progreso en fuerza"
}
```

---

## 🔗 EJERCICIOS EN RUTINA (tabla enlace)

### Ejemplo 1: Agregar Ejercicio a Rutina
```json
{
  "id": 1,
  "workout_id": 1,
  "exercise_id": 1,
  "sets": 4,
  "repetitions": "10-12",
  "weight": 0
}
```

### Ejemplo 2: Carga Pesada
```json
{
  "id": 2,
  "workout_id": 1,
  "exercise_id": 2,
  "sets": 3,
  "repetitions": "8",
  "weight": 80.5
}
```

---