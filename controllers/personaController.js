//const pool = require("./database");
const db = require("../config/db");
const path = require("path");
const fs = require("fs").promises;

const uploadDir = "./public/uploads";

// Función auxiliar para eliminar archivos
const eliminarArchivo = async (filePath) => {
  try {
    if (filePath) {
      const fullPath = path.join("./public", filePath);
      await fs.unlink(fullPath);
    }
  } catch (error) {
    console.log("No se pudo eliminar el archivo:", error.message);
  }
};

// OBTENER TODAS LAS PERSONAS
const obtenerTodas = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM PERSONAS ORDER BY id DESC");
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener personas:", error);
    res.status(500).json({ error: "Error al obtener personas" });
  }
};

// OBTENER UNA PERSONA POR ID
const obtenerPorId = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM PERSONAS WHERE id = ?", [
      req.params.id,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Persona no encontrada" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error al obtener persona:", error);
    res.status(500).json({ error: "Error al obtener persona" });
  }
};

// CREAR NUEVA PERSONA
const crear = async (req, res) => {
  try {
    const { apellidos, nombres, dni } = req.body;
    const fotografia = req.file ? `/uploads/${req.file.filename}` : null;

    // Validar campos requeridos
    if (!apellidos || !nombres || !dni) {
      if (req.file) {
        await eliminarArchivo(`/uploads/${req.file.filename}`);
      }
      return res
        .status(400)
        .json({ error: "Faltan campos requeridos: apellidos, nombres y DNI" });
    }

    // Validar formato de DNI (8 dígitos)
    if (!/^\d{8}$/.test(dni)) {
      if (req.file) {
        await eliminarArchivo(`/uploads/${req.file.filename}`);
      }
      return res
        .status(400)
        .json({ error: "El DNI debe tener exactamente 8 dígitos" });
    }

    // Insertar en la base de datos
    const [result] = await db.query(
      "INSERT INTO PERSONAS (apellidos, nombres, dni, fotografia) VALUES (?, ?, ?, ?)",
      [apellidos, nombres, dni, fotografia]
    );

    res.status(201).json({
      message: "Persona creada exitosamente",
      id: result.insertId,
      fotografia,
    });
  } catch (error) {
    // Si hay error y se subió archivo, eliminarlo
    if (req.file) {
      await eliminarArchivo(`/uploads/${req.file.filename}`);
    }

    console.error("Error al crear persona:", error);

    // Manejar error de DNI duplicado
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(400).json({ error: "El DNI ya está registrado" });
    }

    res.status(500).json({ error: "Error al crear persona" });
  }
};

// ACTUALIZAR PERSONA
const actualizar = async (req, res) => {
  try {
    const { apellidos, nombres, dni } = req.body;
    const id = req.params.id;

    // Verificar si la persona existe
    const [existing] = await db.query(
      "SELECT fotografia FROM PERSONAS WHERE id = ?",
      [id]
    );

    if (existing.length === 0) {
      if (req.file) {
        await eliminarArchivo(`/uploads/${req.file.filename}`);
      }
      return res.status(404).json({ error: "Persona no encontrada" });
    }

    // Validar campos requeridos
    if (!apellidos || !nombres || !dni) {
      if (req.file) {
        await eliminarArchivo(`/uploads/${req.file.filename}`);
      }
      return res
        .status(400)
        .json({ error: "Faltan campos requeridos: apellidos, nombres y DNI" });
    }

    // Validar formato de DNI
    if (!/^\d{8}$/.test(dni)) {
      if (req.file) {
        await eliminarArchivo(`/uploads/${req.file.filename}`);
      }
      return res
        .status(400)
        .json({ error: "El DNI debe tener exactamente 8 dígitos" });
    }

    let fotografia = existing[0].fotografia;

    // Si se subió nueva foto
    if (req.file) {
      // Eliminar foto anterior si existe
      if (fotografia) {
        await eliminarArchivo(fotografia);
      }
      fotografia = `/uploads/${req.file.filename}`;
    }

    // Actualizar en la base de datos
    await db.query(
      "UPDATE PERSONAS SET apellidos = ?, nombres = ?, dni = ?, fotografia = ? WHERE id = ?",
      [apellidos, nombres, dni, fotografia, id]
    );

    res.json({
      message: "Persona actualizada exitosamente",
      fotografia,
    });
  } catch (error) {
    if (req.file) {
      await eliminarArchivo(`/uploads/${req.file.filename}`);
    }

    console.error("Error al actualizar persona:", error);

    // Manejar error de DNI duplicado
    if (error.code === "ER_DUP_ENTRY") {
      return res
        .status(400)
        .json({ error: "El DNI ya está registrado por otra persona" });
    }

    res.status(500).json({ error: "Error al actualizar persona" });
  }
};

// ELIMINAR PERSONA
const eliminar = async (req, res) => {
  try {
    const id = req.params.id;

    // Obtener foto para eliminarla
    const [rows] = await db.query(
      "SELECT fotografia FROM PERSONAS WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Persona no encontrada" });
    }

    // Eliminar foto si existe
    if (rows[0].fotografia) {
      await eliminarArchivo(rows[0].fotografia);
    }

    // Eliminar registro de la base de datos
    await db.query("DELETE FROM PERSONAS WHERE id = ?", [id]);

    res.json({ message: "Persona eliminada exitosamente" });
  } catch (error) {
    console.error("Error al eliminar persona:", error);
    res.status(500).json({ error: "Error al eliminar persona" });
  }
};

module.exports = {
  obtenerTodas,
  obtenerPorId,
  crear,
  actualizar,
  eliminar,
};
