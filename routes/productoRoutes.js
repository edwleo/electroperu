const express = require('express')
const router = express.Router()
const productoController = require('../controllers/productoController')

//RUTAS:

//CREATE
router.post('/', productoController.crearProducto)

//READ
router.get('/', productoController.obtenerProductos)

//READ BY ID
router.get('/:id', productoController.obtenerProductoPorId)

//UPDATE
router.put('/:id', productoController.actualizarProducto)

//DELETE
router.delete('/:id', productoController.eliminarProducto)

module.exports = router