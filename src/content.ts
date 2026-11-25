import data from '../content/aventuras.json';

export const worlds = ['Ingeniería', 'Tecnología', 'Ciencia', 'Creatividad', 'Emprendimiento', 'Convivencia'];
export const reviewMode = import.meta.env.PUBLIC_REVIEW_MODE === 'true';

export type Status = 'borrador' | 'en revisión' | 'aprobado' | 'publicado' | 'archivado';
export type Adventure = Omit<(typeof data)[number], 'estado' | 'revisada'> & { id: string; version: number; idioma: string; coste: string; estado: Status; revisada: string | null };

export const allAdventures: Adventure[] = data.map(item => ({
  id: item.slug,
  idioma: 'es',
  version: 1,
  coste: '0 € si se reutilizan los materiales',
  ...item,
  estado: item.estado as Status,
}));

const seen = new Set();
const states = ['borrador', 'en revisión', 'aprobado', 'publicado', 'archivado'];
for (const item of allAdventures) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.slug) || seen.has(item.slug) ||
      !worlds.includes(item.mundo) || item.pasos.length < 3 || !item.seguridad ||
      !(item.minutos > 0) || !states.includes(item.estado) ||
      item.materiales.length !== item.cantidades.length ||
      item.cantidades.some(amount => !Number.isInteger(amount) || amount <= 0) ||
      (['publicado', 'aprobado'].includes(item.estado) && !/^\d{4}-\d{2}-\d{2}$/.test(item.revisada ?? ''))) {
    throw new Error('Aventura inválida: ' + item.slug);
  }
  seen.add(item.slug);
}

export const adventures = allAdventures.filter(item =>
  item.estado === 'publicado' || (reviewMode && item.estado === 'en revisión')
);
