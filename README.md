<div align="center">

# My-Projects

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-5-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-8-880000)
![JWT](https://img.shields.io/badge/JWT-000000?logo=jsonwebtokens&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

**My collection of full-stack projects. Currently home to a Stock Management System — an inventory app with an Express + MongoDB backend and a plain HTML/CSS/JS frontend.**

![Stock Management System preview](assets/hero.webp)

</div>

---

## What's inside

### Stock Management System (`stock-management-system/`)

A complete inventory management app: log in, add/update/delete stock items, and review a history of every change.

**Features**
- JWT-based login protecting all API routes
- Full item CRUD (`GET/POST/PUT/DELETE /api/items`)
- Change-history log (`/api/history`) tracking every inventory update
- Security middleware — Helmet, CORS, and request rate limiting
- Password hashing with bcryptjs
- Three-page frontend (dashboard, login, product history) served directly by Express
- MongoDB via Mongoose with a dedicated connection module

**Tech stack**

| Layer | Tech |
|---|---|
| Backend | Express.js, Node.js |
| Database | MongoDB + Mongoose |
| Auth | JSON Web Tokens (jsonwebtoken), bcryptjs |
| Security | Helmet, CORS, express-rate-limit |
| Frontend | Plain HTML, CSS, JavaScript (no framework) |

## Run it locally

You'll need Node.js and a MongoDB connection string.

```bash
# 1. Clone the repo
git clone https://github.com/hussnainahmedd/My-Projects.git
cd My-Projects/stock-management-system/backend

# 2. Install dependencies
npm install

# 3. Configure the backend
# Create a .env file with:
#   MONGODB_URI=<your MongoDB connection string>
#   SECRET_KEY=<a random secret for JWT signing>
#   PORT=5000

# 4. Start the server
node app.js
```

Open `http://localhost:5000` — the server serves the frontend itself, no separate frontend build needed.

## Project structure

```
stock-management-system/
├── backend/
│   ├── app.js            # Express app, API routes, static file serving
│   ├── config/db.js      # Mongoose connection
│   ├── controllers/      # Item CRUD logic
│   ├── models/           # Item, User, History schemas
│   └── middleware/       # JWT auth, security headers, error handling
└── frontend/
    ├── index.html        # Dashboard — add & update items
    ├── login.html        # Login page
    └── product-history.html  # Change history view
```

## Contact

**Hussnain Ahmad** — BSCS student & builder, Air University, Islamabad

GitHub: https://github.com/hussnainahmedd
