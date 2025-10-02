//variables de entorno
require('dotenv').config()

//Administración de BD
const mysql = require('mysql2/promise')

//Pool de conexiones usando el modo promise
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT
})

//Exportar el objeto para usarlo en los controladores
module.exports = pool