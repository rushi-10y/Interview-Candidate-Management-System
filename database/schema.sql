-- =========================================
-- Interview Candidate Management
-- Database Schema
-- =========================================

-- Create database
CREATE DATABASE IF NOT EXISTS interview_db
DEFAULT CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE interview_db;

-- =========================================
-- Candidates Table
-- =========================================
CREATE TABLE IF NOT EXISTS candidates (
    id INT AUTO_INCREMENT PRIMARY KEY,

    full_name VARCHAR(100) NOT NULL,

    email VARCHAR(100) NOT NULL UNIQUE,

    phone VARCHAR(15) NOT NULL UNIQUE,

    position VARCHAR(100) NOT NULL,

    experience INT NOT NULL CHECK (experience >= 0),

    resume_path VARCHAR(255) NOT NULL,

    status ENUM(
        'Applied',
        'Selected',
        'Hold',
        'Rejected'
    ) DEFAULT 'Applied',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================
-- Indexes (for faster search)
-- =========================================
CREATE INDEX idx_candidate_name ON candidates(full_name);
CREATE INDEX idx_candidate_email ON candidates(email);
CREATE INDEX idx_candidate_phone ON candidates(phone);
CREATE INDEX idx_candidate_status ON candidates(status);
CREATE INDEX idx_candidate_position ON candidates(position);
