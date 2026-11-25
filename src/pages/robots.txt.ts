import type { APIRoute } from 'astro';
import { reviewMode } from '../content';
export const GET: APIRoute = ({ site }) => new Response(reviewMode || !site
  ? 'User-agent: *\nDisallow: /\n'
  : 'User-agent: *\nAllow: /\nSitemap: ' + new URL('/sitemap.xml', site).href + '\n');
