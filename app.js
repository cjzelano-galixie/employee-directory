import express from "express";
import employees from "#db/employees";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello employees!");
});

app.get("/employees", (req, res) => {
  res.json(employees);
});

app.get("/employees/random", (req, res) => {
  const randEmploy = Math.floor(Math.random() * employees.length);
  res.json(employees[randEmploy]);
});

app.get("/employees/:id", (req, res) => {
  const employID = Number(req.params.id);
  if (typeof employID !== "number" || Number.isNaN(employID)) {
    return res.send("invalid query parameter");
  }

  if (employID >= employees.length) {
    return res.status(404).send("No employee found with that id");
  }
  res.json({ success: true, data: employees[employID] });
});

export default app;
