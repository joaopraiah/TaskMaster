import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  // Buscar tarefas
  useEffect(() => {
    axios.get('http://localhost:5000/tasks')
      .then(res => setTasks(res.data))
      .catch(err => console.error(err));
  }, []);

  // Adicionar tarefa
  const addTask = () => {
    const task = { id: Date.now(), text: newTask, status: 'To do', priority: 'Low' };
    axios.post('http://localhost:5000/tasks', task)
      .then(res => setTasks([...tasks, res.data]))
      .catch(err => console.error(err));
    setNewTask('');
  };

  // Atualizar status
  const updateTask = (id, status) => {
    const updatedTask = tasks.find(task => task.id === id);
    updatedTask.status = status;

    axios.put(`http://localhost:5000/tasks/${id}`, updatedTask)
      .then(() => setTasks(tasks.map(task => (task.id === id ? updatedTask : task))))
      .catch(err => console.error(err));
  };

  // Remover tarefa
  const deleteTask = (id) => {
    axios.delete(`http://localhost:5000/tasks/${id}`)
      .then(() => setTasks(tasks.filter(task => task.id !== id)))
      .catch(err => console.error(err));
  };

  return (
    <div className="app">
      <h1>To-Do List</h1>
      <div className="input-container">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Digite uma nova tarefa"
        />
        <button onClick={addTask}>Adicionar</button>
      </div>
      <div className="tasks-container">
        {['To do', 'In progress', 'Done'].map(status => (
          <div key={status} className="column">
            <h2>{status}</h2>
            {tasks.filter(task => task.status === status).map(task => (
              <div key={task.id} className="task">
                <p>{task.text}</p>
                <button onClick={() => updateTask(task.id, 'In progress')}>Em progresso</button>
                <button onClick={() => updateTask(task.id, 'Done')}>Concluir</button>
                <button onClick={() => deleteTask(task.id)}>Excluir</button>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
