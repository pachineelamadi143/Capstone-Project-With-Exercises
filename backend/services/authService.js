const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const serializeUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  profileImage: user.profileImage || ''
});

const generateToken = (user) => jwt.sign(
  { id: user._id, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: '7d' }
);


const registerUser = async (userData) => {
  const { name, email, password, phone } = userData;

  const existingUser = await User.findOne({ email });
  if (existingUser && existingUser.isVerified) {
    throw new Error('User already exists');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  if (existingUser) {
    existingUser.name = name;
    existingUser.password = hashedPassword;
    existingUser.phone = phone;
    existingUser.role = 'customer';
    existingUser.isVerified = true;
    await existingUser.save();
  } else {
    await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      role: 'customer',
      isVerified: true
    });
  }

  return { registered: true };
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid email or password');
  }

  if (!user.isVerified) {
    throw new Error('Please verify your email before logging in');
  }

  return {
    token: generateToken(user),
    user: serializeUser(user)
  };
};

module.exports = { registerUser, loginUser };
