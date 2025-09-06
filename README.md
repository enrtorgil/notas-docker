# Notas — Laravel 11 + React + Docker

App de **Notas (CRUD)** con **Laravel (API JSON)** y **React**. Todo el stack se levanta con **un comando**: `docker compose up`.

## Requisitos

- Docker (Se ha hecho uso de *Docker Desktop*)

## Primer uso (solo una vez)

```bash
# crear BD sqlite + permisos, clave app (laravel) y migraciones
docker compose run --rm php sh -lc "mkdir -p database && touch database/database.sqlite && chmod -R 777 storage bootstrap/cache database"
docker compose run --rm php php artisan key:generate
docker compose run --rm php php artisan migrate
```

## Levantar la app

```bash
docker compose up
```

- **Frontend (React)**: http://localhost:8080
- **API (Laravel)**: prefijo `/api` → p.ej. `http://localhost:8080/api/health`

## Endpoints API

- `GET /api/health` → `{ "data": { "db": "ok" }, "message": null, "errors": null }`
- `GET /api/notes?q=` → lista (10/página), filtro por **title** (contains), orden **created_at desc**
- `POST /api/notes` → `{ title: string, content?: string }`
- `GET /api/notes/{id}`
- `PUT /api/notes/{id}`
- `DELETE /api/notes/{id}`

**Formato éxito:** `{ "data": ..., "message": null, "errors": null }`  
**Validación (422):** `{ "errors": { "field": ["..."] } }`

## Pantallas (React)

- `/` (listado)
- `/new` (formulario crear)
- `/edit/:id` (formulario editar)

## Tests

- **Backend (PHPUnit):**
  ```bash
  docker compose run --rm php php artisan test
  ```

- **Frontend (Vitest):**
  ```bash
docker compose exec node npm run test:run
  ```

## Estructura

```
backend/  (Laravel 11 API + SQLite)
frontend/ (React + Vite)
php/      (Dockerfile PHP-FPM)
nginx/    (default.conf)
docker-compose.yml
```

**Nota:** La app no usa auth (login/register).