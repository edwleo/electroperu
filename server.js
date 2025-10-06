const express = require('express')

//Actualización para desplegar el FRONT-END
const cors = require('cors') //Permisos sobre el contenido a desplegar
const path = require('path') //Express servir el frontend

const productoRoutes = require('./routes/productoRoutes')

const app = express()
const PORT = process.env.PORT || 3000 //Puerto de la App

//Actualización - Permisos cors
app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
}))

//Actualización:
//Servir los documentos HTML, CSS, JS
app.use(express.static(path.join(__dirname, 'public')))

//http://localhost:3000 -> public>index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

//Comunicación se realizará JSON
app.use(express.json())

//Rutas
app.use('/api/productos', productoRoutes)

//Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado http://localhost:${PORT}`)
})
