const mongoose = require("mongoose");

const productoSchema = new mongoose.Schema({
  nombre: { type: String},
  descripcion: { type: String},
  precio: { type: Number},
  imagen: { type: String},
}, { timestamps: true });

module.exports = mongoose.model("Producto", productoSchema);
