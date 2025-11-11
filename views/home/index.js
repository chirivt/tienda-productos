document.addEventListener("DOMContentLoaded", () => {
  const botonesAgregar = document.querySelectorAll(".add-to-cart");
  const cartCount = document.getElementById("cart-count");

  // Cargar el contador al iniciar
  actualizarContador();

  // Agregar eventos a los botones
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

      // Verificar si el producto ya está en el carrito
      const index = carrito.findIndex(p => p.nombre === producto.nombre);
      if (index !== -1) {
        carrito[index].cantidad += 1;
      } else {
        carrito.push(producto);
      }

      // Guardar el carrito
      localStorage.setItem("carrito", JSON.stringify(carrito));

      // Actualizar contador visualmente
      actualizarContador();

      // Mensaje de confirmación
      alert(`✅ ${producto.nombre} fue agregado al carrito.`);
    });
  });

  // Función para mostrar el número de productos en el carrito
  function actualizarContador() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);

    if (cartCount) {
      cartCount.textContent = totalItems;
      cartCount.classList.toggle("hidden", totalItems === 0);
    }
  }
});
