# E-Channeling System (Enterprise Application)

An **enterprise-grade E-Channeling (healthcare appointment & channeling) system** built using an **MVC-based architecture** and a **microservice-oriented backend**. The solution is designed to separate responsibilities cleanly across presentation, business logic, and data access layers—supporting maintainability, scalability, and team-based development.

> Repository: `Sasudul/E-Channeling-System-`

---

## Architecture Overview

This project follows an **enterprise application design** with clear layering and separation of concerns.

### MVC (Model–View–Controller)
Across the services, the codebase is organized around the MVC concept:

- **Model**: Domain objects / entities and persistence mappings (e.g., JPA entities).
- **View**: Front-end UIs (React applications) that render data and manage user interactions.
- **Controller**: REST controllers that expose HTTP endpoints and orchestrate requests.
- **Service Layer (Business Logic)**: Handles business rules and workflows.
- **Repository / DAO Layer**: Data access layer (Spring Data JPA repositories).

### Microservices (Backend)
The backend is split into multiple Spring Boot microservices, each responsible for a specific business domain:

- **admin-service** (Spring Boot)
- **appointment-service** (Spring Boot)
- **doctor-service** (Spring Boot)
- **patient-service** (Spring Boot)

These services can be developed, deployed, and scaled independently in an enterprise environment.

---

## Technology Stack

### Backend
- **Java 17**
- **Spring Boot 3.x**
- **Spring Web** (REST APIs)
- **Spring Data JPA**
- **MySQL** (via MySQL Connector/J)
- **Maven** (build tool)

### Frontend
Multiple React front-end applications built with:
- **React + Vite**
- **React Router**

Front-end directories observed in the repository:
- `front-end-service/` (React + Vite)
- `admin-front-end/` (React + Vite)
- `front-end-service/Admin/admin/` (React + Vite)

### Database
- SQL schema/script: `DataBase.sql`

---

## Repository Structure (High Level)

- `admin-front-end/` — Admin UI (React + Vite)
- `front-end-service/` — Main UI (React + Vite)
- `admin-service/` — Admin microservice (Spring Boot)
- `appointment-service/` — Appointment microservice (Spring Boot)
- `doctor-service/` — Doctor microservice (Spring Boot)
- `patient-service/` — Patient microservice (Spring Boot)
- `DataBase.sql` — Database script

---

## Getting Started (Development)

### Prerequisites
Make sure you have the following installed:

- **Java 17**
- **Maven**
- **Node.js + npm**
- **MySQL**

---

## Backend Setup (Spring Boot Microservices)

Each microservice contains its own Maven project and can be run independently.

### 1) Configure Database
1. Create a MySQL database (example: `e_channeling`)
2. Run the SQL script:
   - `DataBase.sql`

3. Update each service’s configuration (typically `application.properties` or `application.yml`) with your MySQL connection details:
   - URL, username, password

> Note: If you don’t see config files at the expected locations, ensure they exist under `src/main/resources/` for each service.

### 2) Run a Service
From inside a service directory that contains a `pom.xml`:

```bash
mvn spring-boot:run
```

Repeat for:
- `admin-service/admin-service`
- `appointment-service/appointment-service`
- `doctor-service/doctor-service`
- `patient-service/patient-service`

---

## Frontend Setup (React + Vite)

From each frontend directory (e.g., `front-end-service/`, `admin-front-end/`):

```bash
npm install
npm run dev
```

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

---

## Enterprise-Grade Practices (Suggested)

If you plan to evolve this into a production-ready enterprise deployment, consider adding:

- Centralized configuration management (e.g., Spring Cloud Config)
- Service discovery (e.g., Eureka / Consul)
- API gateway (e.g., Spring Cloud Gateway)
- Authentication/Authorization (e.g., Spring Security + JWT/OAuth2)
- Observability (logs, metrics, tracing)
- Containerization (Docker) and orchestration (Kubernetes)
- CI/CD pipelines (GitHub Actions)

---

## Contributing

Contributors of this project are.
1. Sasudul(sasudul)
2. Sanugi(sanugi06)
3. Ishara(IsharaLakshan2002)
4. Branjana(sureshbranjana)
5. Harsha(Harsha20020703)

