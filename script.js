document.addEventListener('DOMContentLoaded', function() {
  const botonPedido = document.getElementById("hacer-pedido");
  
  if (!botonPedido) {
    console.error("Error: No se encontró el botón con ID 'hacer-pedido'");
    return;
  }

  botonPedido.addEventListener("click", async function() {
    try {
      // Lista de productos (completa)
      const productos = [
        { id: "arrollado-aji", nombre: "Arrollado Huaso con Ají" },
        // ... (todos los demás productos)
      ];

      // Verificar productos seleccionados
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

      // Construir mensaje
      let mensaje = "Hola, me gustaría hacer el siguiente pedido:\n\n";
      productosSeleccionados.forEach(producto => {
        const cantidad = document.getElementById(producto.id).value;
        mensaje += `- ${producto.nombre}: ${cantidad}\n`;
      });
      mensaje += `\nFecha de retiro: ${fecha}\nHora de retiro: ${hora}`;

      // Confirmación
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

      // Número de WhatsApp (con código de país)
      const numero = "56948936070";
      const mensajeCodificado = encodeURIComponent(mensaje);
      
      // Detectar si es móvil
      const esMovil = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      // Crear enlace según el dispositivo
      const whatsappLink = esMovil 
        ? `whatsapp://send?phone=${numero}&text=${mensajeCodificado}`
        : `https://web.whatsapp.com/send?phone=${numero}&text=${mensajeCodificado}`;

      // Crear enlace temporal
      const link = document.createElement('a');
      link.href = whatsappLink;
      link.target = '_blank';
      link.style.display = 'none';
      document.body.appendChild(link);
      
      // Intentar abrir WhatsApp
      link.click();
      
      // Verificar si se abrió (solo para móviles)
      if (esMovil) {
        setTimeout(() => {
          // Si después de 1 segundo no se abrió, intentar con la versión web
          if (!document.hidden) {
            window.location.href = `https://web.whatsapp.com/send?phone=${numero}&text=${mensajeCodificado}`;
          }
        }, 1000);
      }
      
      // Limpiar y cerrar loader
      setTimeout(() => {
        document.body.removeChild(link);
        Swal.close();
      }, 1500);

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
