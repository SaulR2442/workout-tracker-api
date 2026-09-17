# Workout Tracker API

API RESTful construida con **Node.js** y **Express** para gestionar usuarios, rutinas, ejercicios y registros de progreso. Basada en el documento *Diseño Conceptual de API RESTful: Workout Tracker*.

> **Nota:** La API no utiliza base de datos ni validaciones complejas. Todo el estado se almacena en memoria (`src/data/mockData.js`), por lo que los datos se reinician al reiniciar el servidor.

## Inicialización

```bash
npm install
npm run dev      # desarrollo (nodemon)
npm start        # producción
```

El servidor levanta en `http://localhost:8000` (puerto configurable en `.env`).

## Estructura del proyecto

```
src/
├── app.js                  # Bootstrap de Express y registro de rutas /api
├── config/
│   └── env.js              # Carga de variables de entorno
├── data/
│   └── mockData.js         # Almacenamiento en memoria (users, exercises, workouts, workout_exercises)
└── routes/
    ├── index.js            # Enrutador raíz /api
    └── v1/
        ├── index.js        # Prefijo /v1 + cabeceras globales (X-API-Version, X-Request-Id)
        ├── users.routes.js
        ├── exercises.routes.js
        └── workouts.routes.js
```

## Endpoints

Todos los endpoints usan el prefijo `/api/v1`.

| Módulo | Método | URI | Descripción | Estados |
|---|---|---|---|---|
| Usuarios | GET | `/users` | Lista usuarios. Filtros: `?search=`, `?role=`, `?limit=` | 200 |
| Usuarios | GET | `/users/:id` | Detalle de un usuario por ID | 200, 404 |
| Usuarios | GET | `/users/:id/workouts` | Jerárquico: entrenamientos del usuario | 200, 404 |
| Usuarios | GET | `/users/:id/reports` | Jerárquico: informe/métricas de progreso | 200, 404 |
| Usuarios | POST | `/users` | Registra un usuario nuevo | 201, 400 |
| Usuarios | PUT | `/users/:id` | Actualización completa del usuario | 200, 400, 404 |
| Usuarios | PATCH | `/users/:id` | Actualización parcial del usuario | 200, 404 |
| Usuarios | DELETE | `/users/:id` | Elimina un usuario | 204, 404 |
| Ejercicios | GET | `/exercises` | Lista catálogo. Filtros: `?muscle_group=`, `?category=` | 200 |
| Ejercicios | GET | `/exercises/:id` | Detalle de un ejercicio | 200, 404 |
| Entrenamientos | GET | `/workouts` | Lista entrenamientos. Filtros: `?status=`, `?user_id=`, `?limit=` | 200 |
| Entrenamientos | GET | `/workouts/:id` | Detalle con ejercicios anidados y HATEOAS | 200, 404 |
| Entrenamientos | POST | `/workouts` | Crea un entrenamiento en blanco | 201, 400, 404 |
| Entrenamientos | PUT | `/workouts/:id` | Actualiza metadatos completos | 200, 400, 404 |
| Entrenamientos | PATCH | `/workouts/:id` | Actualización parcial (status, fecha, etc.) | 200, 404 |
| Entrenamientos | DELETE | `/workouts/:id` | Elimina un entrenamiento y sus ejercicios | 204, 404 |
| Entrenamientos | POST | `/workouts/:id/exercises` | Jerárquico: añade ejercicio con sets, reps y peso | 201, 400, 404 |

## Ejemplos de request/response

### GET /api/v1/users

```
GET /api/v1/users?role=user
```

```json
200 OK
[
  {
    "id": "b42f53fa-7b30-4b91-8d36-dc1c6ef27611",
    "name": "Carlos Navia",
    "email": "carlos@example.com",
    "experience_level": "Intermedio",
    "role": "user",
    "created_at": "2025-09-12T12:00:00Z"
  },
  {
    "id": "a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d",
    "name": "Ana Gómez",
    "email": "ana@example.com",
    "experience_level": "Principiante",
    "role": "user",
    "created_at": "2026-09-15T09:00:00Z"
  }
]
```

### POST /api/v1/users

```
POST /api/v1/users
Content-Type: application/json

{ "name": "Lucía Torres", "email": "lucia@example.com", "experience_level": "Principiante" }
```

```json
201 Created
{
  "id": "8f9b2c1e-4a6d-4f0e-9c3b-7d5a1e8f2b60",
  "name": "Lucía Torres",
  "email": "lucia@example.com",
  "experience_level": "Principiante",
  "role": "user",
  "created_at": "2026-09-17T10:15:00Z"
}
```

### GET /api/v1/workouts/105

```
GET /api/v1/workouts/105
```

```json
200 OK
{
  "id": 105,
  "user_id": "e3b0c442-8c15-47b3-be41-000000000012",
  "name": "Día de Pierna Pesado",
  "scheduled_date": "2026-09-12T18:00:00Z",
  "status": "completado",
  "comments": "Enfocarse en mantener la técnica de espalda recta en la sentadilla.",
  "created_at": "2026-09-10T08:30:00Z",
  "exercises": [
    {
      "workout_exercise_id": 301,
      "exercise_id": 1,
      "name": "Sentadilla libre",
      "sets": 4,
      "repetitions": 8,
      "weight": 100.5
    }
  ],
  "_links": {
    "self": { "href": "/api/v1/workouts/105", "method": "GET" },
    "user_owner": { "href": "/api/v1/users/e3b0c442-8c15-47b3-be41-000000000012", "method": "GET" },
    "add_exercise": { "href": "/api/v1/workouts/105/exercises", "method": "POST" },
    "progress_reports": { "href": "/api/v1/users/e3b0c442-8c15-47b3-be41-000000000012/reports", "method": "GET" }
  }
}
```

### POST /api/v1/workouts/106/exercises

```
POST /api/v1/workouts/106/exercises
Content-Type: application/json

{ "exercise_id": 5, "sets": 3, "repetitions": 15, "weight": 0 }
```

```json
201 Created
{
  "workout_exercise_id": 304,
  "exercise_id": 5,
  "name": "Plancha Abdominal",
  "sets": 3,
  "repetitions": 15,
  "weight": 0
}
```

### GET /api/v1/users/:id/reports

```
GET /api/v1/users/e3b0c442-8c15-47b3-be41-000000000012/reports
```

```json
200 OK
{
  "user_id": "e3b0c442-8c15-47b3-be41-000000000012",
  "name": "Saúl Ramírez",
  "experience_level": "Avanzado",
  "total_workouts": 2,
  "completed_workouts": 1,
  "pending_workouts": 1,
  "completion_rate": 50,
  "generated_at": "2026-09-17T10:20:00Z"
}
```

### DELETE /api/v1/workouts/:id

```
DELETE /api/v1/workouts/107
```

```
204 No Content (sin cuerpo de respuesta)
```

## Códigos de estado HTTP aplicados

| Estado | Descripción |
|---|---|
| 200 OK | Éxito general (GET, PUT, PATCH) |
| 201 Created | Creación de recursos (POST) |
| 204 No Content | Eliminación exitosa (DELETE) |
| 400 Bad Request | Campos requeridos ausentes en el body |
| 404 Not Found | Recurso solicitado no existe |
| 500 Internal Server Error | Fallo inesperado del servidor |

## Cabeceras

- `Content-Type: application/json; charset=utf-8` (negociación de contenido en cada respuesta).
- `X-API-Version: 1` (cabecera personalizada de versionado en URI: `/api/v1`).
- `X-Request-Id` (identificador por solicitud para trazabilidad).
- `X-API-Key` (cabecera entrante opcional que se registra en el log del servidor).

## Versionamiento del código

| Rama | Propósito | Commits |
|---|---|---|
| `main` | Rama principal protegida | — |
| `develop` | Rama de integración | docs: README |
| `feat/users` | Recurso Usuarios | diseño/estructura, GET, POST, PUT/PATCH/DELETE |
| `feat/exercises` | Recurso Ejercicios | GET catálogo y detalle |
| `feat/workouts` | Recurso Entrenamientos | CRUD + ejercicios anidados + HATEOAS |
