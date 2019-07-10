import express from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerRoute = express.Router();

const swaggerDefinition = {
  info: {
    title: 'REST API for my App',
    version: '1.0.0',
    description: 'This is the REST API for Way-Farer App'
  },
  host: 'https://my-way-farer-app.herokuapp.com/',
  basePath: '/api/v1'
};

const options = {
  swaggerDefinition,
  apis: ['../doc/*.yaml']
  // ['./docs/**/*.yaml']
};
// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

// use swagger-Ui-express for your app documentation endpoint
swaggerRoute.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default swaggerRoute;
