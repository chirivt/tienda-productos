function comprar(producto, precio) {
  // ⚠️ Cambia este número al tuyo (sin el signo +)
  const telefono = "+5804129066038";
  
  const mensaje = `Hola 👋, quiero comprar el producto *${producto}* que cuesta $${precio}.`;
  const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");
}
