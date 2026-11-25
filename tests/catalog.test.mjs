import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { filterAdventures } from '../src/filters.mjs';
const items = JSON.parse(readFileSync(new URL('../content/aventuras.json', import.meta.url)));

test('Diez aventuras únicas y seis mundos', () => {
  assert.equal(items.length, 10);
  assert.equal(new Set(items.map(item => item.slug)).size, 10);
  assert.equal(new Set(items.map(item => item.mundo)).size, 6);
  for (const item of items) {
    for (const field of ['mision', 'objetivo', 'seguridad', 'accesibilidad', 'aula', 'grupo', 'reflexion']) {
      assert.ok(item[field], item.slug + ': ' + field);
    }
    assert.ok(item.pasos.length >= 3);
    assert.ok(item.revisada || !['aprobado', 'publicado'].includes(item.estado));
  }
});

test('Combina filtros y acepta los límites de edad y participantes', () => {
  assert.equal(filterAdventures(items, {}).length, 10);
  const result = filterAdventures(items, { world: 'Ingeniería', age: '6', duration: '25', level: 'Inicial', material: 'Papel', people: '4' });
  assert.deepEqual(result.map(item => item.slug), ['el-puente-imposible']);
  assert.deepEqual(filterAdventures(items, { world: 'Ciencia', duration: '15' }), []);
});

test('Reparte personas entre equipos con una diferencia máxima de una', async () => {
  const { splitTeams } = await import('../src/workshop.mjs');
  assert.deepEqual(splitTeams(2, 4), { count: 1, sizes: '2' });
  assert.deepEqual(splitTeams(12, 4), { count: 3, sizes: '4' });
  assert.deepEqual(splitTeams(13, 4), { count: 4, sizes: '3–4' });
  assert.deepEqual(splitTeams(120, 6), { count: 20, sizes: '6' });
});
