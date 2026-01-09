# TODO: Switch Database to MongoDB

- [x] Update `backend/package.json`: Remove mysql2 dependency and add mongoose
- [x] Update `backend/src/config/db.js`: Replace MySQL connection pool with Mongoose connection to MongoDB
- [x] Update `backend/src/models/candidateModel.js`: Define Mongoose schema and model for Candidate, replace SQL queries with Mongoose methods
- [x] Run `npm install` to install mongoose
- [x] Update .env file with MongoDB connection string (e.g., MONGO_URI=mongodb://localhost:27017/interview_db)
- [ ] Test database connection and basic operations (e.g., register candidate)
