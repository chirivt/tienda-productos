const express = require("express");
const router = express.Router();

// En este caso el carrito se guarda en frontend (localStorage),
// pero puedes usar este endpoint si quieres registrar carritos activos
let carritos = [];

router.post("/", (req, res) => {
  const carrito = req.body;
  carritos.push(carrito);
  res.json({ message: "Carrito recibido", carrito });
});

module.exports = router;
