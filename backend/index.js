const express = require('express');
const cors = require('cors');
const { sequelize, Task } = require('./database/db');
const app = express();
const port = 5000;
app.use(express.json());
app.use(cors());
app.get('/', (req, res) => {
    res.send('¡Servidor del Task Manager funcionando!');
});
app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.findAll();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las tareas.' });
    }
});
app.post('/tasks', async (req, res) => {
    try {
        const { title, description } = req.body;
        const newTask = await Task.create({ title, description });
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la tarea.' });
    }
});
app.put('/tasks/:id', async (req, res) => {
    try {
        const taskId = req.params.id;
        const { title, description, completed } = req.body;
        const [updatedRows] = await Task.update(
            { title, description, completed },
            { where: { id: taskId } }
        );
        if (updatedRows > 0) {
            const updatedTask = await Task.findByPk(taskId);
            res.status(200).json(updatedTask);
        } else {
            res.status(404).json({ error: 'Tarea no encontrada.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la tarea.' });
    }
});
app.delete('/tasks/:id', async (req, res) => {
    try {
        const taskId = req.params.id;
        const deletedRows = await Task.destroy({ where: { id: taskId } });
        if (deletedRows > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Tarea no encontrada.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al borrar la tarea.' });
    }
});
const startServer = async () => {
    try {
        await sequelize.sync({ alter: true });
        console.log('Base de datos y modelos sincronizados.');
        app.listen(port, () => {
            console.log(`Servidor escuchando en http://localhost:${port}`);
        });
    } catch (error) {
        console.error('Error al iniciar el servidor:', error);
    }
};
startServer();