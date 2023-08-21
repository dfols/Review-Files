// Importing the express module
const express = require("express");

// Initializing an express application
const app = express();

// Setting the port on which the server will listen
const port = 8000;

// Middleware to parse incoming JSON requests
app.use(express.json());

// GET request endpoint at the root route that sends a response back
app.get("/", (req, res) => {
  res.send("I'm a server!");
});

// POST request endpoint at the root route that echoes back the received JSON data
app.post("/", (req, res) => {
  let obj = req.body; // Extracting the body from the request
  res.send(obj); // Sending the received data back as a response
});

// Starting the server and listening for requests on the defined port
app.listen(port, () => {
  console.log(`Server is listen on port ${port}!`);
});

// Export express app for jest
module.exports = app;
