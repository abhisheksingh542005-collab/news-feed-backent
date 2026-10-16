import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import asyncHandler from '../utils/asyncHandler.js';

// Before:
// jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })

// After:
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'supersecretkey123', {
    expiresIn: '30d',
  });
};

// @desc    Register new user
// @route   POST /api/v1/auth/register
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, preferredCategories } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ success: false, message: 'User already exists' });
  }

  const user = await User.create({ name, email, password, preferredCategories });

  res.status(201).json({
    success: true,
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      preferredCategories: user.preferredCategories,
      token: generateToken(user._id)
    }
  });
});

// @desc    Authenticate user & get token
// @route   POST /api/v1/auth/login
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        preferredCategories: user.preferredCategories,
        token: generateToken(user._id)
      }
    });
  } else {
    res.status(401).json({ success: false, message: 'Invalid email or password' });
  }
});

// @desc    Update user preferred news categories
// @route   PUT /api/v1/auth/preferences
export const updatePreferences = asyncHandler(async (req, res) => {
  const { categories } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { preferredCategories: categories },
    { new: true, runValidators: true }
  ).select('-password');

  res.json({ success: true, data: user });
});