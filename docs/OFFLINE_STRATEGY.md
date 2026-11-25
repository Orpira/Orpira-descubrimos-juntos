# Uso sin conexión

La primera visita necesita red para instalar el service worker y precargar recursos comunes, incluidas ilustraciones. El botón de descarga agrega el HTML específico. El navegador guarda el progreso en otro almacenamiento local. Cuando un enlace de ficha no descargada se abre sin red se muestra una página de recuperación.

El worker activa la nueva caché cuando se cierran las pestañas de la versión anterior. Revalida fichas descargadas y elimina rutas retiradas. Si falla la renovación de una ficha durante la actualización, hay que descargarla de nuevo. El navegador puede liberar almacenamiento sin aviso. No se ha validado la instalación nativa ni la persistencia en Safari móvil, Firefox, Android o iOS.
