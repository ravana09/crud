const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Student = require('./student');

const app = express();
const port = 4000;

// MongoDB Connection URI
const mongoURI = 'mongodb://localhost:27017/student-data';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

app.use(bodyParser.json());

// Routes
app.get('/students', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/students', async (req, res) => {
    const { name, email, phoneNumber } = req.body;
    const student = new Student({ name, email, phoneNumber });
    try {
        await student.save();
        res.sendStatus(201);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/students/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await Student.findByIdAndDelete(id);
        res.sendStatus(200);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/', (req, res) => {
    res.send('Welcome to the CRUD application!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})
