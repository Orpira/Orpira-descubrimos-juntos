export const storageKey = 'descubrimos-juntos:v1';
export const workshopKey = 'descubrimos-juntos:workshop:v1';
export const downloadCache = 'descubrimos-juntos:downloads';
type Progress = Record<string, number[]>;
export type LocalData = { favorites: string[]; completed: string[]; progress: Progress };
const empty = (): LocalData => ({ favorites: [], completed: [], progress: {} });

export function load(): LocalData {
  try {
    const value = JSON.parse(localStorage.getItem(storageKey) ?? 'null');
    return value && Array.isArray(value.favorites) && Array.isArray(value.completed) && value.progress
      ? value : empty();
  } catch {
    return empty();
  }
}

export function save(change: (data: LocalData) => void): void {
  const data = load();
  change(data);
  localStorage.setItem(storageKey, JSON.stringify(data));
}

export async function availableOffline(path: string): Promise<boolean> {
  if (!('caches' in window)) return false;
  return Boolean(await (await caches.open(downloadCache)).match(path));
}

export async function setOffline(path: string, desired: boolean): Promise<void> {
  if (!('caches' in window)) throw new Error('Storage unavailable');
  const cache = await caches.open(downloadCache);
  if (!desired) {
    await cache.delete(path);
    return;
  }
  if (!(await navigator.serviceWorker?.getRegistration())) throw new Error('Worker unavailable');
  const response = await fetch(path, { cache: 'reload' });
  if (!response.ok || response.redirected) throw new Error('Download unavailable');
  await cache.put(path, response);
}
