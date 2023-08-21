# Review Files

This repository contains several projects designed to provide hands-on
experience in building web applications. Each project focuses on different
aspects of web development, from frontend design to backend server setup and
database integrations.

## Overview

1. **HTML/CSS Basics** - This module focuses on basic web design principles,
   using flexbox and grid layouts.
2. **Simple Express Server** - A beginner's introduction to setting up a Node.js
   server using Express.js.
3. **Pokédex** - A frontend-only project that displays Pokémon using the
   PokéAPI.
4. **ToDo List App** - A full-stack application with frontend and backend
   functionalities, using Node.js, Express, and Sequelize to interact with a
   MySQL database.

## Learning Objectives

- Understand the basics of HTML and CSS, and get acquainted with layout designs
  like flexbox and grid.
- Learn to set up a basic Express server and understand HTTP methods.
- Fetch and display data from APIs.
- Learn CRUD operations in a full-stack application.
- Understand the basics of connecting to and manipulating a MySQL database using
  Sequelize.

## Running the Projects

### 1. HTML/CSS Basics

- **Files**: `index.html`, `style.css`, `border-box, grid, flexbox html + css`
- **Instructions**:
  - Simply open the `index.html` file in a browser or use the `Live Server`
    extension in Visual Studio Code.

### 2. Simple Express Server

- **Files**: `simple-express-server.js`
- **Instructions**:
  1. Navigate to the project directory in the terminal.
  2. Run `npm install express` to install the required dependencies.
  3. Run `node simple-express-server.js` to start the server.

### 3. Pokédex

- **Files**: `pokedex.html`, `pokedex.css`, `pokedex-script.js`
- **Instructions**:
  - Simply open the `pokedex.html` file in a browser or use the `Live Server`
    extension in Visual Studio Code.

### 4. ToDo List App

- **Files**: `todo.html`, `todo.css`, `todo-script.js`, `todo-server.js`
- **Instructions**:
  1. Navigate to the project directory in the terminal.
  2. Run `npm install express sequelize mysql2` to install the required
     dependencies.
  3. Ensure you have MySQL server running and a database/schema named `todo`
     available.
  4. In the `todo-server.js`, the MySQL connection is set up using the following
     credentials:
     - Username: `root`
     - Password: `password`
     - Schema: `todo`
  5. Run `node todo-server.js` to start the server and ensure the database
     connection is established.
  6. Open the `todo.html` file in a browser or use the `Live Server` extension
     in Visual Studio Code.
