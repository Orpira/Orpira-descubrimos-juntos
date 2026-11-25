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
