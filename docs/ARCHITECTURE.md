# Arquitectura

Astro genera HTML estático y rutas por slug. El catálogo hidrata una isla React para aplicar filtros. Las interacciones del pasaporte y del taller usan TypeScript y APIs del navegador. La fuente de contenidos es `content/aventuras.json`. No se necesita servidor de aplicaciones.

El pasaporte guarda identificadores de fichas y pasos en localStorage. Cache Storage guarda los HTML seleccionados y un service worker dirige la lectura offline. Los recursos estáticos son locales. Los datos que se exportan se quedan en el equipo.

La estructura inicial cabe en un solo proyecto. Los textos están en español. Cada ficha tiene campo de idioma. Antes de publicar otro idioma, extraer los textos comunes a diccionarios, definir rutas localizadas y verificar lectura y orden visual RTL.

Variables de compilación: `PUBLIC_REVIEW_MODE` y `PUBLIC_SITE_URL`. Usar orígenes separados para revisión y producción. Evitar dependencias externas en tiempo de ejecución.
