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
        // ... (Asegúrate de incluir TODOS tus productos aquí)
      ];

      // Validaciones (productos, fecha, hora)
      // ... (Mantén tus validaciones actuales)

      // Construir mensaje
      let mensaje = "Hola, me gustaría hacer el siguiente pedido:\n\n";
      // ... (Código para construir el mensaje)

      // Número de WhatsApp (asegúrate que sea correcto)
      const numero = "56948936070";
      const mensajeCodificado = encodeURIComponent(mensaje);

      // SOLUCIÓN DEFINITIVA PARA ABRIR WHATSAPP
      function enviarPorWhatsApp() {
        // 1. Intento con API de WhatsApp
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        const url = isMobile 
          ? `whatsapp://send?phone=${numero}&text=${mensajeCodificado}`
          : `https://web.whatsapp.com/send?phone=${numero}&text=${mensajeCodificado}`;
        
        // 2. Crear iframe invisible (método más confiable)
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = url;
        document.body.appendChild(iframe);
        
        // 3. Fallback después de 1 segundo
        setTimeout(() => {
          if (!document.hidden) {
            window.location.href = `https://web.whatsapp.com/send?phone=${numero}&text=${mensajeCodificado}`;
          }
          document.body.removeChild(iframe);
        }, 1000);
      }

      // Ejecutar
      Swal.close();
      enviarPorWhatsApp();

    } catch (error) {
      console.error("Error:", error);
      // Manejo de errores
    }
  });
});
