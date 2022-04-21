
/**
 * Parses list of submissions retrieved with the Kinetic searchSubmission API,
 * and formats them for use in a MUI tablegrid component
 * 
 * @param {array} submissions Array of kinetic submissions with included values 
 * @returns {array} array with format [columnHeaders, rows]
 */
export const parseSubsToTablegrid = (submissions) => {
    const [cs, rs] = [[],[]];

    if (submissions.length > 1) {
      for (let key in submissions[0].values) {
        cs.push({ field: key, headerName: key, width: 100 })
      }
      for (let sub of submissions) {
        let vals = { ...sub.values, id: sub.id }
  
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