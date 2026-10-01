# Project Management API

A RESTful API for managing users, projects, and tasks.

## Table of Contents

- [Getting Started](#getting-started)
- [Base URL](#base-url)
- [Authentication](#authentication)
- [Endpoints](#endpoints)
  - [Auth](#auth)
  - [Projects](#projects)
  - [Tasks](#tasks)
- [Error Handling](#error-handling)
- [License](#license)

## Getting Started

```bash
# Clone the repository
git clone https://github.com/Farrukh-Murtaza/backend-development-project.git
cd backend-development-project

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env

# Start the server
npm start
```

## Base URL

```
http://localhost:3000/api
```

## Authentication

Register or log in to receive a token, then include it in the `Authorization` header on all protected routes:

```
Authorization: Bearer <your_token>
```

## Endpoints

### Auth

| Method | Endpoint             | Description                     | Auth required |
| ------ | -------------------- | ------------------------------- | :-----------: |
| POST   | `/api/auth/register` | Register a new user             |      No       |
| POST   | `/api/auth/login`    | Log in and receive a token      |      No       |
| GET    | `/api/auth/me`       | Get the current user's profile  |      Yes      |

**Example: Register**

```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "securePassword123"
}
```

**Example: Login**

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "jane@example.com",
  "password": "securePassword123"
}
```

### Projects

| Method | Endpoint            | Description                  | Auth required |
| ------ | ------------------- | ---------------------------- | :-----------: |
| GET    | `/api/projects`     | List all projects            |      Yes      |
| POST   | `/api/projects`     | Create a new project         |      Yes      |
| GET    | `/api/projects/:id` | Get a single project by ID   |      Yes      |
| PUT    | `/api/projects/:id` | Update a project             |      Yes      |
| DELETE | `/api/projects/:id` | Delete a project             |      Yes      |

**Example: Create a project**

```http
POST /api/projects
Authorization: Bearer <your_token>
Content-Type: application/json

{
  "name": "Website Redesign",
  "description": "Redesign the company marketing site"
}
```

### Tasks

| Method | Endpoint                          | Description                    | Auth required |
| ------ | --------------------------------- | ------------------------------ | :-----------: |
| POST   | `/api/projects/:projectId/tasks`  | Create a task in a project     |      Yes      |
| GET    | `/api/projects/:projectId/tasks`  | List all tasks in a project    |      Yes      |
| PUT    | `/api/tasks/:taskId`              | Update a task                  |      Yes      |
| DELETE | `/api/tasks/:taskId`              | Delete a task                  |      Yes      |

**Example: Create a task**

```http
POST /api/projects/42/tasks
Authorization: Bearer <your_token>
Content-Type: application/json

{
  "title": "Design homepage mockup",
  "status": "todo"
}
```

## Error Handling

The API uses standard HTTP status codes:

| Code | Meaning                                  |
| ---- | ---------------------------------------- |
| 200  | Success                                  |
| 201  | Resource created                         |
| 400  | Bad request / validation error           |
| 401  | Unauthorized (missing or invalid token)  |
| 403  | Forbidden                                |
| 404  | Resource not found                       |
| 500  | Internal server error                    |

Error responses follow this shape:

```json
{
  "error": "Description of what went wrong"
}
```
