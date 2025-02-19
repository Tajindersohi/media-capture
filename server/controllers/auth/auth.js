const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require("dotenv").config();
const createUser = async (req, res) => {
    const { email, password, number, role, name } = req.body;
    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create and save new user
        const user = new User({ email, password, number, role, name });
        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error('Registration error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const changePassword = async (req, res) => {
    const { _id, oldPassword, newPassword } = req.body.credentials; // Fixed typo in "newPassword"

    try {
        const existingUser = await User.findById(_id);
        if (!existingUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(oldPassword, existingUser.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Password is incorrect' });
        }
        existingUser.password = newPassword;
        await existingUser.save();

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (err) {
        console.error('Change password error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const handleUserLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Compare password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'your_secret_token', { expiresIn: '1h' });

        res.json({ token, user, message: "Login Successfully" });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

const handleGetMe = async (req, res) => {
  try {
     const user = await User.findById(req.user.id).select('-password'); // Exclude password
     if (!user) {
         return res.status(404).json({ message: 'User not found' });
     }
     res.json({ user, message: "User fetched successfully" });
    } catch (error) {
     res.status(500).json({ message: 'Server error' });
   }
};

module.exports = { createUser, handleUserLogin,  handleGetMe, changePassword };
