/**
 * @param {number} participants
 * @param {number} maximum
 */
export function splitTeams(participants, maximum) {
  const count = Math.ceil(participants / maximum);
  const small = Math.floor(participants / count);
  const largeTeams = participants % count;
  return {
    count,
    sizes: largeTeams === 0 ? String(small) : small + '–' + (small + 1),
  };
}
