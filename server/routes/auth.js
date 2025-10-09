const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Import User Models
const Buyer = require('../models/Buyer');
const Seller = require('../models/Seller');
const Vet = require('../models/Vet');
const Admin = require('../models/Admin');

// A secret key for signing the JWT. 
// It's recommended to store this in an environment variable (e.g., process.env.JWT_SECRET)
const JWT_SECRET = process.env.JWT_SECRET;

/**
 * @route   POST api/auth/login
 * @desc    Authenticate user (Buyer, Seller, Vet) and get token
 * @access  Public
 */
router.post('/login', async (req, res) => {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
        return res.status(400).json({ message: 'Please provide email, password, and role.' });
    }

    try {
        let user;
        let UserModel;

        // Determine which model to use based on the role
        switch (role) {
            case 'buyer':
                UserModel = Buyer;
                break;
            case 'seller':
                UserModel = Seller;
                break;
            case 'veterinarian':
                UserModel = Vet;
                break;
            default:
                return res.status(400).json({ message: 'Invalid role specified.' });
        }

        // Find user by email
        user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        // Check if the password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        // Create a JWT payload
        const payload = {
            user: {
                id: user.id,
                role: role,
            },
        };

        // Sign the token
        jwt.sign(
            payload,
            JWT_SECRET,
            { expiresIn: '5h' }, // Token expires in 5 hours
            (err, token) => {
                if (err) throw err;
                res.json({
                    token,
                    user: {
                        id: user.id,
                        firstName: user.firstName,
                        email: user.email,
                        role: role
                    }
                });
            }
        );

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

/**
 * @route   POST api/auth/admin/login
 * @desc    Authenticate admin and get token
 * @access  Public
 */
router.post('/admin/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide both email and password.' });
    }

    try {
        // Find admin by email
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        // Check if the password is correct
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        // Create a JWT payload
        const payload = {
            user: {
                id: admin.id,
                role: 'admin',
            },
        };

        // Sign the token
        jwt.sign(
            payload,
            JWT_SECRET,
            { expiresIn: '5h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;