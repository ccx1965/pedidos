document.getElementById("hacer-pedido").addEventListener("click", function () {
  try {
    // Números de pedido
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
      { id: "longaniza-tradicional", nombre: "Kilos de Longaniza Tradicional" },
      { id: "longaniza-surena-vacio", nombre: "Kilos Longaniza Sureña al Vacío" },
      { id: "longaniza-tradicional-vacio", nombre: "Kilos Longaniza Tradicional al Vacío" },
      { id: "longaniza-surena-granel", nombre: "Kilos Longaniza Sureña Granel" },
      { id: "longaniza-larga", nombre: "Kilos Longaniza Larga" },
      { id: "queso-cabeza-manga", nombre: "Queso de Cabeza Manga" },
      { id: "queso-cabeza-molde-mitad", nombre: "Queso de Cabeza Molde Mitad" },
      { id: "queso-cabeza-molde-entero", nombre: "Queso de Cabeza Molde Entero" },
      { id: "kilos-chorizo", nombre: "Kilos Chorizo" },
      { id: "kilos-choricillo", nombre: "Kilos Choricillo" }
    ];

    // Obteniendo valores
    let mensaje = "Hola, me gustaría hacer el siguiente pedido:%0A";
    productos.forEach((producto) => {
      const cantidad = parseInt(document.getElementById(producto.id).value, 10);
      if (cantidad > 0 && !isNaN(cantidad)) {
        mensaje += `- ${producto.nombre}: ${cantidad}%0A`;
      }
    });

    const fecha = document.getElementById("dia").value;
    const hora = document.getElementById("time").value;

    // Validación de fecha y hora
    if (!fecha || !hora) {
      alert("Debe completar los casilleros de Fecha y Hora de retiro.");
      return;
    }

    const fechaActual = new Date().toISOString().split('T')[0];
    if (fecha < fechaActual) {
      alert("La fecha de retiro no puede ser en el pasado.");
      return;
    }

    mensaje += `%0AFecha de retiro: ${fecha}`;
    mensaje += `%0AHora de retiro: ${hora}`;

    // Número de WhatsApp
    const numero = "56948936070";
    const url = `https://web.whatsapp.com/send?phone=${numero}&text=${mensaje}`;

    // Confirmación antes de redirigir
    const confirmacion = confirm("¿Estás seguro de que quieres realizar este pedido?");
    if (confirmacion) {
      window.open(url, "_blank");
    }
  } catch (error) {
    console.error("Ocurrió un error:", error);
    alert("Ocurrió un error al procesar tu pedido. Por favor, inténtalo de nuevo.");
  }
});
