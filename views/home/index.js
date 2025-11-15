const API_URL = "/api/productos";

document.addEventListener("DOMContentLoaded", () => {
  const botonesAgregar = document.querySelectorAll(".add-to-cart");
  const cartCount = document.getElementById("cart-count");

  cargarProductos();

  actualizarContador();

  botonesAgregar.forEach(boton => {
    boton.addEventListener("click", (e) => {
      e.preventDefault();

      const producto = {
        nombre: boton.dataset.nombre,
        precio: parseFloat(boton.dataset.precio),
        imagen: boton.dataset.imagen,
        cantidad: 1
      };

      let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
      const index = carrito.findIndex(p => p.nombre === producto.nombre);

      if (index !== -1) {
        carrito[index].cantidad += 1;
      } else {
        carrito.push(producto);
      }

      localStorage.setItem("carrito", JSON.stringify(carrito));
      actualizarContador();
      mostrarModal(`✅ ${producto.nombre} fue agregado al carrito.`, producto.imagen);
    });
  });

  async function cargarProductos() {
  // reemplazar fetch por axios 
  const res = await fetch(API_URL);
  const productos = await res.json();
  console.log('productos', productos);
  
  // productosBody.innerHTML = "";
  // productos.forEach(p => {
  //   productosBody.innerHTML += `
  //     <tr>
  //       <td><img src="${p.imagen}" alt="${p.nombre}" id="img-producto"></td>
  //       <td>${p.nombre}</td>
  //       <td>$${p.precio.toFixed(2)}</td>
  //       <td>${p.descripcion || "-"}</td>
  //       <td>
  //         <button onclick="editarProducto('${p._id}')">✏️</button>
  //         <button onclick="eliminarProducto('${p._id}')">🗑️</button>
  //       </td>
  //     </tr>
  //   `;
  // });
}

  function actualizarContador() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);

    if (cartCount) {
      cartCount.textContent = totalItems;
      cartCount.classList.toggle("hidden", totalItems === 0);
    }
  }

  function mostrarModal(mensaje, imagen = null) {
    // Eliminar modal previo
    const prevModal = document.querySelector(".notification-modal");
    const prevOverlay = document.querySelector(".notification-overlay");
    if (prevModal) prevModal.remove();
    if (prevOverlay) prevOverlay.remove();

    // Crear overlay
    const overlay = document.createElement("div");
    overlay.className = "notification-overlay";

    // Crear modal
    const modal = document.createElement("div");
    modal.className = "notification-modal top-modal";

    modal.innerHTML = `
      <div class="modal-header">
        <h3>Dulces La Tradición</h3>
      </div>
      ${imagen ? `<img src="${imagen}" alt="Producto" class="modal-img">` : ""}
      <p>${mensaje}</p>
      <button class="notification-close">Aceptar</button>
    `;

    document.body.appendChild(overlay);
    document.body.appendChild(modal);
  }

   // ==============================
// TOAST MODAL DINÁMICO RESPONSIVO
// ==============================
const toastModal = document.getElementById("toast-modal");
const toastMessage = document.getElementById("toast-message");
const toastClose = document.getElementById("toast-close");
let toastTimeout;

function showToast(productName) {
  toastMessage.textContent = `"${productName}" agregado al carrito`;

  // Mostrar modal
  toastModal.classList.remove("opacity-0", "pointer-events-none");
  toastModal.classList.add("opacity-100");
  toastModal.querySelector("div").classList.add("scale-100");

  // Ocultar automáticamente después de 3s
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(hideToast, 3000);
}

function hideToast() {
  toastModal.querySelector("div").classList.remove("scale-100");
  toastModal.classList.remove("opacity-100");
  toastModal.classList.add("opacity-0", "pointer-events-none");
}

// Cerrar con botón
toastClose.addEventListener("click", hideToast);

// Integración con botones añadir al carrito
document.querySelectorAll(".add-to-cart").forEach(btn => {
  btn.addEventListener("click", () => {
    const nombre = btn.getAttribute("data-nombre");
    showToast(nombre);
  });
});

});
