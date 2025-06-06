 
# FinMate

FinMate is a full-stack personal finance management application built with Express, MongoDB, React, and Vite. The project is organized into two main directories: `backend` (Node.js/Express API with MongoDB) and `frontend` (React app bootstrapped with Vite). This structure allows for scalable development and clear separation of concerns.

---

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Credits](#credits)
- [License](#license)

---

## Features

- RESTful API using Express and MongoDB
- Modern React frontend powered by Vite
- Organized codebase with clear separation between backend and frontend
- All frontend files (except utilities) are `.jsx`
- All backend files are `.js`
- Easy local development with simple start commands

---


## Project File Structure

The FinMate project is organized as follows:

```
FINMATE/
│
├── backend/
│   ├── config/          # Configuration files (e.g., DB connection)
│   ├── controllers/     # Express route controllers
│   ├── middleware/      # Express middleware functions
│   ├── models/          # Mongoose models (MongoDB schemas)
│   ├── node_modules/    # Backend dependencies
│   ├── routes/          # Route definitions
│   ├── uploads/         # File uploads (if any)
│   ├── .env             # Environment variables
│   ├── package.json     # Backend dependencies and scripts
│   ├── package-lock.json
│   └── server.js        # Main entry point for the backend server
│
└── frontend/
    └── FinMate/
        ├── node_modules/    # Frontend dependencies
        ├── public/          # Static assets
        ├── src/             # React source files (.jsx)
        ├── .gitignore
        ├── eslint.config.js
        ├── index.html
        ├── package.json     # Frontend dependencies and scripts
        ├── package-lock.json
        ├── README.md
        └── vite.config.js   # Vite configuration
```


## Tech Stack

| Layer     | Technology         |
|-----------|--------------------|
| Backend   | Node.js, Express   |
| Database  | MongoDB            |
| Frontend  | React, Vite        |

---

## Getting Started

### Backend Setup

Open your terminal and run the following commands:

```bash
cd backend
npm run dev
```

This will start the Express server and connect to MongoDB.

### Frontend Setup

In a new terminal window, run:

```bash
cd frontend/finmate
npm run dev
```

This will start the React frontend using Vite's development server.

---

## Credits

Special thanks to GPT AI for bug fixing assistance all the files have been put into gpt once so that the intendations and bug fixes can be done. 

