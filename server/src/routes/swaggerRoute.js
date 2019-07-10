import express from 'express';
import swaggerUi from 'swagger-ui-express';
import yaml from 'yamljs';

const swaggerRoute = express();

const swaggerDoc = yaml.load(`${__dirname}/../docs/doc.yaml`);

// use swagger-Ui-express for your app documentation endpoint
swaggerRoute.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

export default swaggerRoute;
