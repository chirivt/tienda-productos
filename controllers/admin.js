const adminRouter = require('express').Router();
const Producto = require("../models/producto");


// 🟢 Crear un nuevo producto
adminRouter.post("/", async (req, res) => {
  try {
    console.log('req.body', req.body);
    const producto = new Producto(req.body);
    const saved = await producto.save();
    console.log(saved);
    res.status(201).json( "Producto creado");
  } catch (error) {
    res.status(400).json({ error: "Error al crear producto", detalle: error.message });
  }
});

// 🔵 Leer todos los productos
adminRouter.get("/", async (req, res) => {
  try {
    const productos = await Producto.find().sort({ createdAt: -1 });
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener productos" });
  }
});

// 🟡 Actualizar un producto
adminRouter.put("/:id", async (req, res) => {
  try {
    console.log('req.params.id', req.params.id);
    console.log('req.body', req.body);
    const actualizado = await Producto.findByIdAndUpdate(req.params.id, req.body.producto, { new: true });
   

    console.log('actualizado', actualizado);
    
    if (!actualizado) return res.status(404).json({ error: "Producto no encontrado" });
    res.json(actualizado);
  } catch (error) {
    res.status(400).json({ error: "Error al actualizar producto" });
  }
});

// 🔴 Eliminar un producto
adminRouter.delete("/:id", async (req, res) => {
  try {
    const eliminado = await Producto.findByIdAndDelete(req.params.id);
    if (!eliminado) return res.status(404).json({ error: "Producto no encontrado" });
    res.json({ mensaje: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar producto" });
  }
});

module.exports = adminRouter;
