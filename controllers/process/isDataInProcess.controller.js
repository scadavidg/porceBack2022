const isDataInProcess = async (req, res) => {
  res.json({ isDataInProcess: global.IS_DATA_IN_PROCESS === 1 });
};

module.exports = isDataInProcess;
