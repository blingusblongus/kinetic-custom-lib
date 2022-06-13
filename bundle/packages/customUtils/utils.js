/**
 * Parses list of submissions retrieved with the Kinetic searchSubmission API,
 * and formats them for use in a MUI tablegrid component
 * 
 * @param {array} submissions Array of kinetic submissions with included values 
 * @returns {array} array with format [columnHeaders, rows]
 */
export const parseSubsToTablegrid = (submissions) => {
    const [cs, rs] = [[], []];

    if (submissions.length > 0) {
        for (let key in submissions[0].values) {
            cs.push({ field: key, headerName: key, flex: 1})
        }
        for (let sub of submissions) {
            let vals = {
                ...sub.values,
                id: sub.id,
            }

            // for (let key in vals) {
            //   console.log(vals[key]);
            //   // if (Array.isArray(vals[key])) {

            //   // }
            // }
            rs.push(vals);
        }
    }
    return [cs, rs];
}

/**
 * Takes in a number 1-3 and returns a string priority
 * @param {number} num Priority level, 1 as lowest
 * @returns String value representing priority
 */
export const parsePriority = (num) => {
    const priorities = ['Low', 'Medium', 'High'];
    return priorities[num];
}

/**
 * 
 * @param {obj} submission A KineticData submission object with included values
 * @param {str} field The field name of the attachment to retrieve
 * @param {int} index The index of the attachment file to retrieve
 * @returns A link pointing toward the attachment resource
 */
export const getAttachmentDownload = (submission, field, index=0) => {
    const host = window.location.host + '/';
    const link = submission.values?.[field]?.[index].link
    return 'http://' + link?.replace(/\/.*?\//, host);
}