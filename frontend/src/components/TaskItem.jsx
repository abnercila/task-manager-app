import React, { useState } from 'react';
import axios from 'axios';
const TaskItem = ({ task, onTaskUpdated, onTaskDeleted }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(task.title);
    const [newDescription, setNewDescription] = useState(task.description);
    const handleToggleCompleted = async () => {
        try {
            await axios.put(`http://localhost:5000/tasks/${task.id}`, {
                completed: !task.completed,
            });
            onTaskUpdated();
        } catch (error) {
            console.error('Error al actualizar la tarea:', error);
        }
    };
    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/tasks/${task.id}`);
            onTaskDeleted();
        } catch (error) {
            console.error('Error al borrar la tarea:', error);
        }
    };
    const handleSaveEdit = async () => {
        try {
            await axios.put(`http://localhost:5000/tasks/${task.id}`, {
                title: newTitle,
                description: newDescription,
            });
            setIsEditing(false);
            onTaskUpdated();
        } catch (error) {
            console.error('Error al guardar la edición:', error);
        }
    };
    const handleCancelEdit = () => {
        setIsEditing(false);
        setNewTitle(task.title);
        setNewDescription(task.description);
    };
    return (
        <li className={task.completed ? 'completed' : ''}>
            {isEditing ? (
                <div>
                    <input
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                    />
                    <textarea
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                    ></textarea>
                    <div className="edit-actions">
                        <button onClick={handleSaveEdit}>Guardar</button>
                        <button onClick={handleCancelEdit}>Cancelar</button>
                    </div>
                </div>
            ) : (
                <div>
                    <strong>{task.title}</strong>
                    <p>{task.description}</p>
                    <div>
                        <button onClick={() => setIsEditing(true)}>Editar</button>
                        <button onClick={handleToggleCompleted}>
                            {task.completed ? 'Desmarcar' : 'Completar'}
                        </button>
                        <button onClick={handleDelete}>Borrar</button>
                    </div>
                </div>
            )}
        </li>
    );
};
export default TaskItem;