# Evidencia de pruebas · 25 de noviembre de 2026

Entorno local Node.js 24.22.3 y Chromium 158.0.8127.0 en Linux. Playwright ejecutó la compilación con un servidor HTTP local.

| Prueba | Resultado |
| --- | --- |
| `npm run check` | 21 archivos, cero errores, advertencias e indicaciones |
| `npm test` | Dos pruebas aprobadas, estructura de catálogo y filtros combinables |
| `npm audit --audit-level=high` | Cero vulnerabilidades reportadas por npm |
| Compilación de revisión | 10 rutas de aventuras y 7 páginas de aplicación |
| Compilación pública | Excluye el directorio de aventuras al estar todo el catálogo en revisión |
| Chromium · 390×844 y 1280×800 | Catálogo, filtros, navegación por teclado inicial, QR, impresión y enlace |
| Chromium · red desactivada | Ficha descargada abre desde Pasaporte con imagen y progreso. Una ficha sin descargar muestra recuperación. Se verificó la descarga de colección. |
| Chromium · datos locales | Favorito, sello, progreso, reinicio, exportación y borrado |
| Chromium · taller | 12 participantes se reparten en 3 equipos de 4, con cantidades calculadas. El programa muestra ocho sesiones. |
| QR | Se decodificaron las diez imágenes PNG y se comprobaron sus URLs de localhost. |

Los flujos están en `tests/` y se repiten mediante `.github/workflows/quality.yml`. Pendientes ejecución de CI en GitHub, pruebas físicas y revisión editorial de fichas, auditoría WCAG completa, impresión física y verificación de instalación y offline en Firefox, Safari, Android e iOS. La cabecera CSP necesita validación con el alojamiento elegido.
