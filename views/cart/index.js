document.addEventListener("DOMContentLoaded", () => {
  const cartItemsContainer = document.getElementById("cart-items");
  const totalPriceElement = document.getElementById("total-price");
  const whatsappBtn = document.getElementById("whatsapp-btn");

  function renderCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    cartItemsContainer.innerHTML = "";

    if (carrito.length === 0) {
      cartItemsContainer.innerHTML = "<p>Tu carrito está vacío 🍬</p>";
      totalPriceElement.textContent = "Total: $0.00";
      return;
    }

    let total = 0;
    let html = `
      <table style="width:100%; border-collapse:collapse;">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
    `;

    carrito.forEach(p => {
      const subtotal = p.precio * p.cantidad;
      total += subtotal;

      html += `
        <tr>
          <td><img src="${p.imagen}" alt="${p.nombre}" style="width:60px;border-radius:8px;"></td>
          <td>${p.nombre}</td>
          <td>${p.cantidad}</td>
          <td>$${p.precio.toFixed(2)}</td>
          <td>$${subtotal.toFixed(2)}</td>
        </tr>
      `;
    });

    html += "</tbody></table>";
    cartItemsContainer.innerHTML = html;
    totalPriceElement.textContent = `Total: $${total.toFixed(2)}`;
    const clearCartBtn = document.getElementById("clear-cart-btn");

if (clearCartBtn) {
  clearCartBtn.addEventListener("click", () => {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    if (carrito.length === 0) return alert("Tu carrito ya está vacío 🍬");

    if (confirm("¿Deseas vaciar todo el carrito? 🧁")) {
      localStorage.removeItem("carrito");
      renderCarrito();
      alert("Carrito vaciado correctamente 🧹");
    }
  });
}

  }

  // ✅ Enviar pedido a WhatsApp
  whatsappBtn.addEventListener("click", () => {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    if (carrito.length === 0) return alert("Tu carrito está vacío 🍬");

    let mensaje = "🛍️ *Pedido de Dulces La Tradición:*%0A%0A";
    carrito.forEach(p => {
      mensaje += `🍬 ${p.nombre} x${p.cantidad} = $${(p.precio * p.cantidad).toFixed(2)}%0A`;
    });
    const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
    mensaje += `%0A💰 *Total:* $${total.toFixed(2)}`;

    window.open(`https://wa.me/584129066038?text=${mensaje}`, "_blank");
  });

  renderCarrito();
});
