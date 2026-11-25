import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [react()],
  site: process.env.PUBLIC_SITE_URL || undefined,
  trailingSlash: 'always',
});
