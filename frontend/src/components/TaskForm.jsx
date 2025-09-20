import React, { useState } from 'react';
import axios from 'axios';
import '../Form.css';
const TaskForm = ({ onTaskCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/tasks', { title, description });
      setTitle('');
      setDescription('');
      onTaskCreated();
    } catch (error) {
      console.error('Error al crear la tarea:', error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Título de la tarea"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <button type="submit">Agregar Tarea</button>
    </form>
  );
};
export default TaskForm;