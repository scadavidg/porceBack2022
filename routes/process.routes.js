const { Router } = require("express");
const {
  getAllResults, processAllResults, processSingleResult, isDataInProcess,
} = require("../controllers");

const router = Router();

router.post("/processSingleResult", processSingleResult);
router.post("/processAllResults", processAllResults);
router.get("/getAllResults", getAllResults);
router.get("/isDataInProcess", isDataInProcess);

module.exports = router;
