# Workout Tracker API

API RESTful construida con **Node.js** y **Express** para gestionar usuarios, ejercicios, entrenamientos y registros de progreso. Datos almacenados en memoria (se reinician al reiniciar el servidor).

## Inicialización

```bash
npm install
npm run dev      # desarrollo (nodemon)
npm start        # producción
```

El servidor levanta en `http://localhost:8000` (puerto configurable en `.env`).

## Endpoints

Todos los endpoints usan el prefijo `/api/v1`.

| Recurso | Método | URI | Descripción | Estados |
|---|---|---|---|---|
| Usuarios | GET | `/api/v1/users` | Lista usuarios. Filtros: `?search=`, `?role=`, `?limit=` | 200 |
| Usuarios | GET | `/api/v1/users/id` | Obtiene usuario por ID (literal `/id`, no `/:id`) | 200, 404 |
| Usuarios | POST | `/api/v1/users` | Crea un usuario nuevo. Requiere `name`, `email` | 201, 400 |
| Usuarios | PUT | `/api/v1/users/id` | Actualización completa del usuario. Requiere `name`, `email` | 200, 400, 404 |
| Usuarios | PATCH | `/api/v1/users/id` | Actualización parcial del usuario | 200, 404 |
| Usuarios | DELETE | `/api/v1/users/id` | Elimina un usuario | 204, 404 |
| Ejercicios | GET | `/api/v1/exercises` | Lista catálogo. Filtros: `?muscle_group=`, `?category=` | 200 |
| Ejercicios | GET | `/api/v1/exercises/id` | Obtiene ejercicio por ID | 200, 404 |
| Ejercicios | POST | `/api/v1/exercises` | Crea un ejercicio nuevo. Todos los campos requeridos | 201, 400 |
| Ejercicios | PUT | `/api/v1/exercises/id` | Actualización completa del ejercicio | 200, 400, 404 |
| Ejercicios | PATCH | `/api/v1/exercises/id` | Actualización parcial del ejercicio | 200, 404 |
| Ejercicios | DELETE | `/api/v1/exercises/id` | Elimina un ejercicio | 204, 404 |
| Workouts | GET | `/api/v1/workouts` | Lista entrenamientos. Filtros: `?status=`, `?user_id=`, `?limit=` | 200 |
| Workouts | GET | `/api/v1/workouts/id` | Obtiene entrenamiento por ID (con ejercicios anidados, HATEOAS) | 200, 404 |
| Workouts | POST | `/api/v1/workouts` | Crea un entrenamiento nuevo. Requiere `name`, `status` | 201, 400 |
| Workouts | PUT | `/api/v1/workouts/id` | Actualización completa del entrenamiento | 200, 400, 404 |
| Workouts | PATCH | `/api/v1/workouts/id` | Actualización parcial del entrenamiento | 200, 404 |
| Workouts | DELETE | `/api/v1/workouts/id` | Elimina entrenamiento y sus ejercicios | 204, 404 |
| Progress | GET | `/api/v1/progress` | Lista registros de progreso | 200 |
| Progress | GET | `/api/v1/progress/id` | Obtiene registro por ID | 200, 404 |
| Progress | POST | `/api/v1/progress` | Crea registro de progreso. Requiere `sets`, `weight`, `repetitions` | 201, 400 |
| Progress | PUT | `/api/v1/progress/id` | Actualización completa del progreso | 200, 400, 404 |
| Progress | PATCH | `/api/v1/progress/id` | Actualización parcial del progreso | 200, 404 |
| Progress | DELETE | `/api/v1/progress/id` | Elimina registro de progreso | 204, 404 |

**Notas sobre las rutas:**
- Todas las rutas de ID usan literal `/id` en lugar de `/:id` (ej. `/api/v1/users/id`)
- Los endpoints jerárquicos `/users/:id/workouts`, `/users/:id/reports`, `/workouts/:id/exercises` están documentados pero **no implementados** en el código

## Ejemplos de request/response

### GET /api/v1/users?search=John

```json
200 OK
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
]
```

### POST /api/v1/users

```json
POST /api/v1/users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com"
}
```

```json
201 Created
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

### POST /api/v1/exercises

```json
POST /api/v1/exercises
Content-Type: application/json

{
  "name": "Bench Press",
  "description": "Chest exercise",
  "category": "strength",
  "muscle_group": "chest",
  "difficulty_level": "intermediate"
}
```

```json
201 Created
{
  "id": 1,
  "name": "Bench Press",
  "description": "Chest exercise",
  "category": "strength",
  "muscle_group": "chest",
  "difficulty_level": "intermediate",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

### POST /api/v1/workouts

```json
POST /api/v1/workouts
Content-Type: application/json

{
  "name": "Chest Day",
  "status": "completed"
}
```

```json
201 Created
{
  "id": 1,
  "name": "Chest Day",
  "status": "completed",
  "userId": 1,
  "exercises": [],
  "_links": {
    "self": { "href": "/api/v1/workouts/1" },
    "user": { "href": "/api/v1/users/1" }
  },
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

### POST /api/v1/progress

```json
POST /api/v1/progress
Content-Type: application/json

{
  "sets": 3,
  "weight": 80,
  "repetitions": 10,
  "workoutId": 1,
  "userId": 1
}
```

```json
201 Created
{
  "id": 1,
  "sets": 3,
  "weight": 80,
  "repetitions": 10,
  "workoutId": 1,
  "userId": 1,
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

## Códigos de estado HTTP aplicados

| Estado | Descripción |
|---|---|
| `200` | OK - Éxito general (GET, PUT, PATCH) |
| `201` | Created - Creación de recursos (POST, PUT exitoso) |
| `204` | No Content - Eliminación exitosa (DELETE) |
| `400` | Bad Request - Campos requeridos ausentes en el body |
| `404` | Not Found - Recurso solicitado no existe |
| `405` | Method Not Allowed - Método HTTP no permitido |
| `500` | Internal Server Error - Fallo inesperado del servidor |

## Cabeceras

- `X-API-Version: 1` - Cabecera personalizada de versionado en URI: `/api/v1`
- `X-Request-Id` - Identificador por solicitud para trazabilidad
- `X-API-Key` - Cabecera entrante opcional que se registra en el log del servidor
- `Content-Type: application/json; charset=utf-8` - Negociación de contenido en cada respuesta

## Versionamiento del código

| Rama | Propósito | Commits |
|---|---|---|
| `main` | Rama principal protegida | — |
| `develop` | Rama de integración | docs: README |
| `feat/users` | Recurso Usuarios | diseño/estructura, GET, POST, PUT/PATCH/DELETE |
| `feat/exercises` | Recurso Ejercicios | GET catálogo y detalle |
| `feat/workouts` | Recurso Entrenamientos | CRUD + ejercicios anidados + HATEOAS |
| `feat/progress` | Recurso Progress | CRUD básico de seguimiento |

## Autenticación

**None implementado.** La API es abierta sin validación de tokens ni gestión de sesiones.
