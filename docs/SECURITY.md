# Seguridad informática

Los datos se interpolan como texto mediante Astro, React o textContent. No se interpreta HTML editorial. Controlar orígenes de enlaces, nombres de archivos y estados en revisión editorial. El archivo `_headers` incluye CSP y restricciones de permisos para un alojamiento compatible. La política permite scripts inline generados por Astro. Antes de producción, verificar las cabeceras reales y preferir hashes CSP si el alojamiento los admite.

Aplicar HTTPS, separar origen de revisión de producción y restringir acceso a revisión. Mantener lockfile, ejecutar auditoría npm, revisar dependencias y no almacenar secretos. Configurar detección de secretos en GitHub si la cuenta lo permite.
