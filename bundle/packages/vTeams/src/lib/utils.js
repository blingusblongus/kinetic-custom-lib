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
  userProfile.memberships.map(mem => mem.team.name).includes('vTeams');

/**
 * Takes in KD searchSubmissions options,
 * and recursively builds an array aggregated all paginated results
 * @param {object} opts - Kinetic Data searchSubmissions options obj
 * @param {*} results
 * @returns Array of submissions
 */
export const getPaginated = async (opts, results = []) => {
  const response = await searchSubmissions(opts);
  if (response.nextPageToken) {
    return getPaginated(
      { nextPageToken: response.nextPageToken },
      results.concat(response.submissions),
    );
  } else {
    console.log(response);
    console.log(results.concat(response.submissions));
    return results.concat(response.submissions);
  }
};
