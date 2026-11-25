# Despliegue

El artefacto distribuible es `dist/` generado con `npm run build`. Para revisión usa el comando del README y sirve solo en localhost o detrás de un acceso restringido. `noindex` no es control de acceso. Para producción, definir la URL raíz aprobada en `PUBLIC_SITE_URL`, compilar con modo revisión apagado y verificar que el catálogo contiene solo las fichas publicadas.

Validar HTTPS, manifest, CSP del alojamiento, cabecera del worker, URLs de error, QR y comportamiento offline sobre el origen de destino. Conservar el artefacto anterior. Configurar CI como requisito de rama y solicitar autorización de producción.
