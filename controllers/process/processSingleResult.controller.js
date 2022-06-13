const GetDescripcion = require("./processSingleResult/GetDescripcion");

const processSingleResult = async (req, res) => {
  const { documento } = req.body;
  const result = await GetDescripcion(documento);

  res.json(result);
};

module.exports = processSingleResult;
