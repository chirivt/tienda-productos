const express = require("express");
const router = express.Router();

// Número de WhatsApp al que llegan los pedidos
const WHATSAPP_NUMBER = "5804129066038";

router.post("/", (req, res) => {
  const { carrito } = req.body;

  if (!carrito || carrito.length === 0) {
    return res.status(400).json({ error: "El carrito está vacío" });
  }

  const mensaje = encodeURIComponent(
    "🛍 *Nuevo pedido desde la tienda Dulces La Tradición*\n\n" +
    carrito.map(p => `• ${p.nombre} x${p.cantidad} - $${(p.precio * p.cantidad).toFixed(2)}`).join("\n") +
    `\n\n💵 *Total: $${carrito.reduce((a, b) => a + b.precio * b.cantidad, 0).toFixed(2)}*`
  );

  const enlace = `https://wa.me/${WHATSAPP_NUMBER}?text=${mensaje}`;
  res.json({ enlace });
});

module.exports = router;
