function obtenerCarrito() {
  return JSON.parse(localStorage.getItem("carrito")) || [];
}

function mostrarCarrito() {
  const carrito = obtenerCarrito();
  const contenedor = document.getElementById("cart-items");
  const totalEl = document.getElementById("total");

  contenedor.innerHTML = "";
  let total = 0;

  carrito.forEach((item, index) => {
    const subtotal = item.precio * item.cantidad;
    total += subtotal;

    const div = document.createElement("div");
    div.classList.add("item-carrito");
    div.innerHTML = `
      <span>${item.nombre} x${item.cantidad}</span>
      <span>$${subtotal.toFixed(2)}</span>
      <button class="btn" onclick="eliminarDelCarrito(${index})">X</button>
    `;
    contenedor.appendChild(div);
  });

  totalEl.textContent = total.toFixed(2);
}

function eliminarDelCarrito(index) {
  let carrito = obtenerCarrito();
  carrito.splice(index, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();
}

document.addEventListener("DOMContentLoaded", () => {
  mostrarCarrito();

  document.getElementById("vaciar-carrito").addEventListener("click", () => {
    localStorage.removeItem("carrito");
    mostrarCarrito();
  });

  const btnFinalizar = document.getElementById("finalizar-compra");
  const cerrarModal = document.getElementById("cerrar-modal");
  const formConfirmacion = document.getElementById("form-confirmacion");

  btnFinalizar.addEventListener("click", () => {
    document.getElementById("modal-confirmacion").style.display = "block";
  });

  cerrarModal.addEventListener("click", () => {
    document.getElementById("modal-confirmacion").style.display = "none";
  });

  formConfirmacion.addEventListener("submit", (event) => {
    event.preventDefault();
    enviarPedidoWhatsApp();
  });

  window.onclick = function (event) {
    const modal = document.getElementById("modal-confirmacion");
    if (event.target === modal) modal.style.display = "none";
  };
});

function enviarPedidoWhatsApp() {
  const carrito = obtenerCarrito();
  if (carrito.length === 0) {
    alert("Tu carrito está vacío 🛍️");
    return;
  }

  const nombre = document.getElementById("nombre").value;
  const direccion = document.getElementById("direccion").value;
  const telefono = document.getElementById("telefono").value;

  const numero = "584123456789"; // Cambia por tu número WhatsApp

  let mensaje = `*Nuevo pedido en Dulces La Tradición*%0A%0A👤 ${nombre}%0A📍 ${direccion}%0A📞 ${telefono}%0A%0A🛒 *Productos:*%0A`;
  let total = 0;

  carrito.forEach(item => {
    const subtotal = item.precio * item.cantidad;
    total += subtotal;
    mensaje += `🍬 ${item.nombre} x${item.cantidad} - $${subtotal.toFixed(2)}%0A`;
  });

  mensaje += `%0A💰 *Total:* $${total.toFixed(2)}%0A%0AGracias por su compra ❤️`;

  const url = `https://wa.me/${numero}?text=${mensaje}`;
  window.open(url, "_blank");

  document.getElementById("modal-confirmacion").style.display = "none";
}
