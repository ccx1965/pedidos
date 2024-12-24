document.getElementById("hacer-pedido").addEventListener("click", function () {
  const productos = [
    { id: "arrollado-aji", nombre: "Arrollado Huaso con Ají" },
    { id: "arrollado-sin-aji", nombre: "Arrollado Huaso sin Ají" },
    { id: "arrollado-individual", nombre: "Arrollado Huaso Individual" },
    { id: "arrollado-artesanal", nombre: "Arrollado Artesanal" },
    { id: "arrollado-lomo", nombre: "Arrollado Lomo Ahumado" },
    { id: "arrollado-estriado", nombre: "Arrollado Huaso Estriado" },
    { id: "jamon-praga-mitad", nombre: "Jamón Praga Mitad" },
    { id: "jamon-praga-entero", nombre: "Jamón Praga Entero" },
    { id: "jamon-pierna-mitad", nombre: "Jamón Pierna Mitad" },
    { id: "jamon-pierna-entero", nombre: "Jamón Pierna Entero" },
    { id: "longaniza-tradicional", nombre: "Longaniza Tradicional (kilos)" },
    {
      id: "longaniza-surena-vacio",
      nombre: "Longaniza Sureña al Vacío (kilos)"
    },
    {
      id: "longaniza-tradicional-vacio",
      nombre: "Longaniza Tradicional al Vacío (kilos)"
    },
    {
      id: "longaniza-surena-granel",
      nombre: "Longaniza Sureña Granel (kilos)"
    },
    { id: "longaniza-larga", nombre: "Longaniza Larga (kilos)" },
    { id: "queso-cabeza-manga", nombre: "Queso de Cabeza Manga" },
    { id: "queso-cabeza-molde-mitad", nombre: "Queso de Cabeza Molde Mitad" },
    { id: "queso-cabeza-molde-entero", nombre: "Queso de Cabeza Molde Entero" },
    { id: "kilos-chorizo", nombre: "Kilos Chorizo" },
    { id: "kilos-choricillo", nombre: "Kilos Choricillo" }
  ];

  let mensaje = "Hola, quisiera realizar el siguiente pedido:\n";

  productos.forEach((producto) => {
    const cantidad = document.getElementById(producto.id).value;
    if (cantidad > 0) {
      mensaje += `- ${producto.nombre}: ${cantidad}\n`;
    }
  });

  const fechaRetiro = document.getElementById("dia").value;
  const horaRetiro = document.getElementById("time").value;

  if (fechaRetiro) {
    mensaje += `\nFecha de retiro: ${fechaRetiro}`;
  }

  if (horaRetiro) {
    mensaje += `\nHora de retiro: ${horaRetiro}`;
  }

  const numeroWhatsApp = "+56948936070";
  const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(
    mensaje
  )}`;

  window.open(url, "_blank");
});
