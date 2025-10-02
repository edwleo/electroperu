//Iniciará el servidor
const express = require('express')
const cors = require('cors') //Agregado al final
const path = require('path') //Express servirá el frontEnd
const productoRoutes = require('./routes/productoRoutes')

const app = express()
const PORT = process.env.PORT || 3000

//Configuración de CORS: permite al frontend acceda al backend
app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
}))

//SERVIR ARCHIVOS ESTÁTICOS (HTML, CSS, JS)
//Indicar a express donde están los archivos estáticos
app.use(express.static(path.join(__dirname, 'public')))

//Ruta por defecto para index.html
//Define la ruta raíz ('/') para servir el index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

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