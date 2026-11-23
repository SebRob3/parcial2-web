# Proyecto Base — Parcial Práctico Backend (NestJS + MongoDB)

API REST en NestJS y Mongoose para la gestión de **Usuarios (`/users`)** y **Tareas (`/tasks`)**.

---

## Requisitos Previos

- **Node.js** 18+ y **npm**
- **Docker Desktop** (o instancia local de MongoDB en el puerto `27017`)

---

## Instalación y Puesta en Marcha

1. **Levantar la base de datos MongoDB:**
   ```bash
   docker compose up -d
   ```
   *(Si utilizas una instancia local o MongoDB Atlas diferente a `mongodb://localhost:27017/nest-parcial`, configura la variable `MONGODB_URI` en un archivo `.env` tomando como base `.env.example`.)*

2. **Instalar dependencias del proyecto:**
   ```bash
   npm install
   ```

3. **Iniciar la aplicación en modo desarrollo:**
   ```bash
   npm run start:dev
   ```
   El servidor quedará disponible en `http://localhost:3000`.

---

## Pruebas y Validación

- **Ejecutar pruebas unitarias:**
  ```bash
  npm test
  ```
- **Ejecutar pruebas end-to-end:**
  ```bash
  npm run test:e2e
  ```
- **Verificar compilación y linter:**
  ```bash
  npm run build
  npm run lint
  ```

---

## Endpoints del Sistema

| Método | Ruta | Acceso | Descripción |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Público | Verificación básica del servidor |
| `POST` | `/users` | Público | Crear usuario (`name`, `email`) |
| `GET` | `/users` | Público | Listar usuarios registrados |
| `GET` | `/users/:id` | Público | Consultar usuario por ID |
| `GET` | `/tasks` | Público | Listar tareas registradas |
| `GET` | `/tasks/:id` | Público | Consultar tarea por ID |
| `POST` | `/tasks` | Restringido (`Authorization: admin-secret-token`) | Crear una tarea asociada a un usuario |

También puedes importar `nest-parcial.postman_collection.json` en Postman o utilizar `requests.http` con la extensión REST Client de VS Code para probar manualmente los endpoints.

# Justificación en README
## Caso 1
Para el Caso 1 se ha creado el /tasks/createTaskDTO.ts, en este DTO se definen los mismos campos del esquema de tareas. Además, se han realizado validadores del tipo de dato en cada campo y el contenido del mismo. En el controlador de tasks se remplazo el any del payload por el tipo de dato del DTO para que lo valide con este. Además, se añadio ValidationPipe() para que se realize la validación del tipo de dato. Finalmente, se puso strict: true en el esquema para que si algun dato incorrecto llega, se rechace por la base de datos.

## Caso 2
En este caso se añadio en exports del modulo de usuarios el servicio correspondiente, posteriormente, se elimino el import del modelo de usuarios en el modulo de tareas y se agrego como import el modulo de usuarios. Finalmente, se eliminaron las importaciones de usuarios en el controlador de tareas y solo se agrego una importacion del servicio de usuarios en el servicio de tareas. Por lo que tambien se remplazo la logica del mismo.

## Caso 3
Se elimino el archivo del middleware y se implemento un guard en /guards/auth.guard.ts. Este guard tiene una ForbiddenException en caso contrario acepta la peticion si tiene el APIkey 12345. Este guard se agrega con UseGuards(AuthGuard) exclusivamente en el endpoint create.

## Caso 4
Se borro toda la logica del controlador de tareas y se movio al servicio correspondiente, tambien se eliminaron las inyecciones innecesarias para que solo se llamara el TaskService.
