const path = require("path");
const Candidate = require("../models/candidateModel");

/* Register candidate */
const registerCandidate = async (req, res) => {
  try {
    const {
      full_name,
      email,
      phone,
      position,
      experience
    } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: "Resume is mandatory"
      });
    }

    /* Check duplicate email or phone */
    const isDuplicate = await Candidate.checkDuplicateCandidate(email, phone);
    if (isDuplicate) {
      return res.status(409).json({
        success: false,
        error: "Email or phone already registered"
      });
    }

    const resume_path = req.file.path;

    await Candidate.createCandidate({
      full_name,
      email,
      phone,
      position,
      experience,
      resume_path
    });

    res.status(201).json({
      success: true,
      message: "Candidate registered successfully"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Internal server error"
    });
  }
};

/* Get all candidates (HR) */
const getAllCandidates = async (req, res) => {
  try {
    const { search, status, position } = req.query;

    const candidates = await Candidate.getCandidates(
      search,
      status,
      position
    );

    console.log("Candidates found:", candidates.length);
    console.log("Candidates data:", candidates);

    res.status(200).json({
      success: true,
      data: candidates
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Internal server error"
    });
  }
};

/* Update interview status */
const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        error: "Status is required"
      });
    }

    const updatedRows = await Candidate.updateCandidateStatus(id, status);

    if (updatedRows === 0) {
      return res.status(404).json({
        success: false,
        error: "Candidate not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Status updated successfully"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Internal server error"
    });
  }
};

/* Download resume */
const downloadResume = async (req, res) => {
  try {
    const { id } = req.params;

    const candidate = await Candidate.getCandidateById(id);
    if (!candidate) {
      return res.status(404).json({
        success: false,
        error: "Candidate not found"
      });
    }

    const filePath = path.resolve(candidate.resume_path);
    res.download(filePath);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Internal server error"
    });
  }
};

module.exports = {
  registerCandidate,
  getAllCandidates,
  updateStatus,
  downloadResume
};
