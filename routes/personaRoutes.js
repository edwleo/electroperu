const express = require('express');
const router = express.Router();
const personaController = require('../controllers/personaController');
const { upload } = require('../middleware');

// RUTAS DEL CRUD

// Obtener todas las personas
router.get('/', personaController.obtenerTodas);

// Obtener una persona por ID
router.get('/:id', personaController.obtenerPorId);

// Crear nueva persona
router.post('/', upload.single('fotografia'), personaController.crear);

// Actualizar persona
router.put('/:id', upload.single('fotografia'), personaController.actualizar);

// Eliminar persona
router.delete('/:id', personaController.eliminar);

module.exports = router;