/**
 * @template {{mundo:string, edad:number[], minutos:number, nivel:string, materiales:string[], personas:number[]}} T
 * @param {T[]} items
 * @param {Record<string, string>} filters
 */
export function filterAdventures(items, filters) {
  return items.filter(item => {
    const { world, age, duration, level, material, people } = filters;
    return (!world || item.mundo === world) &&
      (!age || (+age >= item.edad[0] && +age <= item.edad[1])) &&
      (!duration || item.minutos <= +duration) &&
      (!level || item.nivel === level) &&
      (!material || item.materiales.includes(material)) &&
      (!people || (+people >= item.personas[0] && +people <= item.personas[1]));
  });
}
