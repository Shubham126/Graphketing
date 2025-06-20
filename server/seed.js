const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const departments = ['Engineer', 'Finance', 'Arts'];
const statuses = ['Active', 'Inactive', 'Blocked', 'Suspended'];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomName() {
  const firstNames = ['Alice', 'Bob', 'Carol', 'David', 'Eva', 'Frank', 'Grace', 'Helen', 'Ian', 'Jane', 'Kyle', 'Liam', 'Mona', 'Nina', 'Oscar', 'Paul', 'Quinn', 'Rita', 'Sam', 'Tina', 'Uma', 'Vera', 'Will', 'Xena', 'Yara', 'Zane'];
  const lastNames = ['Johnson', 'Smith', 'Lee', 'Brown', 'Green', 'White', 'Black', 'Clark', 'Hall', 'Young', 'King', 'Wright', 'Scott', 'Hill', 'Adams', 'Baker', 'Carter', 'Evans', 'Foster', 'Graham', 'Harris', 'Lewis', 'Morris', 'Nelson', 'Parker', 'Reed'];
  return `${firstNames[getRandomInt(0, firstNames.length-1)]} ${lastNames[getRandomInt(0, lastNames.length-1)]}`;
}

const sampleUsers = Array.from({ length: 50 }, (_, i) => {
  const name = getRandomName();
  const teacherId = 100 + i;
  const department = departments[getRandomInt(0, departments.length-1)];
  const studentCount = getRandomInt(20, 40);
  const status = statuses[getRandomInt(0, statuses.length-1)];
  const email = name.toLowerCase().replace(/ /g, '.') + `@example.com`;
  return {
    recordId: i + 1,
    name,
    teacherId,
    department,
    studentCount,
    status,
    email,
  };
});

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    await User.deleteMany({}); // Clear existing data
    await User.insertMany(sampleUsers);
    console.log('50 sample users seeded successfully!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed(); 