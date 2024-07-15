const express = require("express");
const lowDb = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const db = lowDb(new FileSync("task.json"));
const { customAlphabet } = require("nanoid");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/tasks", (req, res) => {
  const tasks = db.get("tasks").value();
  res.status(200).send(tasks);
});

app.get("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);

  const task = db.get("tasks").find({ id: taskId }).value();

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  return res.status(200).send({
    message: `Successfully fetch the task by ID ${taskId}`,
    task: task,
  });
});

app.post("/tasks", (req, res) => {
  const { title, description, completed } = req.body;

  if (
    [title, description, completed].some((field) =>
      typeof field === "string" ? field.trim() === "" : field === undefined
    )
  ) {
    return res.status(400).json({
      error: "Please provide title, description and completed",
    });
  }

  const existingTask = db.get("tasks").find({ title, description }).value();

  if (existingTask) {
    return res.status(409).json({
      error: "Task with the same title and description already exists",
      task: existingTask,
    });
  }
  const nanoid = customAlphabet("1234567890", 10);
  const newTask = {
    id: parseInt(nanoid()),
    title,
    description,
    completed: !!completed,
  };

  db.get("tasks").push(newTask).write();

  return res.status(201).send({
    message: "Task created successfully",
    task: newTask,
  });
});

app.put("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const { title, description, completed } = req.body;

  const task = db.get("tasks").find({ id: taskId }).value();

  if (!task) {
    return res.status(404).send({ error: "Task not found" });
  }

  task.title = title;
  task.description = description;
  task.completed = !!completed;

  db.write();

  res.status(200).send({
    message: "Task updated successfully",
    task: task,
  });
});

app.delete("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);

  const task = db.get("tasks").find({ id: taskId }).value();

  if (!task) {
    return res.status(404).send({ error: "Task not found" });
  }

  db.get("tasks").remove({ id: taskId }).write();

  res.status(200).json({
    message: "Task deleted successfully",
    deletedTask: task,
  });
});

app.listen(port, (err) => {
  if (err) {
    return console.log("Something bad happened", err);
  }
  console.log(`Server is listening on ${port}`);
});

module.exports = app;
