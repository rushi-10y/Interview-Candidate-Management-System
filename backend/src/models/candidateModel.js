const mongoose = require("mongoose");

// Define Candidate Schema
const candidateSchema = new mongoose.Schema({
  full_name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  position: {
    type: String,
    required: true,
    trim: true,
  },
  experience: {
    type: Number,
    required: true,
    min: 0,
  },
  resume_path: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Applied', 'Selected', 'Hold', 'Rejected'],
    default: 'Applied',
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt
});

// Create indexes for faster search
candidateSchema.index({ full_name: 1 });
candidateSchema.index({ status: 1 });
candidateSchema.index({ position: 1 });

// Create Candidate Model
const Candidate = mongoose.model('Candidate', candidateSchema);

/* Check duplicate email or phone */
const checkDuplicateCandidate = async (email, phone) => {
  try {
    const candidate = await Candidate.findOne({
      $or: [{ email }, { phone }]
    });
    return !!candidate;
  } catch (error) {
    throw error;
  }
};

/* Insert new candidate */
const createCandidate = async (candidate) => {
  try {
    const newCandidate = new Candidate(candidate);
    const savedCandidate = await newCandidate.save();
    return savedCandidate._id;
  } catch (error) {
    throw error;
  }
};

/* Get candidates with search & filters */
const getCandidates = async (search, status, position) => {
  try {
    let query = {};

    if (search) {
      query.$or = [
        { full_name: new RegExp(search, 'i') },
        { email: new RegExp(search, 'i') },
        { phone: new RegExp(search, 'i') },
      ];
    }

    if (status) {
      query.status = status;
    }

    if (position) {
      query.position = position;
    }

    const candidates = await Candidate.find(query).sort({ createdAt: -1 });
    return candidates;
  } catch (error) {
    throw error;
  }
};

/* Update interview status */
const updateCandidateStatus = async (id, status) => {
  try {
    const result = await Candidate.updateOne(
      { _id: id },
      { status }
    );
    return result.modifiedCount;
  } catch (error) {
    throw error;
  }
};

/* Get candidate by ID (for resume download) */
const getCandidateById = async (id) => {
  try {
    const candidate = await Candidate.findById(id);
    return candidate;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  checkDuplicateCandidate,
  createCandidate,
  getCandidates,
  updateCandidateStatus,
  getCandidateById
};
