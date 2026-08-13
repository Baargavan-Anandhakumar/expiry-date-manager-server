const { validationResult } = require('express-validator');
const authService = require('../services/authService');

const authController = {
    register: async (request, response) => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = request.body;

        try {
            const user = await authService.registerUser(name, email, password);
            return response.status(201).json({
                message: 'User registered successfully',
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email
                }
            });
        } catch (error) {
            return response.status(400).json({ message: error.message });
        }
    },

    login: async (request, response) => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        const { email, password } = request.body;

        try {
            const { user, token } = await authService.loginUser(email, password);
            
            response.cookie('jwtToken', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                domain: 'localhost',
                path: '/'
            });

            return response.status(200).json({
                message: 'User authenticated',
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email
                }
            });
        } catch (error) {
            return response.status(400).json({ message: error.message });
        }
    }
};

module.exports = authController;
