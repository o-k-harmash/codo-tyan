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
('Performance')
ON CONFLICT (id) DO NOTHING;
```

### Insert Articles
```sql
INSERT INTO articles (title, slug, description)
VALUES
(
  'React course',
  'react-cource',
  'Learn the fundamentals of React including JSX, hooks, and state management.'
),
(
  'HTML course',
  'html-cource',
  'Master HTML5 semantic layouts, responsive design, and accessibility.'
),
(
  'Advanced JavaScript course',
  'advanced-javascript-cource',
  'Deep dive into closures, async programming, promises, and ES6+ features.'
),
(
  'TypeScript course',
  'advanced-typescript-cource',
  'Learn TypeScript for scalable web applications and backend integration.'
),
(
  'NET core Backend course',
  'net-cource',
  'Build RESTful APIs with Node.js, Express, and databases.'
);
```

### Article ↔ Tags Mapping
```sql
INSERT INTO article_tags (article_id, tag_id)
SELECT a.id, t.id
FROM articles a
JOIN tags t ON t.id IN ('React', 'Frontend', 'Web')
WHERE a.title = 'React course';
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
