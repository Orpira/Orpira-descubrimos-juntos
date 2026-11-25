import { useState } from 'react';
import type { Adventure } from '../content';
import { filterAdventures } from '../filters.mjs';

export default function Catalog({ items, worlds }: { items: Adventure[]; worlds: string[] }) {
  const [filters, setFilters] = useState<Record<string, string>>({});
  const materials = [...new Set(items.flatMap(item => item.materiales))].sort((a, b) => a.localeCompare(b, 'es'));
  const choices = [
    ['world', 'Mundo', worlds],
    ['age', 'Edad orientativa', Array.from({ length: 7 }, (_, index) => String(index + 6))],
    ['duration', 'Duración máxima', ['15', '20', '25', '30', '35']],
    ['level', 'Dificultad', ['Inicial', 'Intermedio']],
    ['material', 'Material', materials],
    ['people', 'Participantes', ['2', '3', '4', '5', '6']],
  ] as const;
  const matches = filterAdventures(items, filters);
  return <>
    <div className="panel filters" aria-label="Filtros">
      {choices.map(([key, label, options]) => <div key={key}><label htmlFor={'filter-' + key}>{label}</label>
        <select id={'filter-' + key} value={filters[key] ?? ''} onChange={event => setFilters({ ...filters, [key]: event.currentTarget.value })}>
          <option value="">Cualquiera</option>
          {options.map(option => <option key={option} value={option}>{option}{key === 'duration' ? ' min' : ''}</option>)}
        </select>
      </div>)}
    </div>
    <p aria-live="polite">{matches.length} {matches.length === 1 ? 'aventura' : 'aventuras'}</p>
    <div className="grid">
      {matches.map(item => <article className="card" key={item.slug}>
        <img src={'/arte/' + item.icono + '.webp'} alt="" width="720" height="420" loading="lazy" />
        <div className="card-body">
          <div className="eyebrow">{item.mundo}</div>
          <h3><a href={'/aventuras/' + item.slug + '/'}>{item.titulo}</a></h3>
          <p>{item.resumen}</p>
          <p className="meta">{item.edad.join('–')} años · {item.minutos} min</p>
        </div>
      </article>)}
    </div>
    {matches.length === 0 && <button className="secondary" onClick={() => setFilters({})}>Restablecer filtros</button>}
  </>;
}
