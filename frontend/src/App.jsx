import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import './App.css';
const App = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('http://localhost:5000/tasks');
      setTasks(response.data);
      setError(null);
    } catch (err) {
      console.error('Error al obtener las tareas:', err);
      setError('No se pudieron cargar las tareas. ¿El servidor está funcionando?');
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchTasks();
  }, []);
  const handleTaskCreated = () => {
    fetchTasks();
  };
  if (isLoading) {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Gestor de Tareas</h1>
        </header>
        <main>
          <p>Cargando tareas...</p>
        </main>
      </div>
    );
  }
  if (error) {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Gestor de Tareas</h1>
        </header>
        <main>
          <p className="error">{error}</p>
        </main>
      </div>
    );
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>Gestor de Tareas</h1>
      </header>
      <main>
        <TaskForm onTaskCreated={handleTaskCreated} />
        <TaskList tasks={tasks} onTaskUpdated={fetchTasks} onTaskDeleted={fetchTasks} />
      </main>
    </div>
  );
};
export default App;