const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();

const connectDB = require('./src/config/db');
const swaggerSpec = require('./src/config/swagger');
const authRoutes = require('./src/routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5001;

// Connect to database
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Swagger Documentation setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/auth', authRoutes);

// Basic health check route
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Server is up and running on port ' + PORT });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
