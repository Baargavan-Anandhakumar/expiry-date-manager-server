const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Expiry Date Manager API',
            version: '1.0.0',
            description: 'API documentation for Expiry Date Manager',
        },
        servers: [
            {
                url: 'http://localhost:5001/api',
                description: 'Local development server',
            },
        ],
    },
    apis: ['./src/routes/*.js', './src/models/*.js'], 
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
