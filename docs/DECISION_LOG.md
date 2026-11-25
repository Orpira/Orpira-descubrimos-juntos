# Decisiones

- **Una app Astro y React.** Facilita una compilación y rutas estáticas compatibles con el portal y el catálogo. Separar paquetes cuando exista un segundo consumidor real.
- **CSS local y TypeScript.** Se eligieron controles nativos y CSS para este alcance. IndexedDB y Dexie se aplazan mientras el progreso se limite a listas pequeñas.
- **Almacenamiento por intención.** Los pasos solo se escriben si se activa la opción de guardado. Los recursos de la app y cada HTML descargado se gestionan por separado.
- **Observar antes de publicar.** Las diez fichas pueden ensayarse en revisión y están excluidas del catálogo público.
- **QR de origen configurado.** La imagen se genera en la compilación y evita servicios QR externos.
