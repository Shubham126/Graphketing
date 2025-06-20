const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', async (req, res) => {
  const { search, status, department, page = 1, limit = 10 } = req.query;
  const query = {};
  if (search) {
    // If search is a number, allow searching numeric fields as well
    const isNumeric = !isNaN(search);
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
      { department: { $regex: search, $options: 'i' } },
      { status: { $regex: search, $options: 'i' } },
    ];
    if (isNumeric) {
      query.$or.push({ teacherId: Number(search) });
      query.$or.push({ recordId: Number(search) });
    }
  }
  if (status) query.status = status;
  if (department) query.department = department;

  const skip = (page - 1) * limit;
  const users = await User.find(query).skip(Number(skip)).limit(Number(limit));
  const total = await User.countDocuments(query);

  res.json({ users, total });
});

router.post('/', async (req, res) => {
  const { teacherId } = req.body;
  if (!teacherId) return res.status(400).json({ error: 'teacherId is required' });
  const existing = await User.findOne({ teacherId });
  if (existing) return res.status(400).json({ error: 'Teacher ID already exists' });
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add teacher' });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update user' });
  }
});

module.exports = router; 