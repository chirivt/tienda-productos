//  const { data } = require("autoprefixer");
// import { createNotification } from "../components/notification.js";

const API_URL = "/api/productos";
const form = document.getElementById("producto-form");
const cancelarBtn = document.getElementById("cancelar-edicion");
const productosBody = document.getElementById("productos-body");
const productoId = document.getElementById("producto-id");
const nombre = document.getElementById("nombre");
const descripcion = document.getElementById("descripcion");
const precio = document.getElementById("precio");
const imagen = document.getElementById("imagen");

let editando = false;
let idEdit = '';

// Cargar productos al iniciar
window.addEventListener("DOMContentLoaded", cargarProductos);

async function cargarProductos() {
  const res = await fetch(API_URL);
  const productos = await res.json();
  console.log('productos', productos);
  
  productosBody.innerHTML = "";
  productos.forEach(p => {
    productosBody.innerHTML += `
      <tr>
        <td><img src="${p.imagen}" alt="${p.nombre}"></td>
        <td>${p.nombre}</td>
        <td>$${p.precio.toFixed(2)}</td>
        <td>${p.descripcion || "-"}</td>
        <td>
          <button onclick="editarProducto('${p._id}')">✏️</button>
          <button onclick="eliminarProducto('${p._id}')">🗑️</button>
        </td>
      </tr>
    `;
  });
}

// Crear o actualizar producto
form.addEventListener("submit", async e => {
  e.preventDefault();
  const producto = {
    nombre: nombre.value,
    descripcion: descripcion.value,
    precio: parseFloat(precio.value),
    imagen: imagen.value
  };

  if (editando) {
    // await fetch(`${API_URL}/${productoId.value}`, {
    //   method: "PUT",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(producto)
    // });
		const respuesta = await axios.put(`/api/admin/${idEdit}`, { producto });
    console.log('respuesta', respuesta);
    editando = false;
    cancelarBtn.style.display = "none";
    form.querySelector("button[type='submit']").textContent = "Guardar";
  } else {
    // Registro de nuevo producto
    console.log("producto", producto);
     const {data} = await axios.post("/api/admin", producto);
     console.log(data);
    //  createNotification(false,data);
  }

  form.reset();
  cargarProductos();
});

// Editar producto
async function editarProducto(id) {
  console.log('id', id);
  idEdit = id;
  
  const res = await fetch(`${API_URL}`);
  const productos = await res.json();
  console.log('productos en editarProducto', productos);

  const p = productos.find(prod => prod._id === id);
  console.log('p', p);
  

  productoId.value = p._id;
  nombre.value = p.nombre;
  descripcion.value = p.descripcion;
  precio.value = p.precio;
  imagen.value = p.imagen;

  editando = true;
  cancelarBtn.style.display = "inline-block";
  form.querySelector("button[type='submit']").textContent = "Actualizar";
}

// Eliminar producto
async function eliminarProducto(id) {
  if (confirm("¿Seguro que deseas eliminar este producto?")) {
    // await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    	const respuesta = await axios.delete(`/api/admin/${id}`);
    console.log('respuesta', respuesta);
    cargarProductos();
  }
}

cancelarBtn.addEventListener("click", () => {
  editando = false;
  form.reset();
  cancelarBtn.style.display = "none";
  form.querySelector("button[type='submit']").textContent = "Guardar";
});
