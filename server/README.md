# ASP.NET Core Web API + PostgreSQL

Это backend REST API, построенный с использованием ASP.NET Core и Entity Framework Core, с PostgreSQL в качестве основной базы данных.

Проект разработан с акцентом на чистоту, явность и предсказуемость:

- строгая разделенность ответственности  
- явные сопоставления с базой данных  
- контролируемые миграции  
- отсутствие неявных каскадных удалений  

---

## Tech Stack

### Core Technologies
- .NET 9  
- ASP.NET Core Web API  
- Entity Framework Core  
- PostgreSQL  
- Npgsql EF Core Provider  

### Infrastructure & Tooling
- EF Core Migrations  
- Docker  
- pgAdmin (опционально)  
- RESTful API design  
- Snake_case схема базы данных  

---

## Requirements
- .NET SDK ≥ 9.0  
- Docker ≥ 24  
- Docker Compose (опционально, но рекомендуется)  

---

## Project Structure (пример)
```txt
src/ 
|   ├── Program.cs  
│   └── appsettings.json 
|
├── Features/  
│   ├── Controllers/    
│  
├── Infrastructure/  
│   |
│   ├── AppDbContext.cs  
│   ├── EfCoreEntityConfiguration/  
│   │       ├── ArticleConfiguration.cs  
│   │       └── TagConfiguration.cs  
│   └── Migrations/  
│  
└── Domain/  
    ├── Article.cs  
    └── Tag.cs  
```
---

## Database

### Connection String
```txt
Host=localhost;Database=mydb;Username=postgres;Password=secret
```

### Docker Setup

#### Create Network
```bash
docker network create mynetwork
```

#### PostgreSQL
```bash
docker run -d \
  --name postgres-db \
  -e POSTGRES_DB=mydb \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=secret \
  --network mynetwork
  -p 5432:5432 \
  postgres:16
```

#### Redis
```bash
docker run -d \
  --name redis-cache \
  --network mynetwork \
  -p 6379:6379 \
  -e REDIS_PASSWORD=secret \
  redis:7-alpine \
  redis-server --requirepass secret
```

#### pgAdmin (опционально)
```bash
docker run -d \
  --name pgadmin \
  -e PGADMIN_DEFAULT_EMAIL=admin@admin.com \
  -e PGADMIN_DEFAULT_PASSWORD=admin \
  --network mynetwork
  -p 8080:80 \
  dpage/pgadmin4
```
pgAdmin будет доступен по адресу: http://localhost:8080

---

## Entity Framework Core

### Apply Migrations
```bash
cd ./server/src/
dotnet ef database update
```

### Create Migration
```bash
cd ./server/src/
dotnet ef migrations add {migrationName} --output-dir ./Infrastructure/Migrations
```

---

## Database Schema Overview

### articles
- id uuid PRIMARY KEY DEFAULT gen_random_uuid()  
- title text NOT NULL  
- description text NOT NULL  

### tags
- id text PRIMARY KEY  

### article_tags
- article_id uuid NOT NULL  
- tag_id text NOT NULL  
- PRIMARY KEY (article_id, tag_id)  

Foreign keys настроены с **Restrict / NoAction** (каскадные удаления отсутствуют).  

---

## Initial Database Seed

### Insert Tags
```sql
INSERT INTO tags (id) VALUES
('React'),
('Web'),
('JS'),
('TS'),
('CSS'),
('Node'),
('Backend'),
('Frontend'),
('API'),
('.NET'),
('Database'),
('Docker'),
('Architecture'),
('Testing'),
('Performance'),
('Vue'),
('Angular'),
('Svelte'),
('SSR'),
('GraphQL'),
('REST'),
('Microservices'),
('DevOps'),
('Infrastructure'),
('Kubernetes'),
('CI/CD'),
('Automation'),
('Cache'),
('SQL'),
('NoSQL'),
('Security'),
('Authentication'),
('Mobile'),
('Flutter')
ON CONFLICT (id) DO NOTHING;

```

### Insert Articles
```sql
INSERT INTO articles (title, slug, description)
VALUES
(
  'Tailwind CSS course',
  'tailwind-css-course',
  'Learn utility-first CSS with Tailwind, responsive design, and modern styling techniques.'
),
(
  'ASP.NET Core Web API',
  'aspnet-core-web-api',
  'Build robust Web APIs using ASP.NET Core, Entity Framework, and REST principles.'
),
(
  'Entity Framework Core',
  'entity-framework-core',
  'Master EF Core ORM, migrations, and database-first and code-first approaches.'
),
(
  'Docker for Developers',
  'docker-for-developers',
  'Learn containerization with Docker, Docker Compose, and deployment workflows.'
),
(
  'System Design Basics',
  'system-design-basics',
  'Introduction to system design, architecture patterns, and scalable systems.'
),
(
  'Clean Architecture',
  'clean-architecture',
  'Understand Clean Architecture principles for maintainable software design.'
),
(
  'Testing in .NET',
  'testing-in-dotnet',
  'Learn unit testing, integration testing, and test-driven development in .NET.'
)
('Vue.js Fundamentals', 'vuejs-fundamentals', 'Learn Vue.js 3 basics including reactive data, components, and directives.'),
('React Advanced Patterns', 'react-advanced-patterns', 'Dive into render props, HOCs, context, and performance optimization in React.'),
('Angular Complete Guide', 'angular-complete-guide', 'Master Angular 14 including modules, components, services, and RxJS.'),
('Svelte for Beginners', 'svelte-for-beginners', 'Learn Svelte basics, reactive stores, and component-driven development.'),
('Next.js 13', 'nextjs-13', 'Build server-side rendered React applications with Next.js 13 features.'),
('Nuxt.js 3', 'nuxtjs-3', 'Master SSR and static site generation using Nuxt.js 3.'),
('GraphQL API Development', 'graphql-api-development', 'Learn how to build GraphQL APIs with queries, mutations, and subscriptions.'),
('RESTful API Design', 'restful-api-design', 'Best practices for designing scalable REST APIs with proper HTTP semantics.'),
('Microservices Architecture', 'microservices-architecture', 'Introduction to microservices patterns, communication, and deployment strategies.'),
('Kubernetes Basics', 'kubernetes-basics', 'Learn Kubernetes core concepts, pods, deployments, and services.'),
('Docker Compose in Depth', 'docker-compose-in-depth', 'Learn multi-container applications and orchestration with Docker Compose.'),
('CI/CD with GitHub Actions', 'ci-cd-github-actions', 'Automate builds, tests, and deployments using GitHub Actions workflows.'),
('Redis for Developers', 'redis-for-developers', 'Use Redis for caching, pub/sub, and fast data storage in applications.'),
('PostgreSQL Advanced', 'postgresql-advanced', 'Master PostgreSQL queries, indexing, transactions, and performance tuning.'),
('MongoDB Essentials', 'mongodb-essentials', 'Learn MongoDB CRUD, aggregation, and schema design for modern apps.'),
('Web Security Basics', 'web-security-basics', 'Understand authentication, authorization, XSS, CSRF, and security best practices.'),
('OAuth2 and JWT', 'oauth2-jwt', 'Implement secure authentication and authorization using OAuth2 and JWT tokens.'),
('React Native Mobile Apps', 'react-native-mobile-apps', 'Build cross-platform mobile applications using React Native and Expo.'),
('Flutter for Beginners', 'flutter-for-beginners', 'Learn Flutter basics and build fast native mobile apps.'),
('TypeORM with Node.js', 'typeorm-nodejs', 'Work with TypeORM for database operations in Node.js applications.');
```

### Article ↔ Tags Mapping
```sql
-- Vue.js Fundamentals
INSERT INTO article_tags (article_id, tag_id)
SELECT a.id, t.id
FROM articles a
JOIN tags t ON t.id IN ('Frontend', 'Web', 'Vue')
WHERE a.title = 'Vue.js Fundamentals';

-- React Advanced Patterns
INSERT INTO article_tags (article_id, tag_id)
SELECT a.id, t.id
FROM articles a
JOIN tags t ON t.id IN ('Frontend', 'Web', 'React')
WHERE a.title = 'React Advanced Patterns';

-- Angular Complete Guide
INSERT INTO article_tags (article_id, tag_id)
SELECT a.id, t.id
FROM articles a
JOIN tags t ON t.id IN ('Frontend', 'Web', 'Angular')
WHERE a.title = 'Angular Complete Guide';

-- Svelte for Beginners
INSERT INTO article_tags (article_id, tag_id)
SELECT a.id, t.id
FROM articles a
JOIN tags t ON t.id IN ('Frontend', 'Web', 'Svelte')
WHERE a.title = 'Svelte for Beginners';

-- Next.js 13
INSERT INTO article_tags (article_id, tag_id)
SELECT a.id, t.id
FROM articles a
JOIN tags t ON t.id IN ('Frontend', 'Web', 'React', 'SSR')
WHERE a.title = 'Next.js 13';

-- Nuxt.js 3
INSERT INTO article_tags (article_id, tag_id)
SELECT a.id, t.id
FROM articles a
JOIN tags t ON t.id IN ('Frontend', 'Web', 'Vue', 'SSR')
WHERE a.title = 'Nuxt.js 3';

-- GraphQL API Development
INSERT INTO article_tags (article_id, tag_id)
SELECT a.id, t.id
FROM articles a
JOIN tags t ON t.id IN ('API', 'Backend', 'GraphQL')
WHERE a.title = 'GraphQL API Development';

-- RESTful API Design
INSERT INTO article_tags (article_id, tag_id)
SELECT a.id, t.id
FROM articles a
JOIN tags t ON t.id IN ('API', 'Backend', 'REST')
WHERE a.title = 'RESTful API Design';

-- Microservices Architecture
INSERT INTO article_tags (article_id, tag_id)
SELECT a.id, t.id
FROM articles a
JOIN tags t ON t.id IN ('Architecture', 'Backend', 'Microservices')
WHERE a.title = 'Microservices Architecture';

-- Kubernetes Basics
INSERT INTO article_tags (article_id, tag_id)
SELECT a.id, t.id
FROM articles a
JOIN tags t ON t.id IN ('DevOps', 'Infrastructure', 'Kubernetes')
WHERE a.title = 'Kubernetes Basics';

-- Docker Compose in Depth
INSERT INTO article_tags (article_id, tag_id)
SELECT a.id, t.id
FROM articles a
JOIN tags t ON t.id IN ('DevOps', 'Docker', 'Backend')
WHERE a.title = 'Docker Compose in Depth';

-- CI/CD with GitHub Actions
INSERT INTO article_tags (article_id, tag_id)
SELECT a.id, t.id
FROM articles a
JOIN tags t ON t.id IN ('DevOps', 'CI/CD', 'Automation')
WHERE a.title = 'CI/CD with GitHub Actions';

-- Redis for Developers
INSERT INTO article_tags (article_id, tag_id)
SELECT a.id, t.id
FROM articles a
JOIN tags t ON t.id IN ('Database', 'Backend', 'Cache')
WHERE a.title = 'Redis for Developers';

-- PostgreSQL Advanced
INSERT INTO article_tags (article_id, tag_id)
SELECT a.id, t.id
FROM articles a
JOIN tags t ON t.id IN ('Database', 'Backend', 'SQL')
WHERE a.title = 'PostgreSQL Advanced';

-- MongoDB Essentials
INSERT INTO article_tags (article_id, tag_id)
SELECT a.id, t.id
FROM articles a
JOIN tags t ON t.id IN ('Database', 'Backend', 'NoSQL')
WHERE a.title = 'MongoDB Essentials';

-- Web Security Basics
INSERT INTO article_tags (article_id, tag_id)
SELECT a.id, t.id
FROM articles a
JOIN tags t ON t.id IN ('Security', 'Web', 'Frontend')
WHERE a.title = 'Web Security Basics';

-- OAuth2 and JWT
INSERT INTO article_tags (article_id, tag_id)
SELECT a.id, t.id
FROM articles a
JOIN tags t ON t.id IN ('Security', 'Backend', 'Authentication')
WHERE a.title = 'OAuth2 and JWT';

-- React Native Mobile Apps
INSERT INTO article_tags (article_id, tag_id)
SELECT a.id, t.id
FROM articles a
JOIN tags t ON t.id IN ('Frontend', 'Mobile', 'React')
WHERE a.title = 'React Native Mobile Apps';

-- Flutter for Beginners
INSERT INTO article_tags (article_id, tag_id)
SELECT a.id, t.id
FROM articles a
JOIN tags t ON t.id IN ('Frontend', 'Mobile', 'Flutter')
WHERE a.title = 'Flutter for Beginners';

-- TypeORM with Node.js
INSERT INTO article_tags (article_id, tag_id)
SELECT a.id, t.id
FROM articles a
JOIN tags t ON t.id IN ('Backend', 'Database', 'Node.js')
WHERE a.title = 'TypeORM with Node.js';

-- Tailwind CSS course
INSERT INTO article_tags (article_id, tag_id)
SELECT a.id, t.id
FROM articles a
JOIN tags t ON t.id IN ('CSS', 'Web', 'Frontend')
WHERE a.title = 'Tailwind CSS course';

-- ASP.NET Core Web API
INSERT INTO article_tags (article_id, tag_id)
SELECT a.id, t.id
FROM articles a
JOIN tags t ON t.id IN ('.NET', 'Backend', 'API', 'Web')
WHERE a.title = 'ASP.NET Core Web API';

-- Entity Framework Core
INSERT INTO article_tags (article_id, tag_id)
SELECT a.id, t.id
FROM articles a
JOIN tags t ON t.id IN ('.NET', 'Database', 'Backend')
WHERE a.title = 'Entity Framework Core';

-- Docker for Developers
INSERT INTO article_tags (article_id, tag_id)
SELECT a.id, t.id
FROM articles a
JOIN tags t ON t.id IN ('Docker', 'Backend', 'Architecture')
WHERE a.title = 'Docker for Developers';

-- System Design Basics
INSERT INTO article_tags (article_id, tag_id)
SELECT a.id, t.id
FROM articles a
JOIN tags t ON t.id IN ('Architecture', 'Backend', 'Performance')
WHERE a.title = 'System Design Basics';

-- Clean Architecture
INSERT INTO article_tags (article_id, tag_id)
SELECT a.id, t.id
FROM articles a
JOIN tags t ON t.id IN ('Architecture', '.NET', 'Backend')
WHERE a.title = 'Clean Architecture';

-- Testing in .NET
INSERT INTO article_tags (article_id, tag_id)
SELECT a.id, t.id
FROM articles a
JOIN tags t ON t.id IN ('Testing', '.NET', 'Backend')
WHERE a.title = 'Testing in .NET';

```
(аналогично для остальных статей)  

---

## API

### Base URL

http://localhost:5298/api

### GET /articles

Возвращает постраничный список статей с тегами.

#### Query Parameters
| Name | Type | Required | Description |
|------|------|----------|-------------|
| page | short | yes | Page index (0-based) |
| limit | short | yes | Page size |
| tags | string[] | no | Filter by tags |

#### Example

GET /api/articles?page=0&limit=10&tags=React&tags=Web

#### Response
```json
{
  "totalPages": 5,
  "articles": [
    {
      "id": "uuid",
      "title": "React course",
      "description": "Learn the fundamentals of React...",
      "tags": ["React", "Frontend", "Web"]
    }
  ]
}
```

### GET /articles

Возвращает список доступных тегов.

#### Query Parameters
| Name | Type | Required | Description |
|------|------|----------|-------------|

#### Example

GET /api/tags

#### Response
```json
["React", "Frontend", "Web"]
```

---

## Development Notes
- Snake_case enforced at the database level  
- UUIDs генерируются в PostgreSQL (gen_random_uuid())  
- No cascade deletes (только явный контроль)  
- Many-to-many реализовано через явную таблицу связей  
- API frontend-agnostic
