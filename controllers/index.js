/* eslint-disable global-require */
module.exports = {
  processAllResults: require("./process/processAllResults.controller"),
  processSingleResult: require("./process/processSingleResult.controller"),
  getAllResults: require("./process/getAllResults.controller"),
  isDataInProcess: require("./process/isDataInProcess.controller"),
};
