import express from 'express';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';
import { swaggerOptions } from './swaggerOptions';

export const addSwagger = (app: express.Express) => {
    const specs = swaggerJsDoc(swaggerOptions);
    app.use('/', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));
};
