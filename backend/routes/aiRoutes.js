const express = require("express");

const {
  improveDescription,generateSummaryAI
} = require("../controllers/aiController");

const router =
  express.Router();

router.post(
  "/improve-description",
  improveDescription
);

router.post(
  "/generate-summary",
  generateSummaryAI
);

module.exports = router;