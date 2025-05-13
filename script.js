document.addEventListener('DOMContentLoaded', function() {
  const botonPedido = document.getElementById("hacer-pedido");
  
  if (!botonPedido) {
    console.error("Error: No se encontró el botón con ID 'hacer-pedido'");
    return;
  }

  botonPedido.addEventListener("click", async function() {
    try {
      // Lista de productos
      const productos = [
        { id: "arrollado-aji", nombre: "Arrollado Huaso con Ají" },
        { id: "arrollado-sin-aji", nombre: "Arrollado Huaso sin Ají" },
        // ... (Asegúrate de incluir TODOS tus productos aquí)
      ];

      // Validar productos seleccionados
      const productosSeleccionados = productos.filter(producto => {
        const cantidad = parseInt(document.getElementById(producto.id).value, 10);
        return cantidad > 0;
      });

      if (productosSeleccionados.length === 0) {
        await Swal.fire({
          icon: 'error',
          title: 'Productos requeridos',
          text: 'Debe seleccionar al menos un producto',
          confirmButtonColor: '#2E9C5B'
        });
        return;
      }

      // Validar fecha y hora
      const fecha = document.getElementById("dia").value;
      const hora = document.getElementById("time").value;
      
      if (!fecha || !hora) {
        await Swal.fire({
          icon: 'error',
          title: 'Datos incompletos',
          text: 'Debe completar fecha y hora de retiro',
          confirmButtonColor: '#2E9C5B'
        });
        return;
      }

      // Construir mensaje para WhatsApp
      let mensaje = "Hola, me gustaría hacer el siguiente pedido:\n\n";
      productosSeleccionados.forEach(producto => {
        const cantidad = document.getElementById(producto.id).value;
        mensaje += `- ${producto.nombre}: ${cantidad}\n`;
      });
      mensaje += `\nFecha de retiro: ${fecha}\nHora de retiro: ${hora}`;

      // Confirmación final
      const { isConfirmed } = await Swal.fire({
        title: 'Confirmar pedido',
        text: '¿Estás seguro de enviar este pedido por WhatsApp?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#2E9C5B',
        cancelButtonColor: '#CF3349',
        confirmButtonText: 'Sí, enviar',
        cancelButtonText: 'Cancelar'
      });

      if (!isConfirmed) return;

      // Mostrar carga
      Swal.fire({
        title: 'Preparando pedido...',
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading()
      });

      // Número de WhatsApp (¡verifica que sea correcto!)
      const numero = "56948936070";
      const mensajeCodificado = encodeURIComponent(mensaje);

      // Función mejorada para abrir WhatsApp
      const abrirWhatsApp = () => {
        // Intento 1: Esquema nativo (para móviles con WhatsApp instalado)
        const linkApp = document.createElement('a');
        linkApp.href = `whatsapp://send?phone=${numero}&text=${mensajeCodificado}`;
        document.body.appendChild(linkApp);
        linkApp.click();

        // Intento 2: Si falla, abre WhatsApp Web (después de 400ms)
        setTimeout(() => {
          if (!document.hidden) return; // Si ya se abrió, no hacer nada
          window.open(`https://api.whatsapp.com/send?phone=${numero}&text=${mensajeCodificado}`, '_blank');
        }, 400);

        // Limpiar
        setTimeout(() => document.body.removeChild(linkApp), 500);
      };

      // Ejecutar
      setTimeout(() => {
        Swal.close();
        abrirWhatsApp();
      }, 800);

    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrió un error al procesar el pedido',
        confirmButtonColor: '#2E9C5B'
      });
    }
  });
});
