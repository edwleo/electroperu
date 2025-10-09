//Configuración de multer
const multer = require('multer')
const path = require('path')

const uploadDir = './public/uploads'

//Configuración de almacenamiento de Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir)
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, 'foto-' + uniqueSuffix + path.extname(file.originalname))
  }
})

//Filtro de archivos, permitir solo imágenes
const fileFilter = (req, file, cb) => {
  //Expresión regular
  const allowedTypes = /jpeg|jpg|png|gif|webp/
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())
  const mimeType = allowedTypes.test(file.mimetype)

  if (mimeType && extname){
    return cb(null, true)
  }else{
    cb(new Error(`Solo se permiten imágenes (jpeg, jpg, png, gif, webp)`))
  }
}

//Configuración de Multer
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024
  },
  fileFilter: fileFilter
})

module.exports = { upload }