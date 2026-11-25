# Descubrimos Juntos · OrPiRa Social

PWA de aventuras educativas en familia para edades orientativas de 6 a 12 años. El catálogo incluye diez fichas en revisión y un programa comunitario de ocho sesiones, con identificación de profesiones, materiales reutilizables y adaptaciones.

## Probar la edición de revisión

Requiere Node.js 22.12 o superior y npm. Desde la raíz del repositorio:

```sh
npm ci
PUBLIC_REVIEW_MODE=true PUBLIC_SITE_URL=http://localhost:4321 npm run build
npm run preview -- --host 127.0.0.1 --port 4321
```

Abre [localhost:4321](http://localhost:4321). Mantén el mismo origen para que funcionen el pasaporte, las descargas y el QR de prueba. El QR de localhost solo sirve en el equipo que ejecuta la vista previa. Para comprobar offline, guarda una ficha, desactiva la red en DevTools y vuelve a abrirla desde Pasaporte → Descargas.

`npm run dev` permite desarrollar la interfaz. Usa la compilación de revisión para ensayar la PWA. La compilación por defecto omite las fichas que aún no se han publicado editorialmente. Consulta [el protocolo de contenidos](docs/CONTENT_GUIDELINES.md) antes de cambiar un estado. La revisión requiere acceso restringido si se aloja fuera de localhost.

## Verificación

```sh
npm run check
npm test
npm audit --audit-level=high
python3 -m pip install playwright==1.62.0
python3 -m playwright install chromium
python3 tests/browser.py
```

La prueba de navegador espera la compilación de revisión ya servida en el puerto 4321. Puedes usar `CHROMIUM` para indicar otra ruta a Chromium y `TEST_BASE` para indicar otro origen de prueba.

## Documentación

[Documento maestro](docs/DOCUMENTO_MAESTRO.md) · [Estudio competitivo](docs/COMPETITIVE_RESEARCH.md) · [Arquitectura](docs/ARCHITECTURE.md) · [Backlog](docs/BACKLOG.md) · [Pruebas](docs/TESTING.md) · [Despliegue](docs/DEPLOYMENT.md)

[Protocolo del piloto comunitario](docs/PILOTO_COMUNITARIO.md)
