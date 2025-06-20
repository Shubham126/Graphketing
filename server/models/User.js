const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  recordId: Number,
  name: String,
  teacherId: Number,
  department: String,
  studentCount: Number,
  status: String,
  email: String,
});

module.exports = mongoose.model('User', UserSchema); 