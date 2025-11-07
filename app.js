require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

// Rutas Backend
const productosRouter = require("./controllers/admin");
const carritoRouter = require("./controllers/carrito");
const checkoutRouter = require("./controllers/checkout");
const userRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const adminRouter = require("./controllers/admin");
// Configuración
const { MONGO_URI } = require("./config");
const app = express();

// Conexión a MongoDB
(async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Conectado a MongoDB");
  } catch (error) {
    console.error("❌ Error conectando a MongoDB:", error);
  }
})();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan("tiny"));

// 🧭 RUTAS FRONTEND
// Sirve las vistas estáticas desde /views
app.use("/", express.static(path.resolve("views", "home")));
app.use("/productos", express.static(path.resolve("views", "productos")));
app.use("/cart", express.static(path.resolve("views", "cart")));
app.use("/login", express.static(path.resolve("views", "login")));
app.use("/signup", express.static(path.resolve("views", "signup")));
app.use("/components", express.static(path.resolve("views", "components")));
app.use("/styles", express.static(path.resolve("views", "styles")));
app.use("/img", express.static(path.resolve("img")));
app.use("/admin", express.static(path.resolve("views","admin")));

// 🛠️ RUTAS BACKEND (API)
app.use("/api/productos", productosRouter);
app.use("/api/carrito", carritoRouter);
app.use("/api/checkout", checkoutRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);
app.use('/api/admin', adminRouter);
// 📦 Control de errores y rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

module.exports = app;
