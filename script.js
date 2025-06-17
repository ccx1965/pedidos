document.getElementById("hacer-pedido").addEventListener("click", function () {
  try {
    const productos = [...document.querySelectorAll(".producto input")].map(input => ({
      id: input.id,
      nombre: input.previousElementSibling.textContent.replace(":", ""),
      cantidad: parseInt(input.value, 10)
    })).filter(p => p.cantidad > 0 && !isNaN(p.cantidad));

    if (productos.length === 0) {
      alert("Debe seleccionar al menos un producto para realizar el pedido.");
      return;
    }

    const fecha = document.getElementById("dia").value;
    const hora = document.getElementById("time").value;

    if (!fecha || !hora) {
      alert("Debe completar los casilleros de Fecha y Hora de retiro.");
      return;
    }

    const fechaActual = new Date().toISOString().split('T')[0];
    if (fecha < fechaActual) {
      alert("La fecha de retiro no puede ser en el pasado.");
      return;
    }

    // Mensaje completo
    let mensaje = "Hola, me gustaría hacer el siguiente pedido:\n\n";
    productos.forEach(p => {
      mensaje += `- ${p.nombre}: ${p.cantidad}\n`;
    });
    mensaje += `\nFecha de retiro: ${fecha}`;
    mensaje += `\nHora de retiro: ${hora}`;

    const numero = "56948936070";
    const mensajeCodificado = encodeURIComponent(mensaje);

    // Intentar abrir en la app de WhatsApp
    const appLink = `whatsapp://send?phone=${numero}&text=${mensajeCodificado}`;
    const webLink = `https://api.whatsapp.com/send?phone=${numero}&text=${mensajeCodificado}`;

    const confirmacion = confirm("¿Estás seguro de que quieres realizar este pedido?");
    if (!confirmacion) return;

    const userAgent = navigator.userAgent.toLowerCase();
    const isAndroid = userAgent.includes("android");
    const isHuawei = userAgent.includes("huawei");

    // Huawei y navegadores sin soporte para "whatsapp://" => usar versión web directamente
    if (isHuawei || !isAndroid) {
      window.location.href = webLink;
      return;
    }

    // Intento de abrir app de WhatsApp
    const link = document.createElement('a');
    link.href = appLink;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Fallback tras 1.2 segundos
    setTimeout(() => {
      window.location.href = webLink;
    }, 1200);
  } catch (err) {
    console.error("Error en pedido:", err);
    alert("Hubo un error. Por favor, inténtelo nuevamente.");
    const fallbackMsg = encodeURIComponent("Pedido de Cecinas Satorres (Error en app)");
    window.location.href = `https://api.whatsapp.com/send?phone=56948936070&text=${fallbackMsg}`;
  }
});
