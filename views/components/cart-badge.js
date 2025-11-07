function actualizarContadorCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  const contador = document.getElementById("contadorCarrito");
  if (contador) contador.textContent = totalItems;
}

// Actualiza al cargar la página
actualizarContadorCarrito();

// Actualiza en tiempo real si cambian los datos del carrito
window.addEventListener("storage", actualizarContadorCarrito);
