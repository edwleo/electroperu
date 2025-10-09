const express = require('express')

//Actualización para desplegar el FRONT-END
const cors = require('cors') //Permisos sobre el contenido a desplegar
const path = require('path') //Express servir el frontend
const fs = require('fs').promises

const productoRoutes = require('./routes/productoRoutes')
const personaRoutes = require('./routes/personaRoutes') //Actualización

const app = express()
const PORT = process.env.PORT || 3000 //Puerto de la App

//Permisos cors
app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
}))

//Actualización
const uploadDir = './public/uploads'
fs.mkdir(uploadDir, {recursive: true})

//MIDDLEWARE (intermediario)
//Actualización: Manejar datos de formularios
app.use(express.urlencoded({extended: true}))
//Servir los documentos HTML, CSS, JS
app.use(express.static(path.join(__dirname, 'public')))
//Comunicación se realizará JSON
app.use(express.json())


//http://localhost:3000 -> public>index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.get('/persona/crear', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'persona.html'))
})


//Rutas
app.use('/api/productos', productoRoutes)

//Actualización ruta
app.use('/api/personas', personaRoutes)

//Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado http://localhost:${PORT}`)
})
