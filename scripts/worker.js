const prefix = 'descubrimos-juntos:shell:';
const shellName = prefix + VERSION;
const downloads = 'descubrimos-juntos:downloads';
const normalize = pathname => pathname.endsWith('/') ? pathname : pathname + '/';

self.addEventListener('install', event => {
  event.waitUntil(caches.open(shellName).then(cache => cache.addAll(SHELL)));
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.filter(name => name.startsWith(prefix) && name !== shellName).map(name => caches.delete(name)));
    const saved = await caches.open(downloads);
    for (const request of await saved.keys()) {
      const route = new URL(request.url).pathname;
      if (!ADVENTURES.includes(route)) {
        await saved.delete(request);
        continue;
      }
      try {
        const fresh = await fetch(request, { cache: 'reload' });
        if (fresh.ok && !fresh.redirected) {
          await saved.put(request, fresh);
          continue;
        }
      } catch {}
      await saved.delete(request);
    }
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;
  if (request.mode === 'navigate') {
    event.respondWith((async () => {
      const route = normalize(url.pathname);
      try {
        return await fetch(request);
      } catch {
        const shell = await caches.open(shellName);
        if (ADVENTURES.includes(route)) {
          const saved = await (await caches.open(downloads)).match(route);
          if (saved) return saved;
        }
        return (await shell.match(route)) ?? (await shell.match('/404.html')) ?? Response.error();
      }
    })());
  } else if (SHELL.includes(url.pathname) && !url.search) {
    event.respondWith(caches.open(shellName).then(async cache => (await cache.match(request)) ?? fetch(request)));
  }
});
