import { searchSubmissions } from '@kineticdata/react';

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

export const isFulfiller = userProfile =>
  userProfile.memberships
    .map(mem => {
      return mem.team.name;
    })
    .includes('vTeams');

export const getPaginated = async (opts, results = []) => {
  const response = await searchSubmissions(opts);
  console.log(response);
  if (response.nextPageToken) {
    return getPaginated(
      { nextPageToken: response.nextPageToken },
      results.concat(response.submissions),
    );
  } else {
    return results.concat(response.submissions);
  }
};
