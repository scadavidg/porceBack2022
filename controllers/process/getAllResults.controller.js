const temporaryBD = require("./temporaryBD.json");

const getResults = async (req, res) => {
  res.json(temporaryBD);
};

module.exports = getResults;
