const express = require("express");
const app = express();
const tasks = require("./routers/tasks");
const connectDB = require("./db/connect");
const notFound = require("./middleware/not-found");
const asyncWrapper = require("./middleware/async");

// importing credentials in .env file
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// middlewares
app.use(express.static("./public"));
app.use(express.json());
// app.use(asyncWrapper());

// routes
app.get("/hello", (req, res) => {
  res.status(200).send("Task Manager App");
});

// routes for /api/v1/tasks
app.use("/api/v1/tasks", tasks);

app.use(notFound);

const start = async () => {
  try {
    console.log("Connecting to DATABASE...");
    await connectDB(MONGO_URI);
    app.listen(PORT, () => console.log(`Server is listening to port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
