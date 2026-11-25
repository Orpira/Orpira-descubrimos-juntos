import type { APIRoute } from 'astro';
import { adventures, reviewMode } from '../content';
const escape = (value: string) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
export const GET: APIRoute = ({ site }) => {
  const paths = site && !reviewMode ? ['/', '/comunidad/', '/organizaciones/', '/privacidad/', '/ayuda/', ...adventures.map(item => '/aventuras/' + item.slug + '/')] : [];
  return new Response('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
    paths.map(route => '<url><loc>' + escape(new URL(route, site).href) + '</loc></url>').join('') +
    '</urlset>', { headers: { 'Content-Type': 'application/xml' } });
};
