import { createHash } from 'node:crypto';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const names = (await readdir('dist', { recursive: true, withFileTypes: true }))
  .filter(entry => entry.isFile())
  .map(entry => path.relative('dist', path.join(entry.parentPath, entry.name)))
  .filter(file => !['sw.js', '_headers'].includes(file))
  .sort();
const hash = createHash('sha256');
for (const name of names) hash.update(name).update(await readFile(path.join('dist', name)));
const source = await readFile('scripts/worker.js', 'utf8');
hash.update(source);
const version = hash.digest('hex').slice(0, 16);
const adventures = names.filter(name => /^aventuras\/[^/]+\/index\.html$/.test(name)).map(name => '/' + name.replace(/index\.html$/, ''));
const shell = names.filter(name => !name.startsWith('aventuras/') && !['robots.txt', 'sitemap.xml'].includes(name))
  .map(name => '/' + name.replace(/(^|\/)index\.html$/, '$1'));
await writeFile('dist/sw.js', 'const VERSION = ' + JSON.stringify(version) +
  ';\nconst SHELL = ' + JSON.stringify(shell) + ';\nconst ADVENTURES = ' + JSON.stringify(adventures) + ';\n' + source);
