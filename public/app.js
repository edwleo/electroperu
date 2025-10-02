// app.js

const API_URL = "http://localhost:3000/api/productos"; // Asegúrate que el puerto coincida con tu server.js

// Referencias a elementos del DOM
const form = document.getElementById("producto-form");
const tableBody = document.querySelector("#productos-table tbody");
const idInput = document.getElementById("producto-id");
const descInput = document.getElementById("descripcion");
const precioInput = document.getElementById("precio");
const garantiaInput = document.getElementById("garantia");
const submitBtn = document.getElementById("submit-btn");
const cancelBtn = document.getElementById("cancel-btn");
const formTitle = document.getElementById("form-title");

// -------------------------------------------------------------
// 1. READ (Obtener todos los productos)
// -------------------------------------------------------------
async function obtenerProductos() {
  try {
    const response = await fetch(API_URL);
    const productos = await response.json();

    // Limpiar la tabla antes de rellenar
    tableBody.innerHTML = "";

    productos.forEach((producto) => {
      const row = tableBody.insertRow();

      row.insertCell().textContent = producto.id;
      row.insertCell().textContent = producto.descripcion;
      row.insertCell().textContent = producto.precio;
      row.insertCell().textContent = producto.garantia;

      // Columna de acciones (botones)
      const actionsCell = row.insertCell();

      const editBtn = document.createElement("button");
      editBtn.textContent = "Editar";
      editBtn.classList.add("edit-btn");
      editBtn.onclick = () => cargarParaEdicion(producto);

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Eliminar";
      deleteBtn.classList.add("delete-btn");
      deleteBtn.onclick = () =>
        eliminarProducto(producto.id, producto.descripcion);

      actionsCell.appendChild(editBtn);
      actionsCell.appendChild(deleteBtn);
    });
  } catch (error) {
    console.error("Error al obtener productos:", error);
    alert("Error al cargar la lista de productos.");
  }
}

// -------------------------------------------------------------
// 2. CREATE y UPDATE (Manejo del formulario)
// -------------------------------------------------------------
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = idInput.value;
  const isEditing = id !== "";

  // Recolectar datos del formulario
  const productoData = {
    descripcion: descInput.value,
    garantia: parseInt(garantiaInput.value),
    precio: parseFloat(precioInput.value),
  };

  try {
    let response;
    if (isEditing) {
      // Lógica de UPDATE (PUT)
      response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productoData),
      });
      alert(`Producto ${id} actualizado correctamente.`);
    } else {
      // Lógica de CREATE (POST)
      response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productoData),
      });
      alert("Producto creado correctamente.");
    }

    if (!response.ok) {
      // Manejar errores del servidor (ej. 400 Bad Request)
      throw new Error(`Error en la operación: ${response.statusText}`);
    }

    // Resetear y recargar la lista
    resetForm();
    obtenerProductos();
  } catch (error) {
    console.error("Error en la operación:", error);
    alert(`Fallo la operación: ${error.message}`);
  }
});

// -------------------------------------------------------------
// 3. DELETE (Eliminar producto)
// -------------------------------------------------------------
async function eliminarProducto(id, descripcion) {
  if (
    !confirm(
      `¿Estás seguro de que quieres eliminar el producto: "${descripcion}" (ID: ${id})?`
    )
  ) {
    return; // Cancelar si el usuario dice que no
  }

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Error al eliminar: ${response.statusText}`);
    }

    alert("Producto eliminado correctamente.");
    obtenerProductos(); // Recargar la lista
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    alert("Error al eliminar el producto.");
  }
}

// -------------------------------------------------------------
// 4. Funciones de UTILIDAD
// -------------------------------------------------------------

// Cargar los datos del producto en el formulario para editar
function cargarParaEdicion(producto) {
  idInput.value = producto.id;
  descInput.value = producto.descripcion;
  precioInput.value = producto.precio;
  garantiaInput.value = producto.garantia;

  // Cambiar el UI a modo edición
  formTitle.textContent = `Editar Producto (ID: ${producto.id})`;
  submitBtn.textContent = "Actualizar";
  cancelBtn.style.display = "inline";
}

// Restablecer el formulario al estado de "Crear"
function resetForm() {
  form.reset();
  idInput.value = ""; // Limpiar el ID oculto
  formTitle.textContent = "Crear Nuevo Producto";
  submitBtn.textContent = "Guardar Producto";
  cancelBtn.style.display = "none";
}

// Listener para el botón de cancelar edición
cancelBtn.addEventListener("click", resetForm);

// Inicializar la aplicación cargando los productos al inicio
document.addEventListener("DOMContentLoaded", obtenerProductos);
