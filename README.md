# 📝 Personal Notes API

API RESTful para la gestión de notas personales, construida con **NestJS** y **MySQL**. Proyecto desarrollado como **prueba técnica**, enfocado en buenas prácticas de arquitectura, seguridad y documentación profesional.

---

## 🚀 Características principales

- 🔐 Autenticación segura con JWT (Passport.js)
- 👤 Registro y login de usuarios
- 🗃️ CRUD completo de notas (solo accesibles por su dueño)
- 🛡️ Guards personalizados para validación de ownership
- ⚙️ Middlewares globales: logging, sanitización de headers, validación de UUID
- ❗ Filtro global de errores con JSON Problem (RFC 7807)
- 🧩 API versionada (`/api/v1`)
- 📚 Documentación Swagger (OpenAPI)
- 🐳 Dockerizado para ejecución local y despliegue

---


## 📌 Requisitos Funcionales

- RF1: El usuario podrá registrarse proporcionando nombre, email y contraseña.
- RF2: El usuario podrá iniciar sesión y recibir un token JWT.
- RF3: El usuario podrá crear, consultar, actualizar y eliminar sus propias notas.
- RF4: El sistema deberá validar que solo el propietario pueda manipular sus notas.

## ⚙️ Requisitos No Funcionales

- RNF1: La API debe seguir el estándar RESTful.
- RNF2: El sistema debe estar dockerizado para facilitar el despliegue.
- RNF3: Las respuestas de error deben seguir el estándar JSON Problem (RFC 7807).
- RNF4: Las rutas deben estar protegidas con autenticación JWT.
- RNF5: Todas las entidades deben validar sus datos con DTOs y validadores.

---

## 🛠️ Tecnologías utilizadas

- **NestJS 11+**
- **TypeORM**
- **MySQL**
- **Passport + JWT**
- **Docker & Docker Compose**
- **Swagger / OpenAPI**
- **ESLint + Prettier**

---

## 📂 Estructura de carpetas

src/
├── auth/ # Login, estrategia JWT y decoradores
│ └── decorators/
│ └── strategies/
├── common/ # Middlewares y filtros globales
│ └── filters/
│ └── middleware/
├── config/ # Configuración de base de datos
├── modules/ # Módulos del dominio
│ └── notes/
├── users/ # Módulo de usuarios


---

## 🔐 Autenticación

| Método | Ruta             | Descripción                         |
|--------|------------------|-------------------------------------|
| POST   | `/auth/login`    | Iniciar sesión y obtener JWT        |
| POST   | `/users`         | Registrar nuevo usuario             |
| GET    | `/users/me`      | Ver perfil autenticado (protegido) |

---

## 📝 Endpoints de Notas (`/api/v1/notes`)

> Todos protegidos con JWT y verificación de propiedad.

| Método | Ruta             | Descripción                      |
|--------|------------------|----------------------------------|
| POST   | `/`              | Crear una nueva nota             |
| GET    | `/`              | Listar todas las notas del usuario |
| GET    | `/:id`           | Obtener una nota específica      |
| PATCH  | `/:id`           | Actualizar una nota              |
| DELETE | `/:id`           | Eliminar una nota                |

---

## 📚 Documentación adicional

- Diagramas PlantUML:
    - [Entidades](./docs/diagrams/entities.puml)
    - [Secuencia - GET /users/me](./docs/diagrams/get-profile-sequence.puml)


## 📦 Instalación

```bash
# 1. Clona el repositorio
git clone https://github.com/usuario/personal-notes-api.git

# 2. Configura variables de entorno
cp .env.example .env

# 3. Levanta los servicios con Docker
./build.sh
```

## 📚 Documentación Swagger
Una vez el proyecto esté corriendo, accede a:

http://localhost:3000/api/v1/docs

Genera el JSON con:

curl http://localhost:3000/api/v1/docs-json > openapi.json

## ✅ Estado del proyecto
Backend completo (login, JWT, CRUD, middleware, validaciones)

Frontend reactivo

Docker listo para producción

Documentación Swagger incluida

## 👤 Autor
Andrés Tapias
- 📧 andresftat4@gmail.com
- 🌐 LinkedIn: https://www.linkedin.com/in/andr%C3%A9s-tapias-40a4a1370/