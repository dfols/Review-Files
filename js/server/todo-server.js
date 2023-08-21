// Importing required modules
const express = require("express");
// Importing the main Sequelize object to interact with the database
const { Sequelize } = require("sequelize");
// Importing cors to handle cross-origin requests; currently commented out
// const cors = require("cors");

const app = express();
// Middleware to handle cross-origin requests; currently commented out
// app.use(cors());
// Middleware to parse incoming JSON requests
app.use(express.json());

// Creating a Sequelize instance to connect to a MySQL database
const sequelize = new Sequelize("todo", "root", "password", {
  host: "localhost",
  dialect: "mysql", // Specifying that we're using MySQL
});

// Defining a 'Task' model using Sequelize
// This represents a table in our database
const Task = sequelize.define("Task", {
  description: {
    type: Sequelize.STRING, // The type of the column
    allowNull: false, // The column cannot be null
  },
  completed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false, // Default value for the column
  },
});

// Syncing our model with the database
// { alter: true } means Sequelize will make changes to the table structure if the model has changed
sequelize.sync({ alter: true });

// Endpoint to fetch all tasks from the database
app.get("/tasks", async (req, res) => {
  try {
    // Using Sequelize's findAll method to fetch all tasks from the 'Task' table
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (error) {
    // Handling errors and sending them as a response
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to add a task to the database
app.post("/tasks", async (req, res) => {
  try {
    // Using Sequelize's create method to add a task to the 'Task' table
    const task = await Task.create(req.body);
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to delete a task from the database
app.delete("/tasks/:id", async (req, res) => {
  try {
    // Using Sequelize's destroy method to delete a task based on its ID
    const result = await Task.destroy({ where: { id: req.params.id } });
    if (result) {
      res.json({ message: "Task deleted." });
    } else {
      res.status(404).json({ message: "Task not found." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to update a task's completion status in the database
app.put("/tasks/:id", async (req, res) => {
  try {
    // Using Sequelize's findByPk (Find by primary key) method to fetch a task based on its ID
    const task = await Task.findByPk(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found." });
    }
    // Updating the 'completed' status of the fetched task
    task.completed = req.body.completed;
    // Saving the updated task to the database
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 3000;
// Starting the Express server on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
