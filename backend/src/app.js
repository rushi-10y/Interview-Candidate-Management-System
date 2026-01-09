const express = require("express");
const cors = require("cors");
const path = require("path");

const candidateRoutes = require("./routes/candidateRoutes");

const app = express();

/* Global Middlewares */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Static folder for resume downloads */
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

/* Routes */
app.use("/api/candidates", candidateRoutes);

/* Health check */
app.get("/", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Interview Candidate Management API is running"
  });
});

/* Global error handler */
app.use((err, req, res, next) => {
  console.error(err.stack);

  // Handle Multer errors (file upload issues)
  if (err.name === 'MulterError') {
    let message = 'File upload error';
    if (err.code === 'LIMIT_FILE_SIZE') {
      message = 'File size too large. Maximum 2MB allowed.';
    }
    return res.status(400).json({
      success: false,
      error: message
    });
  }

  // Handle custom file filter errors
  if (err.message === 'Only PDF or DOC/DOCX files are allowed') {
    return res.status(400).json({
      success: false,
      error: err.message
    });
  }

  // Default internal server error
  res.status(500).json({
    success: false,
    error: "Internal Server Error"
  });
});

module.exports = app;
