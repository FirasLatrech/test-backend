// swagger.ts
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import path from 'path';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ostedhy',
      version: '1.0.0',
    },
    
  },
  apis: [path.join(__dirname, './swagger/*.ts') ], // specify the path to your route files
};

const specs = swaggerJsdoc(options);

export default specs;
