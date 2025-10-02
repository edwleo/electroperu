//Iniciará el servidor
const express = require('express')
const productoRoutes = require('./routes/productoRoutes')

const app = express()
const PORT = process.env.PORT || 3000

//Middleware para parsear el cuerpo de peticionar JSON
app.use(express.json())

//Montar las rutas del CRUD de productos
app.use('/api/productos', productoRoutes)

//Manejo de errores básico
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Problemas en el servidor')
})

//Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`)
})