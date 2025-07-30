const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'E-Commerce API',
      version: '1.0.0',
      description: 'API documentation for your E-Commerce app',
    },
    servers: [
      {
        url: 'http://localhost:5001',
      },
    ],
  },
  apis: ['./ecomapp/source/*/routes.js'], // Path to the API docs (adjust as needed)
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;