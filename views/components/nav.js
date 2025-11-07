document.addEventListener("DOMContentLoaded", () => {
  const nav = document.getElementById("menu");
  if (nav) {
    nav.innerHTML = `
      <ul class="nav-list">
        <li><a href="../home/index.html">Inicio</a></li>
        <li><a href="../todos/index.html">Productos</a></li>
        <li><a href="../cart/index.html">Carrito 🛒</a></li>
        <li><a href="../login/index.html">Iniciar sesión</a></li>
        <li><a href="../signup/index.html">Registrarse</a></li>
      </ul>
    `;
  }
});
