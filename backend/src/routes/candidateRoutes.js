const express = require("express");
const router = express.Router();

const upload = require("../middlewares/uploadMiddleware");
const { validateCandidate } = require("../middlewares/validation");
const controller = require("../controllers/candidateController");

/* Candidate registration */
router.post(
  "/",
  upload.single("resume"),
  validateCandidate,
  controller.registerCandidate
);

/* HR – view candidates */
router.get("/", controller.getAllCandidates);

/* HR – update interview status */
router.put("/:id/status", controller.updateStatus);

/* HR – download resume */
router.get("/:id/resume", controller.downloadResume);

module.exports = router;
