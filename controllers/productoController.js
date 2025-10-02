const db = require('../config/db')

//req = require (solicitud), res = response (respuesta)
exports.crearProducto = async(req, res) => {
  //Deserializando datos ingresan como JSON
  const { descripcion, garantia, precio } = req.body

  //Validaciones de backend
  if (!descripcion || garantia == undefined || !precio){
    return res.status(400).json({mensahe: 'Falta completar los datos'})
  }

  //Query
  const sql = 'INSERT INTO productos (descripcion, garantia, precio) VALUES (?,?,?)'

  try{
    //Sintaxis de Promise para MySQL2
    const [result] = await db.query(sql, [descripcion, garantia, precio])
    res.status(201).json({
      id: result.insertId,
      mensaje: 'Producto creado exitosamente'
    })
  }catch(error){
    console.error(error)
    res.status(500).json({mensaje: 'Error interno del servidor'})
  }

} //crearProducto


//OBTENER TODOS
exports.obtenerProductos = async (req, res) => {
  const sql = "SELECT id, descripcion, garantia, precio FROM productos"

  try{
    const [productos] = await db.query(sql)
    res.status(200).json(productos)
  }catch(error){
    console.error(error)
    res.status(500).json({mensaje: 'Error interno del servidor'})
  }
}//obtenerProductos

//OBTENER UN REGISTRO
exports.obtenerProductoPorId = async (req, res) => {
  //Parámetro ingresa por /id
  const {id} = req.params
  const sql = "SELECT id, descripcion, garantia, precio FROM productos WHERE id = ?"

  try{
    const [productos] = await db.query(sql, [id])

    if (productos.length == 0){
      return res.status(404).json({mensaje: 'Producto no encontrado'})
    }

    res.status(200).json(productos[0])
  }catch(error){
    console.error(error)
    res.status(500).json({mensaje: 'Error interno del servidor'})
  }
}//obtenerProductoPorId


exports.actualizarProducto = async (req, res) => {
  const {id} = req.params //Solicitud por URL /id
  const {descripcion, garantia, precio} = req.body //Solicitud por JSON

  //Al menos uno de los campos se actualizará
  if (!descripcion && garantia == undefined && !precio){
    return res.status(400).json({mensaje: 'Debe proporcionar al menos un campo'})
  }

  //Se creará la consulta de forma dinámica
  let sqlParts = []
  let values = []

  if (descripcion){
    sqlParts.push('descripcion = ?')
    values.push(descripcion)
  }

  if (garantia != undefined){
    sqlParts.push('garantia = ?')
    values.push(garantia)
  }

  if (precio){
    sqlParts.push('precio = ?')
    values.push(precio)
  }

  if (sqlParts.length == 0){
    return res.status(400).json({mensaje: 'No hay datos para actualizar'})
  }

  //Se estructura la consulta de los campos que se actualizarán
  const sql = `UPDATE productos SET ${sqlParts.join(', ')} WHERE id = ?`
  //Se agrega la PK como último valor
  values.push(id)

  try{
    const [result] = await db.query(sql, values)

    if (result.affectedRows === 0){
      return res.status(404).json({mensaje: 'Producto no encontrado para actualizar'})
    }

    res.status(200).json({mensaje: 'Producto actualizado correctamente'})
  }
  catch(error){
    console.error(error)
    res.status(500).json({mensaje: 'Error interno en el servidor'})
  }

} //actualizarProducto


exports.eliminarProducto = async(req, res) => {
  const { id } = req.params
  const sql = 'DELETE FROM productos WHERE id = ?'

  try{
    const [result] = await db.query(sql, [id])

    if (result.affectedRows === 0){
      return res.status(404).json({mensaje: 'Producto no encontrado para eliminar'})
    }

    res.status(200).json({mensaje: 'Producto eliminado correctamente'})
  }catch(error){
    console.error(error)
    res.status(500).json({mensaje: 'Error interno del servidor'})
  }
}