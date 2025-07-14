# 📝 Personal Notes (Fullstack App)

Aplicación web fullstack para gestión de notas personales, desarrollada como **prueba técnica** con enfoque en buenas prácticas de arquitectura, seguridad, documentación y diseño moderno.

- 🧠 Backend: NestJS + MySQL + JWT
- 💻 Frontend: Next.js 15 + Tailwind + ShadCN/UI
- 🐳 Docker: Orquestación con Docker Compose

---

## 🚀 Funcionalidades principales

### 🔐 Backend (API RESTful)

- Registro y login de usuarios
- Autenticación segura con JWT
- CRUD completo de notas personales (solo accesibles por su dueño)
- Guards personalizados (propiedad de recurso)
- API versionada (`/api/v1`)
- Documentación Swagger
- Middleware de sanitización, logger, UUID validation
- Manejo global de errores con JSON Problem (RFC 7807)

### 💻 Frontend (SPA con Server Components)

- Autenticación con JWT y persistencia de sesión
- Interfaz moderna y responsiva (ShadCN UI)
- Formularios validados manualmente
- CRUD completo de notas (crear, ver, editar, eliminar)
- Página de detalle para cada nota
- Layout minimalista
- Integración directa con backend en Docker

---

## 🧱 Tecnologías utilizadas

| Capa      | Stack                                                  |
|-----------|--------------------------------------------------------|
| Backend   | NestJS 11+, TypeORM, Passport JWT, Swagger, MySQL     |
| Frontend  | Next.js 15 (App Router), React 19, Tailwind CSS, ShadCN |
| Infra     | Docker, Docker Compose, ESLint, Prettier               |

---

## 📂 Estructura general del proyecto

personal-notes-api/
├── backend/ # API NestJS
├── frontend/ # App Next.js
├── docker-compose.yml
├── README.md
└── build.sh


---

## 📦 Instalación y ejecución con Docker

```bash
# 1. Clona el repositorio
git clone https://github.com/usuario/personal-notes-api.git
cd personal-notes-api

# 2. Configura variables si es necesario
cp .env.example .env

# 3. Construye y levanta los contenedores
./build.sh
```

## 🔗 Accesos rápidos
Frontend: http://localhost:3001

Backend Swagger: http://localhost:3000/api/v1/docs

## 📌 Endpoints backend
🔐 Autenticación
Método	Ruta	Descripción
POST	/auth/login	Iniciar sesión y obtener JWT
POST	/users	Registrar nuevo usuario
GET	/users/me	Ver perfil autenticado

## 📄 Notas (/api/v1/notes)
Protegidas por JWT y ownership.

Método	Ruta	Descripción
GET	/	Listar notas del usuario
POST	/	Crear nota
GET	/:id	Ver nota por ID
PATCH	/:id	Actualizar nota
DELETE	/:id	Eliminar nota

nota

## 🎨 Detalles del Frontend
Autenticación	JWT con persistencia en localStorage
Librería UI	ShadCN UI
Diseño responsivo	Sí, usando Tailwind y diseño adaptable
Formularios	Validaciones manuales
Manejo de errores	Mensajes visuales y toasts
Rutas protegidas	/notes y /notes/[id]
Arquitectura	App Router con Server/Client Components
Estilos	Tailwind CSS configurado vía ShadCN

## Estructura
frontend/
├── app/
│   ├── login/
│   ├── register/
│   ├── notes/
│   │   ├── [id]/page.tsx
│   │   ├── components/
│   │   │   ├── NoteForm.tsx
│   │   │   ├── NoteCard.tsx
│   │   │   └── NoteList.tsx
│   ├── layout.tsx
│   └── globals.css
├── components/       # Componentes de UI importados de ShadCN
├── lib/utils.ts      # Función `cn` de utilidades (ShadCN)
└── components.json   # Configuración CLI ShadCN

## 📚 Documentación adicional
Diagrama de secuencia: docs/diagrams

OpenAPI JSON:

curl http://localhost:3000/api/v1/docs-json > openapi.json

## ✅ Estado del proyecto
✅ Backend completo y probado (NestJS)

✅ Frontend funcional y responsive (Next.js + ShadCN)

✅ Docker para frontend, backend y base de datos

✅ Documentación técnica incluida

✅ Validaciones y estructura profesional

## 👤 Autor
Andrés Tapias
📧 andresftat4@gmail.com
🔗 LinkedIn: https://www.linkedin.com/in/andr%C3%A9s-tapias-40a4a1370/