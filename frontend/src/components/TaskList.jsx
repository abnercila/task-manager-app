import React from 'react';
import TaskItem from './TaskItem';
import '../List.css';
const TaskList = ({ tasks, onTaskUpdated, onTaskDeleted }) => {
  if (!Array.isArray(tasks)) {
    return <p>No se pudo cargar la lista de tareas.</p>;
  }
  return (
    <div className="task-list">
      <h2>Lista de Tareas</h2>
      {tasks.length > 0 ? (
        <ul>
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onTaskUpdated={onTaskUpdated}
              onTaskDeleted={onTaskDeleted}
            />
          ))}
        </ul>
      ) : (
        <p>No hay tareas. ¡Agrega una!</p>
      )}
    </div>
  );
};
export default TaskList;