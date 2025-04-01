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

    // Verificar si hay al menos un producto seleccionado
    let hayProductos = false;
    productos.forEach((producto) => {
      const cantidad = parseInt(document.getElementById(producto.id).value, 10);
      if (cantidad > 0 && !isNaN(cantidad)) {
        hayProductos = true;
      }
    });

    if (!hayProductos) {
      alert("Debe seleccionar al menos un producto para realizar el pedido.");
      return;
    }

    // Obteniendo valores
    let mensaje = "Hola, me gustaría hacer el siguiente pedido:\n\n";
    productos.forEach((producto) => {
      const cantidad = parseInt(document.getElementById(producto.id).value, 10);
      if (cantidad > 0 && !isNaN(cantidad)) {
        mensaje += `- ${producto.nombre}: ${cantidad}\n`;
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

    mensaje += `\nFecha de retiro: ${fecha}`;
    mensaje += `\nHora de retiro: ${hora}`;

    // Número de WhatsApp (incluye código de país)
    const numero = "56948936070";
    
    // Codificar mensaje para URL
    const mensajeCodificado = encodeURIComponent(mensaje);
    
    // Confirmación antes de redirigir
    const confirmacion = confirm("¿Estás seguro de que quieres realizar este pedido?");
    
    if (confirmacion) {
      // Crear enlaces para ambos métodos
      const whatsappAppLink = `whatsapp://send?phone=${numero}&text=${mensajeCodificado}`;
      const whatsappWebLink = `https://api.whatsapp.com/send?phone=${numero}&text=${mensajeCodificado}`;
      
      // Crear un elemento invisible en el DOM
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', whatsappAppLink);
      linkElement.setAttribute('id', 'whatsapp-link');
      linkElement.style.display = 'none';
      document.body.appendChild(linkElement);
      
      // Intentar abrir usando el enlace nativo
      linkElement.click();
      
      // Limpiar el elemento creado
      setTimeout(function() {
        document.body.removeChild(linkElement);
      }, 100);
      
      // Verificar si se abrió la app y usar el enlace web como respaldo
      const startTime = Date.now();
      const fallbackTimeout = 2000; // Aumentar el tiempo a 2 segundos
      const checkIfAppOpened = function() {
        if (Date.now() - startTime >= fallbackTimeout) {
          // Han pasado 2 segundos y seguimos en la misma página, usar la versión web
          window.location.href = whatsappWebLink;
        } else {
          // Verificar de nuevo en 200ms
          setTimeout(checkIfAppOpened, 200);
        }
      };
      
      // Iniciar la verificación
      setTimeout(checkIfAppOpened, 500); // Ajustar tiempo de espera antes de la primera verificación
      
    }
  } catch (error) {
    console.error("Ocurrió un error:", error);
    alert("Ocurrió un error al procesar tu pedido. Por favor, inténtalo de nuevo.");
    
    // En caso de error, intentar el método más directo
    const numero = "56948936070";
    const mensaje = "Pedido de Cecinas Satorres (Error en la aplicación, por favor contactarme)";
    const mensajeCodificado = encodeURIComponent(mensaje);
    window.location.href = `https://api.whatsapp.com/send?phone=${numero}&text=${mensajeCodificado}`;
  }
});
