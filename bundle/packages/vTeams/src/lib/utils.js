/**
 * Counts open tickets of the provided priority level
 * @param {object[]} tickets
 * @param {number} level
 * @param {boolean} countClosed
 * @returns number of tickets
 */
export const countPriorityTickets = (tickets, level, countClosed = false) => {
  return tickets.filter(
    ({ status, priority }) => (status || countClosed) && priority === level,
  ).length;
};
