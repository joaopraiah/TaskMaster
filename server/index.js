const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let tasks = [];

// Rotas
app.get('/tasks', (req, res) => res.json(tasks));

app.post('/tasks', (req, res) => {
  const newTask = req.body;
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const updatedTask = req.body;

  tasks = tasks.map(task => (task.id === parseInt(id) ? updatedTask : task));
  res.json(updatedTask);
});

app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter(task => task.id !== parseInt(id));
  res.status(204).send();
});

// Iniciar servidor
app.listen(5000, () => console.log('Servidor rodando na porta 5000'));
