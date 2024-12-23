const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

let locations = [];

app.get('/locations', (req, res) => {
    res.json(locations);
});

app.post('/locations', (req, res) => {
    const { name, address, lat, lng } = req.body;
    if (name && address && lat && lng) {
        locations.push({ id: Date.now(), name, address, lat, lng });
        res.status(201).json({ message: 'Ubicación agregada correctamente.' });
    } else {
        res.status(400).json({ message: 'Todos los campos son requeridos.' });
    }
});

app.put('/locations/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const location = locations.find(loc => loc.id === parseInt(id));
    if (location) {
        location.name = name;
        res.json({ message: 'Ubicación actualizada correctamente.' });
    } else {
        res.status(404).json({ message: 'Ubicación no encontrada.' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
